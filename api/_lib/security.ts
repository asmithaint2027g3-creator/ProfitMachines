/**
 * api/_lib/security.ts
 * Enterprise Security Controller for ProfitMachines
 *
 * Provides reusable server-side security middleware for Vercel Serverless Functions:
 * 1. Dedicated high-entropy API secret authentication (Bearer token / X-API-Key)
 * 2. Strict separation of inbound API authentication from outbound Jira API tokens
 * 3. Inspection of JIRA_SECURITY_CONTROLLER and JIRA_AUTOMATION_CONTROLLER identifiers
 * 4. Timing-attack-resistant token verification via crypto.timingSafeEqual
 * 5. Method whitelisting, permission scoping, and payload validation
 * 6. IP-based sliding window rate limiting for public and private endpoints
 * 7. Public form spam defense: honeypot detection, email validation, length guards
 * 8. Sanitized security audit logging (no plaintext secret exposure)
 * 9. Standardized, secure HTTP error responses
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { timingSafeEqual, randomUUID } from 'crypto';

// ── TYPES & INTERFACES ────────────────────────────────────────────────────────

export type SecurityScope =
  | 'admin:all'
  | 'automation:reports'
  | 'automation:youtube'
  | 'automation:linkedin'
  | 'admin:leads'
  | 'admin:calendar'
  | 'admin:visitors'
  | 'admin:email';

export interface SecurityContext {
  requestId: string;
  timestamp: string;
  clientIp: string;
  route: string;
  method: string;
  isAuthenticated: boolean;
  authMethod: 'BEARER_TOKEN' | 'HEADER_KEY' | 'QUERY_SECRET' | 'VERCEL_CRON' | 'NONE';
  matchedScopes: SecurityScope[];
  controllerInfo: {
    securityControllerId?: string;
    automationControllerId?: string;
    incomingSource?: string;
  };
}

export interface PrivateSecurityOptions {
  /** Allowed HTTP methods for this endpoint (e.g. ['GET', 'POST']) */
  allowedMethods: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS')[];
  /** Required permission scope for this action */
  requiredScope?: SecurityScope;
  /** If true, unauthenticated GET requests will be allowed through for safe public diagnostics/health checks */
  allowSafeDiagnosticsOnGet?: boolean;
  /** Optional custom rate limit for private endpoint (defaults to 120 req/min) */
  rateLimit?: { windowMs: number; max: number };
  /** Action name for logging (e.g. 'reports:trigger') */
  actionName?: string;
}

export interface PublicSecurityOptions {
  /** Allowed HTTP methods for this endpoint */
  allowedMethods: ('GET' | 'POST' | 'PUT' | 'OPTIONS')[];
  /** Custom rate limit for public endpoint */
  rateLimit?: { windowMs: number; max: number };
  /** Enable honeypot spam protection */
  enableHoneypot?: boolean;
  /** Custom honeypot field names to look for */
  honeypotFields?: string[];
  /** Validate email format if present in body */
  validateEmail?: boolean;
  /** Max allowed payload string length */
  maxPayloadBytes?: number;
  /** Action name for logging */
  actionName?: string;
}

export interface SecurityCheckResult {
  allowed: boolean;
  statusCode?: number;
  errorCode?: string;
  errorMessage?: string;
  context: SecurityContext;
}

// ── RATE LIMITER IMPLEMENTATION ───────────────────────────────────────────────

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

class SlidingWindowRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private defaultWindowMs: number;
  private defaultMax: number;

  constructor(defaultWindowMs = 60 * 1000, defaultMax = 60) {
    this.defaultWindowMs = defaultWindowMs;
    this.defaultMax = defaultMax;

    // Prune stale records every 2 minutes
    if (typeof setInterval !== 'undefined') {
      const timer = setInterval(() => this.pruneStale(), 2 * 60 * 1000);
      if (timer.unref) timer.unref();
    }
  }

  public check(key: string, max = this.defaultMax, windowMs = this.defaultWindowMs): {
    allowed: boolean;
    remaining: number;
    resetSeconds: number;
  } {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record || now > record.resetTime) {
      this.records.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: max - 1, resetSeconds: Math.ceil(windowMs / 1000) };
    }

    if (record.count >= max) {
      const resetSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
      return { allowed: false, remaining: 0, resetSeconds };
    }

    record.count += 1;
    return {
      allowed: true,
      remaining: Math.max(0, max - record.count),
      resetSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  private pruneStale() {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (now > record.resetTime) {
        this.records.delete(key);
      }
    }
  }

  public clear() {
    this.records.clear();
  }
}

