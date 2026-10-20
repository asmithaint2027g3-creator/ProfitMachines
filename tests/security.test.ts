import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SecurityController } from '../api/_lib/security.ts';

// Helper to create mock VercelRequest
function createMockReq(options: {
  method?: string;
  url?: string;
  headers?: Record<string, string | string[]>;
  body?: any;
  query?: Record<string, string>;
  ip?: string;
}): VercelRequest {
  return {
    method: options.method || 'GET',
    url: options.url || '/api/test',
    headers: options.headers || {},
    body: options.body || {},
    query: options.query || {},
    socket: { remoteAddress: options.ip || '192.168.1.100' },
  } as unknown as VercelRequest;
}

// Helper to create mock VercelResponse
function createMockRes() {
  let statusCode = 200;
  let jsonBody: any = null;
  let ended = false;
  const headers: Record<string, string> = {};

  const res = {
    statusCode,
    setHeader(name: string, value: string) {
      headers[name.toLowerCase()] = value;
      return res;
    },
    getHeader(name: string) {
      return headers[name.toLowerCase()];
    },
    status(code: number) {
      statusCode = code;
      res.statusCode = code;
      return res;
    },
    json(body: any) {
      jsonBody = body;
      ended = true;
      return res;
    },
    send(body: any) {
      jsonBody = body;
      ended = true;
      return res;
    },
    end() {
      ended = true;
      return res;
    },
  } as unknown as VercelResponse;

  return {
    res,
    getStatusCode: () => statusCode,
    getJson: () => jsonBody,
    isEnded: () => ended,
    getHeaders: () => headers,
  };
}

const TEST_SECRET = 'profitmachines_high_entropy_test_secret_998877';
const TEST_JIRA_TOKEN = 'ATATT3xFfGF0_mock_atlassian_outbound_jira_token_123';