// Global instances for public and private traffic
const publicRateLimiter = new SlidingWindowRateLimiter(60 * 1000, 30);
const privateRateLimiter = new SlidingWindowRateLimiter(60 * 1000, 120);

// ── TIMING-SAFE COMPARISON ───────────────────────────────────────────────────

function safeConstantTimeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Prevent length timing leak while still returning false
      const dummy = Buffer.alloc(bufA.length);
      timingSafeEqual(bufA, dummy);
      return false;
    }
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// ── CLIENT IP RESOLUTION ──────────────────────────────────────────────────────

function extractClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

// ── TOKEN MASKING FOR SAFE LOGGING ────────────────────────────────────────────

function maskToken(token: string): string {
  if (!token) return 'EMPTY';
  const clean = token.trim();
  if (clean.length <= 8) return '********';
  return `${clean.slice(0, 3)}...${clean.slice(-3)}`;
}

// ── HONEYPOT & SPAM VALIDATION ────────────────────────────────────────────────

const DEFAULT_HONEYPOT_FIELDS = [
  'hp_website',
  'company_fax',
  'bot_trap',
  'confirm_email_address',
  'website_url_hp',
  'lead_verification_code',
];

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'throwawaymail.com',
  'yopmail.com',
  'trashmail.com',
]);

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// ── MAIN SECURITY CONTROLLER CLASS ────────────────────────────────────────────

export class SecurityController {
  /**
   * Resolves configured security secrets from Vercel environment variables.
   * Priority:
   * 1. API_SECURITY_SECRET / SECURITY_CONTROLLER_SECRET (Dedicated high-entropy secret)
   * 2. REPORT_CRON_SECRET / CRON_SECRET (Legacy scheduler secret)
   * 3. ADMIN_SECURITY_KEY (Admin key)
   */
  public static getConfiguredSecrets(): {
    primary: string;
    allowed: string[];
    isConfigured: boolean;
  } {
    const primary = (
      process.env.API_SECURITY_SECRET ||
      process.env.SECURITY_CONTROLLER_SECRET ||
      ''
    ).trim();

    const legacyCron = (process.env.REPORT_CRON_SECRET || process.env.CRON_SECRET || '').trim();
    const adminKey = (process.env.ADMIN_SECURITY_KEY || '').trim();
    const analyticsKey = (process.env.ANALYTICS_API_KEY || '').trim();

    const allowed = [primary, legacyCron, adminKey, analyticsKey].filter(
      s => s && s.length >= 8
    );

    // In local non-production development only, provide a fallback if nothing is set
    const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
    if (allowed.length === 0 && !isProd) {
      const devFallback = 'dev_secret_profitmachines_2026';
      return { primary: devFallback, allowed: [devFallback], isConfigured: false };
    }

    return {
      primary: primary || allowed[0] || '',
      allowed,
      isConfigured: allowed.length > 0,
    };
  }

  /**
   * Resolves Jira API Token configured for OUTBOUND Jira Cloud communication.
   * Explicitly verifies that it is NEVER used for inbound authentication.
   */
  public static getOutboundJiraToken(): string {
    return (process.env.JIRA_API_TOKEN || '').trim();
  }

  /**
   * Inspects metadata headers/env vars for JIRA_SECURITY_CONTROLLER and JIRA_AUTOMATION_CONTROLLER.
   * These provide audit context and routing hints, but NEVER authorize a request by themselves.
   */
  public static inspectControllerMetadata(req: VercelRequest): SecurityContext['controllerInfo'] {
    const headerSecController =
      (req.headers['x-jira-security-controller'] as string) ||
      (req.headers['jira-security-controller'] as string) ||
      undefined;

    const headerAutoController =
      (req.headers['x-jira-automation-controller'] as string) ||
      (req.headers['jira-automation-controller'] as string) ||
      undefined;

    const envSecController = process.env.JIRA_SECURITY_CONTROLLER || undefined;
    const envAutoController = process.env.JIRA_AUTOMATION_CONTROLLER || undefined;

    const userAgent = req.headers['user-agent'] || '';
    let incomingSource = 'Generic Client';
    if (userAgent.includes('Atlassian') || userAgent.includes('Jira')) {
      incomingSource = 'Jira Automation Webhook';
    } else if (req.headers['x-vercel-cron']) {
      incomingSource = 'Vercel Cron Runner';
    } else if (userAgent.includes('Google-Apps-Script')) {
      incomingSource = 'Google Apps Script';
    }

    return {
      securityControllerId: headerSecController || envSecController,
      automationControllerId: headerAutoController || envAutoController,
      incomingSource,
    };
  }

  /**
   * Extracts incoming token from standard locations.
   */
  public static extractIncomingToken(req: VercelRequest): {
    token: string;
    method: SecurityContext['authMethod'];
  } {
    // 1. Authorization: Bearer <token>
    const authHeader = (req.headers.authorization || (req.headers as any)['Authorization'] || '').trim();
    if (authHeader.toLowerCase().startsWith('bearer ')) {
      const token = authHeader.substring(7).trim();
      if (token) return { token, method: 'BEARER_TOKEN' };
    }

    // 2. X-API-Key / X-Security-Secret / X-Cron-Secret
    const headerKey = (
      (req.headers['x-api-key'] as string) ||
      (req.headers['x-security-secret'] as string) ||
      (req.headers['x-cron-secret'] as string) ||
      ''
    ).trim();
    if (headerKey) {
      return { token: headerKey, method: 'HEADER_KEY' };
    }

    // 3. Query string (?secret=... or ?apiKey=...)
    const querySecret = (
      (req.query?.secret as string) ||
      (req.query?.apiKey as string) ||
      ''
    ).trim();
    if (querySecret) {
      return { token: querySecret, method: 'QUERY_SECRET' };
    }

    // 4. JSON body secret ({ secret: "..." } or { adminKey: "..." })
    if (req.body && typeof req.body === 'object') {
      const bodySecret = (req.body.secret || req.body.adminKey || '').trim();
      if (typeof bodySecret === 'string' && bodySecret) {
        return { token: bodySecret, method: 'HEADER_KEY' };
      }
    }

    return { token: '', method: 'NONE' };
  }