describe('SecurityController - Enterprise API Security Suite', () => {
  beforeEach(() => {
    process.env.API_SECURITY_SECRET = TEST_SECRET;
    process.env.JIRA_API_TOKEN = TEST_JIRA_TOKEN;
    delete process.env.CRON_SECRET;
    delete process.env.REPORT_CRON_SECRET;
  });

  // 1. Missing credentials
  test('enforcePrivate: rejects request with missing credentials (401)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      headers: {},
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 401);
    const body = mockRes.getJson();
    assert.equal(body.error, 'Unauthorized');
    assert.equal(body.code, 'CREDENTIALS_MISSING');
    assert.match(body.message, /Authorization: Bearer <API_SECURITY_SECRET>/);
  });

  // 2. Invalid credentials
  test('enforcePrivate: rejects request with invalid credentials (401)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      headers: {
        authorization: 'Bearer incorrect_or_tampered_secret',
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 401);
    const body = mockRes.getJson();
    assert.equal(body.code, 'INVALID_CREDENTIALS');
  });

  // 3. Separation of inbound authentication from Jira outbound API token
  test('enforcePrivate: rejects inbound request attempting to use JIRA_API_TOKEN as API secret (401)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      headers: {
        authorization: `Bearer ${TEST_JIRA_TOKEN}`,
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 401);
    const body = mockRes.getJson();
    assert.equal(body.code, 'JIRA_TOKEN_SEPARATION_VIOLATION');
    assert.match(body.message, /JIRA_API_TOKEN is strictly for backend-to-Jira outbound calls/);
  });

  // 4. Unauthorized HTTP method
  test('enforcePrivate: rejects unauthorized HTTP method (405) with Allow header', async () => {
    const req = createMockReq({
      method: 'DELETE',
      url: '/api/reports/trigger',
      headers: {
        authorization: `Bearer ${TEST_SECRET}`,
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 405);
    assert.equal(mockRes.getHeaders()['allow'], 'POST');
    const body = mockRes.getJson();
    assert.equal(body.code, 'METHOD_NOT_ALLOWED');
  });

  // 5. Valid private request with Bearer token
  test('enforcePrivate: allows request with valid Bearer token (200 / true)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      headers: {
        authorization: `Bearer ${TEST_SECRET}`,
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, true);
    assert.equal((req as any).securityContext.isAuthenticated, true);
    assert.equal(mockRes.getHeaders()['x-security-controller'], 'ProfitMachines-SecurityController/v2');
  });

  // 6. Valid private request with X-API-Key header
  test('enforcePrivate: allows request with valid X-API-Key header (200 / true)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      headers: {
        'x-api-key': TEST_SECRET,
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, true);
    assert.equal((req as any).securityContext.isAuthenticated, true);
  });

  // 7. Unauthenticated safe diagnostic check on GET
  test('enforcePrivate: allows unauthenticated GET when allowSafeDiagnosticsOnGet is enabled', async () => {
    const req = createMockReq({
      method: 'GET',
      url: '/api/reports/trigger',
      headers: {},
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['GET', 'POST'],
      allowSafeDiagnosticsOnGet: true,
      requiredScope: 'automation:reports',
    });

    assert.equal(allowed, true);
    assert.equal((req as any).securityContext.isAuthenticated, false);
  });

  // 8. Inspection of JIRA_SECURITY_CONTROLLER and JIRA_AUTOMATION_CONTROLLER
  test('inspectControllerMetadata: captures controller headers as telemetry without bypassing auth', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      headers: {
        'x-jira-security-controller': 'ProfitMachinesSecurityCtl/v2.1',
        'x-jira-automation-controller': 'JiraAutomationScheduler#Rule42',
        authorization: 'Bearer bad_secret',
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePrivate(req, mockRes.res, {
      allowedMethods: ['POST'],
      requiredScope: 'automation:reports',
    });

    // Fails because secret was bad, proving the headers do not grant bypass
    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 401);

    // Verify metadata was captured
    const metadata = SecurityController.inspectControllerMetadata(req);
    assert.equal(metadata.securityControllerId, 'ProfitMachinesSecurityCtl/v2.1');
    assert.equal(metadata.automationControllerId, 'JiraAutomationScheduler#Rule42');
  });

  // 9. Public honeypot spam detection
  test('enforcePublic: detects and blocks honeypot spam field (400)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/jira-lead',
      body: {
        leadType: 'quick',
        fields: {
          name: 'Spam Bot',
          email: 'spammer@example.com',
          hp_website: 'http://spam-link.ru', // honeypot filled by bot
        },
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePublic(req, mockRes.res, {
      allowedMethods: ['POST'],
      enableHoneypot: true,
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 400);
    const body = mockRes.getJson();
    assert.equal(body.code, 'VALIDATION_FAILED');
  });

  // 10. Public disposable email blocking
  test('enforcePublic: rejects disposable email domains (400)', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/jira-lead',
      body: {
        fields: {
          name: 'Temporary User',
          email: 'fake_prospect@mailinator.com',
        },
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePublic(req, mockRes.res, {
      allowedMethods: ['POST'],
      validateEmail: true,
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 400);
    const body = mockRes.getJson();
    assert.equal(body.code, 'DISPOSABLE_EMAIL_PROHIBITED');
  });

  // 11. Public valid form submission
  test('enforcePublic: allows valid form submission without private secret', async () => {
    const req = createMockReq({
      method: 'POST',
      url: '/api/jira-lead',
      body: {
        fields: {
          name: 'Jane Doe',
          email: 'jane.doe@enterprise-corp.com',
          company: 'Enterprise Corp',
          message: 'Interested in AI Revenue Infrastructure',
        },
      },
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePublic(req, mockRes.res, {
      allowedMethods: ['POST'],
      enableHoneypot: true,
      validateEmail: true,
    });

    assert.equal(allowed, true);
  });

  // 12. Public rate limiting
  test('enforcePublic: enforces sliding window rate limiting (429)', async () => {
    const mockIp = '203.0.113.88';
    let blocked = false;
    let finalCode = 200;

    for (let i = 0; i < 6; i++) {
      const req = createMockReq({
        method: 'POST',
        url: '/api/test-flood',
        ip: mockIp,
        body: { fields: { email: 'user@company.com' } },
      });
      const mockRes = createMockRes();

      const allowed = await SecurityController.enforcePublic(req, mockRes.res, {
        allowedMethods: ['POST'],
        rateLimit: { windowMs: 10000, max: 3 },
      });

      if (!allowed) {
        blocked = true;
        finalCode = mockRes.getStatusCode();
        break;
      }
    }

    assert.equal(blocked, true);
    assert.equal(finalCode, 429);
  });

  // 13. Public payload size limit
  test('enforcePublic: rejects payloads exceeding maximum size limit (413)', async () => {
    const hugePayload = { text: 'a'.repeat(2000) };
    const req = createMockReq({
      method: 'POST',
      url: '/api/jira-lead',
      body: hugePayload,
    });
    const mockRes = createMockRes();

    const allowed = await SecurityController.enforcePublic(req, mockRes.res, {
      allowedMethods: ['POST'],
      maxPayloadBytes: 500, // 500 bytes max
    });

    assert.equal(allowed, false);
    assert.equal(mockRes.getStatusCode(), 413);
    const body = mockRes.getJson();
    assert.equal(body.code, 'PAYLOAD_TOO_LARGE');
  });

  // 14. Diagnostic status check
  test('getDiagnosticStatus: provides safe metadata without revealing actual secrets', () => {
    const status = SecurityController.getDiagnosticStatus();
    assert.equal(status.controllerVersion, 'ProfitMachines-SecurityController/v2');
    assert.equal(status.primarySecretConfigured, true);
    assert.equal(status.outboundJiraTokenConfigured, true);
    assert.equal(status.separationEnforced, true);
    assert.ok(status.spamProtection.honeypotActive);
    // Ensure secrets are never exposed in diagnostics
    const serialized = JSON.stringify(status);
    assert.equal(serialized.includes(TEST_SECRET), false);
    assert.equal(serialized.includes(TEST_JIRA_TOKEN), false);
  });
});

describe('SecurityController - Live Endpoint Handler Integration', () => {
  beforeEach(() => {
    process.env.API_SECURITY_SECRET = TEST_SECRET;
    process.env.JIRA_API_TOKEN = TEST_JIRA_TOKEN;
  });

  test('reports-trigger handler: rejects unauthenticated trigger (401)', async () => {
    const { default: reportsTriggerHandler } = await import('../api/reports-trigger.ts');
    const req = createMockReq({
      method: 'POST',
      url: '/api/reports/trigger',
      body: { period: 'daily' },
    });
    const mockRes = createMockRes();

    await reportsTriggerHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 401);
    assert.equal(mockRes.getJson().code, 'CREDENTIALS_MISSING');
  });

  test('reports-trigger handler: provides safe diagnostic on unauthenticated GET (200)', async () => {
    const { default: reportsTriggerHandler } = await import('../api/reports-trigger.ts');
    const req = createMockReq({
      method: 'GET',
      url: '/api/reports/trigger',
    });
    const mockRes = createMockRes();

    await reportsTriggerHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 200);
    const body = mockRes.getJson();
    assert.equal(body.status, 'online');
    assert.ok(body.security);
    assert.equal(body.security.controllerVersion, 'ProfitMachines-SecurityController/v2');
  });

  test('track-visitor handler: rejects unauthenticated visitor list query (401)', async () => {
    const { default: trackVisitorHandler } = await import('../api/track-visitor.ts');
    const req = createMockReq({
      method: 'GET',
      url: '/api/track-visitor',
    });
    const mockRes = createMockRes();

    await trackVisitorHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 401);
    assert.equal(mockRes.getJson().code, 'CREDENTIALS_MISSING');
  });

  test('track-visitor handler: allows public geo query without credentials (200)', async () => {
    const { default: trackVisitorHandler } = await import('../api/track-visitor.ts');
    const req = createMockReq({
      method: 'GET',
      url: '/api/track-visitor?action=geo',
      query: { action: 'geo' },
      headers: {
        'x-vercel-ip-country': 'IN',
        'x-vercel-ip-city': 'Bengaluru',
      },
    });
    const mockRes = createMockRes();

    await trackVisitorHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 200);
    const body = mockRes.getJson();
    assert.equal(body.success, true);
    assert.equal(body.geo.country, 'IN');
    assert.equal(body.geo.city, 'Bengaluru');
  });

  test('calendar handler: rejects unauthenticated cancel action (401)', async () => {
    const { default: calendarHandler } = await import('../api/calendar.ts');
    const req = createMockReq({
      method: 'POST',
      url: '/api/calendar?action=cancel',
      query: { action: 'cancel' },
      body: { eventId: 'evt_123', email: 'client@example.com' },
    });
    const mockRes = createMockRes();

    await calendarHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 401);
    assert.equal(mockRes.getJson().code, 'CREDENTIALS_MISSING');
  });

  test('jira-lead handler: blocks bot honeypot submission on public form (400)', async () => {
    const { default: jiraLeadHandler } = await import('../api/jira-lead.ts');
    const req = createMockReq({
      method: 'POST',
      url: '/api/jira-lead',
      body: {
        leadType: 'quick',
        fields: {
          name: 'Spam Bot',
          email: 'bot@spammer.net',
          hp_website: 'http://scam-site.com',
        },
      },
    });
    const mockRes = createMockRes();

    await jiraLeadHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 400);
    assert.equal(mockRes.getJson().code, 'VALIDATION_FAILED');
  });

  test('jira-lead handler: blocks disposable email on public form (400)', async () => {
    const { default: jiraLeadHandler } = await import('../api/jira-lead.ts');
    const req = createMockReq({
      method: 'POST',
      url: '/api/jira-lead',
      body: {
        leadType: 'quick',
        fields: {
          name: 'Fake Person',
          email: 'throwaway@tempmail.com',
        },
      },
    });
    const mockRes = createMockRes();

    await jiraLeadHandler(req, mockRes.res);

    assert.equal(mockRes.getStatusCode(), 400);
    assert.equal(mockRes.getJson().code, 'DISPOSABLE_EMAIL_PROHIBITED');
  });
});