  /**
   * Sets standard hardened security and CORS headers.
   */
  public static applySecurityHeaders(res: VercelResponse, allowedMethods = 'GET, POST, OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', allowedMethods);
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-API-Key, X-Security-Secret, X-Cron-Secret, X-Jira-Security-Controller, X-Jira-Automation-Controller'
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Security-Controller', 'ProfitMachines-SecurityController/v2');
  }

  /**
   * Safe audit logging for security events (never dumps secrets or full sensitive payloads).
   */
  public static logSecurityEvent(
    action: string,
    context: SecurityContext,
    outcome: 'ALLOWED' | 'DENIED',
    reason?: string,
    tokenPreview?: string
  ) {
    const logData = {
      tag: '[SecurityController]',
      requestId: context.requestId,
      action,
      route: context.route,
      method: context.method,
      clientIp: context.clientIp,
      outcome,
      authMethod: context.authMethod,
      source: context.controllerInfo.incomingSource,
      securityController: context.controllerInfo.securityControllerId || 'none',
      automationController: context.controllerInfo.automationControllerId || 'none',
      tokenPreview: tokenPreview ? maskToken(tokenPreview) : 'NONE',
      reason: reason || 'OK',
    };

    if (outcome === 'DENIED') {
      console.warn(JSON.stringify(logData));
    } else {
      console.log(JSON.stringify(logData));
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. PROTECT PRIVATE ENDPOINTS
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Enforces security for private administrative and automation endpoints.
   * Returns true if authorized to proceed, false if response was already sent.
   */
  public static async enforcePrivate(
    req: VercelRequest,
    res: VercelResponse,
    options: PrivateSecurityOptions
  ): Promise<boolean> {
    const requestId = `sec_${randomUUID().slice(0, 12)}`;
    const timestamp = new Date().toISOString();
    const clientIp = extractClientIp(req);
    const route = req.url || 'unknown';
    const method = (req.method || 'GET').toUpperCase() as PrivateSecurityOptions['allowedMethods'][number];
    const actionName = options.actionName || route;

    SecurityController.applySecurityHeaders(res, options.allowedMethods.join(', '));

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      res.status(200).end();
      return false;
    }

    const controllerInfo = SecurityController.inspectControllerMetadata(req);
    const { token: incomingToken, method: authMethod } = SecurityController.extractIncomingToken(req);

    const context: SecurityContext = {
      requestId,
      timestamp,
      clientIp,
      route,
      method,
      isAuthenticated: false,
      authMethod,
      matchedScopes: [],
      controllerInfo,
    };

    // 1. Method whitelisting
    if (!options.allowedMethods.includes(method)) {
      SecurityController.logSecurityEvent(actionName, context, 'DENIED', `Method ${method} not allowed`);
      res.setHeader('Allow', options.allowedMethods.join(', '));
      res.status(405).json({
        error: 'Method Not Allowed',
        code: 'METHOD_NOT_ALLOWED',
        message: `HTTP method ${method} is not permitted for this endpoint. Allowed: ${options.allowedMethods.join(', ')}`,
        requestId,
      });
      return false;
    }

    // 2. Rate limiting check
    const rateLimit = options.rateLimit || { windowMs: 60 * 1000, max: 120 };
    const rateCheck = privateRateLimiter.check(`${clientIp}:private`, rateLimit.max, rateLimit.windowMs);
    res.setHeader('X-RateLimit-Limit', rateLimit.max.toString());
    res.setHeader('X-RateLimit-Remaining', rateCheck.remaining.toString());

    if (!rateCheck.allowed) {
      SecurityController.logSecurityEvent(actionName, context, 'DENIED', 'Private rate limit exceeded');
      res.setHeader('Retry-After', rateCheck.resetSeconds.toString());
      res.status(429).json({
        error: 'Too Many Requests',
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Security threshold exceeded. Please retry after the cooldown period.',
        retryAfterSeconds: rateCheck.resetSeconds,
        requestId,
      });
      return false;
    }

    // 3. Safe diagnostic check on GET without token
    if (method === 'GET' && options.allowSafeDiagnosticsOnGet && !incomingToken) {
      // Allow unauthenticated GET through to handler for safe public health check
      context.isAuthenticated = false;
      (req as any).securityContext = context;
      SecurityController.logSecurityEvent(actionName, context, 'ALLOWED', 'Unauthenticated diagnostic health check');
      return true;
    }

    // 4. Verify that Jira API Token is NOT misused as public/incoming secret
    const outboundJiraToken = SecurityController.getOutboundJiraToken();
    if (outboundJiraToken && incomingToken && safeConstantTimeCompare(incomingToken, outboundJiraToken)) {
      SecurityController.logSecurityEvent(
        actionName,
        context,
        'DENIED',
        'Jira outbound API token misused as incoming API secret',
        incomingToken
      );
      res.status(401).json({
        error: 'Unauthorized',
        code: 'JIRA_TOKEN_SEPARATION_VIOLATION',
        message:
          'Security separation error: The JIRA_API_TOKEN is strictly for backend-to-Jira outbound calls. Inbound requests must authenticate with API_SECURITY_SECRET.',
        requestId,
      });
      return false;
    }

    // 5. Authenticate against configured high-entropy secrets
    const { primary, allowed, isConfigured } = SecurityController.getConfiguredSecrets();

    if (!isConfigured) {
      const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
      if (isProd) {
        SecurityController.logSecurityEvent(actionName, context, 'DENIED', 'No API_SECURITY_SECRET configured in Vercel');
        res.status(500).json({
          error: 'Server Misconfiguration',
          code: 'SECURITY_SECRET_UNSET',
          message: 'API security secret is not configured in environment variables. Access denied (fail-closed).',
          requestId,
        });
        return false;
      }
    }

    if (!incomingToken) {
      SecurityController.logSecurityEvent(actionName, context, 'DENIED', 'Missing credentials');
      res.status(401).json({
        error: 'Unauthorized',
        code: 'CREDENTIALS_MISSING',
        message: 'Valid authentication credentials required. Provide Authorization: Bearer <API_SECURITY_SECRET>.',
        requestId,
      });
      return false;
    }

    const isMatch = allowed.some(expected => safeConstantTimeCompare(incomingToken, expected));

    if (!isMatch) {
      SecurityController.logSecurityEvent(
        actionName,
        context,
        'DENIED',
        'Invalid security secret token',
        incomingToken
      );
      res.status(401).json({
        error: 'Unauthorized',
        code: 'INVALID_CREDENTIALS',
        message: 'The provided authentication secret is invalid or has expired.',
        requestId,
      });
      return false;
    }

    // 6. Authorized
    context.isAuthenticated = true;
    context.matchedScopes = ['admin:all', options.requiredScope || 'automation:reports'];
    SecurityController.logSecurityEvent(actionName, context, 'ALLOWED', 'Valid credentials verified', incomingToken);

    // Attach security context to request for downstream usage
    (req as any).securityContext = context;
    return true;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. PROTECT PUBLIC ENDPOINTS (Web Forms, Visitor Tracking, Telemetry)
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Enforces security for public website forms & visitor tracking.
   * Keeps forms functional WITHOUT exposing any private secrets in frontend code.
   * Protects against bots, scraping, rapid floods, and malformed payloads.
   */
  public static async enforcePublic(
    req: VercelRequest,
    res: VercelResponse,
    options: PublicSecurityOptions
  ): Promise<boolean> {
    const requestId = `pub_${randomUUID().slice(0, 12)}`;
    const timestamp = new Date().toISOString();
    const clientIp = extractClientIp(req);
    const route = req.url || 'unknown';
    const method = (req.method || 'GET').toUpperCase() as PublicSecurityOptions['allowedMethods'][number];
    const actionName = options.actionName || route;

    SecurityController.applySecurityHeaders(res, options.allowedMethods.join(', '));

    if (method === 'OPTIONS') {
      res.status(200).end();
      return false;
    }

    const context: SecurityContext = {
      requestId,
      timestamp,
      clientIp,
      route,
      method,
      isAuthenticated: false,
      authMethod: 'NONE',
      matchedScopes: [],
      controllerInfo: { incomingSource: 'Public Web Visitor' },
    };

    // 1. Method check
    if (!options.allowedMethods.includes(method)) {
      SecurityController.logSecurityEvent(actionName, context, 'DENIED', `Method ${method} not permitted`);
      res.setHeader('Allow', options.allowedMethods.join(', '));
      res.status(405).json({
        error: 'Method Not Allowed',
        code: 'METHOD_NOT_ALLOWED',
        message: `HTTP ${method} not allowed for this route.`,
        requestId,
      });
      return false;
    }

    // 2. Public rate limiting
    const rateLimit = options.rateLimit || { windowMs: 60 * 1000, max: 30 };
    const rateCheck = publicRateLimiter.check(`${clientIp}:public:${route}`, rateLimit.max, rateLimit.windowMs);
    res.setHeader('X-RateLimit-Limit', rateLimit.max.toString());
    res.setHeader('X-RateLimit-Remaining', rateCheck.remaining.toString());

    if (!rateCheck.allowed) {
      SecurityController.logSecurityEvent(actionName, context, 'DENIED', 'Public rate limit reached');
      res.setHeader('Retry-After', rateCheck.resetSeconds.toString());
      res.status(429).json({
        error: 'Too Many Requests',
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Submission limit reached. Please wait a minute before submitting again.',
        retryAfter: rateCheck.resetSeconds,
        requestId,
      });
      return false;
    }

    // 3. Payload size check
    const maxBytes = options.maxPayloadBytes || 100 * 1024; // 100 KB max default
    const bodyStr = req.body ? JSON.stringify(req.body) : '';
    if (bodyStr.length > maxBytes) {
      SecurityController.logSecurityEvent(actionName, context, 'DENIED', 'Payload too large');
      res.status(413).json({
        error: 'Payload Too Large',
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request payload exceeds maximum allowed size.',
        requestId,
      });
      return false;
    }

    // 4. Honeypot check (Spam defense)
    if (options.enableHoneypot !== false && req.body && typeof req.body === 'object') {
      const honeypotFields = options.honeypotFields || DEFAULT_HONEYPOT_FIELDS;
      const body = req.body;
      const fields = body.fields || body;

      for (const field of honeypotFields) {
        if (fields[field] && typeof fields[field] === 'string' && fields[field].trim().length > 0) {
          SecurityController.logSecurityEvent(actionName, context, 'DENIED', `Spam honeypot triggered (${field})`);
          // Return generic 400 to prevent bot learning
          res.status(400).json({
            error: 'Bad Request',
            code: 'VALIDATION_FAILED',
            message: 'Invalid submission parameters.',
            requestId,
          });
          return false;
        }
      }
    }

    // 5. Email format validation
    if (options.validateEmail && req.body) {
      const fields = req.body.fields || req.body;
      const email = typeof fields.email === 'string' ? fields.email.trim() : '';

      if (email) {
        if (!EMAIL_REGEX.test(email)) {
          SecurityController.logSecurityEvent(actionName, context, 'DENIED', `Invalid email format: ${email}`);
          res.status(400).json({
            error: 'Bad Request',
            code: 'INVALID_EMAIL_FORMAT',
            message: 'Please provide a valid corporate email address.',
            requestId,
          });
          return false;
        }

        const domain = email.split('@')[1]?.toLowerCase();
        if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
          SecurityController.logSecurityEvent(actionName, context, 'DENIED', `Disposable email domain rejected: ${domain}`);
          res.status(400).json({
            error: 'Bad Request',
            code: 'DISPOSABLE_EMAIL_PROHIBITED',
            message: 'Disposable or temporary email providers are not accepted. Please use a work or personal email.',
            requestId,
          });
          return false;
        }
      }
    }

    (req as any).securityContext = context;
    return true;
  }

  /**
   * Diagnostic summary of the Security Controller.
   * Safe to return in admin health checks without leaking secrets.
   */
  public static getDiagnosticStatus() {
    const { isConfigured, allowed } = SecurityController.getConfiguredSecrets();
    const outboundJiraConfigured = Boolean(SecurityController.getOutboundJiraToken());

    return {
      status: isConfigured ? 'ACTIVE' : 'DEGRADED_UNCONFIGURED_SECRET',
      controllerVersion: 'ProfitMachines-SecurityController/v2',
      primarySecretConfigured: Boolean(process.env.API_SECURITY_SECRET || process.env.SECURITY_CONTROLLER_SECRET),
      legacyCronSecretConfigured: Boolean(process.env.REPORT_CRON_SECRET || process.env.CRON_SECRET),
      totalAcceptedSecrets: allowed.length,
      outboundJiraTokenConfigured: outboundJiraConfigured,
      separationEnforced: true,
      supportedAuthMethods: ['Authorization: Bearer <API_SECURITY_SECRET>', 'X-API-Key: <API_SECURITY_SECRET>'],
      supportedControllers: {
        JIRA_SECURITY_CONTROLLER: process.env.JIRA_SECURITY_CONTROLLER || 'Not set (optional identifier)',
        JIRA_AUTOMATION_CONTROLLER: process.env.JIRA_AUTOMATION_CONTROLLER || 'Not set (optional identifier)',
      },
      spamProtection: {
        honeypotActive: true,
        disposableEmailFiltering: true,
        slidingWindowRateLimiting: true,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
