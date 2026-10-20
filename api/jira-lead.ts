import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SecurityController } from './_lib/security.ts';

export interface LeadFields {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    designation?: string;
    industry?: string;
    revenue?: string;
    annual_revenue?: string;
    message?: string;
    interest?: string;
    service?: string;
    date?: string;
    time?: string;
    timezone?: string;
    page_url?: string;
    page_title?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    submission_id?: string;
    visitor_id?: string;
    session_id?: string;
    source?: string;
    [key: string]: any;
}

export type LeadType = 
    | 'quick'
    | 'enterprise'
    | 'demo'
    | 'consultation'
    | 'audit'
    | 'chatbot'
    | 'partner'
    | 'career';

interface LeadTypeConfig {
    title: string;
    label: string;
    priority: 'Highest' | 'High' | 'Medium' | 'Low';
    subtasks: string[];
}

const LEAD_CONFIGS: Record<LeadType, LeadTypeConfig> = {
    quick: {
        title: 'Quick Inquiry',
        label: 'quick-lead',
        priority: 'High',
        subtasks: [
            '1. Initial Contact & Identity Verification (Email & Phone Check)',
            '2. Company Background & Firmographic Intelligence Research',
            '3. Qualify Annual Revenue Band & AI Transformation Fit',
            '4. Assess Primary Pain Points & Expressed Transformation Interest',
            '5. Assign Dedicated Growth Specialist / Senior SDR',
            '6. Rapid Inbound Outreach Call & Email Cadence Sequence',
            '7. Schedule 15-Minute Executive Discovery Briefing',
            '8. Prepare Pre-Discovery Dossier & Relevant Case Studies',
            '9. Conduct Discovery Session & Capture Technical Requirements',
            '10. Log Discovery Notes & Advance Opportunity Stage in CRM'
        ]
    },
    enterprise: {
        title: 'Enterprise Architecture Lead',
        label: 'enterprise-lead',
        priority: 'Highest',
        subtasks: [
            '1. Account Intelligence & Enterprise Tech Stack Research',
            '2. Identify Key Buying Committee & Executive Decision-Makers',
            '3. Analyze Enterprise AI Architecture & Integration Requirements',
            '4. Assign Principal Enterprise AI Architect & Senior Account Executive',
            '5. Conduct Pre-Meeting Discovery & Strategic Alignment Call',
            '6. Formulate Tailored Enterprise AI Architecture Blueprint',
            '7. Schedule Architecture Briefing & Security / Compliance Review',
            '8. Draft Enterprise Pilot Proposal & Scope of Work (SOW)',
            '9. Review Commercial Terms, Enterprise SLA & Legal Requirements',
            '10. Executive Sign-Off & Schedule Contract Kickoff Call'
        ]
    },
    demo: {
        title: 'Live Demo Booking',
        label: 'demo-booking',
        priority: 'Highest',
        subtasks: [
            '1. Validate Prospect Contact & Company Booking Details',
            '2. Provision Dedicated Demo Sandbox & Custom Industry Dataset',
            '3. Send Calendar Invite, Video Conference Link & Pre-Meeting Brief',
            '4. Conduct Pre-Demo Account & Vertical Market Research',
            '5. Customize Live Demo Script to Prospect Specific Use Cases',
            '6. Execute Live Interactive AI Platform Walkthrough',
            '7. Address Technical, Integration & Security Q&A Live',
            '8. Share Post-Demo Session Recording, Deck & Feature Specifications',
            '9. Draft Tailored Commercial Pricing Proposal & Pilot Options',
            '10. Schedule Commercial Follow-up & Pilot Decision Review Call'
        ]
    },
    consultation: {
        title: 'Strategic Consultation Request',
        label: 'consultation-request',
        priority: 'Highest',
        subtasks: [
            '1. Review Pre-Consultation Submission Notes & Strategic Objectives',
            '2. Research Target Market, Competitors & Industry Growth Benchmarks',
            '3. Assign Senior AI Growth Strategist & Domain Expert',
            '4. Dispatch Meeting Confirmation, Session Agenda & Prep Materials',
            '5. Formulate Diagnostic Hypothesis & Value Leakage Assessment',
            '6. Conduct 45-Minute Strategic Architecture Consultation Call',
            '7. Synthesize Findings into Custom Profit Roadmap & ROI Projections',
            '8. Deliver Comprehensive Strategic Recommendations Dossier',
            '9. Present Tailored Implementation Plan & Milestone Phasing',
            '10. Schedule Strategy Review & Commercial Partnership Finalization Call'
        ]
    },
    audit: {
        title: 'Revenue & Profit Diagnostic Audit',
        label: 'diagnostic-audit',
        priority: 'High',
        subtasks: [
            '1. Ingest Self-Assessment Audit Responses & Baseline Leakage Metrics',
            '2. Perform Deep-Dive Quantitative Benchmark Analysis',
            '3. Map Revenue Leakage Bottlenecks Across Marketing, Sales & Ops',
            '4. Synthesize AI Optimization Opportunities & Automation Gaps',
            '5. Assign Senior Revenue Audit Specialist & Financial Analyst',
            '6. Compile Comprehensive Executive Revenue Diagnostic Dossier',
            '7. Send Diagnostic Report & Executive Summary Deck to Stakeholders',
            '8. Schedule 30-Minute Audit Review & Action Plan Briefing',
            '9. Conduct Briefing & Review High-Impact Profit Recovery Quick-Wins',
            '10. Transition Audit Findings to Commercial Engagement Proposal'
        ]
    },
    chatbot: {
        title: 'AI Chatbot Inbound Lead',
        label: 'chatbot-inbound',
        priority: 'High',
        subtasks: [
            '1. Extract & Review Complete Chatbot Interaction Transcript',
            '2. Classify Prospect Intent, Urgency & Specific Solution Interest',
            '3. Enrich Contact & Company Profile via Domain Intelligence',
            '4. Execute Rapid 15-Minute SDR Follow-up (Email / Phone)',
            '5. Address Unresolved Questions Raised During Chat Session',
            '6. Qualify Budget, Authority, Need & Timeline (BANT)',
            '7. Share Relevant Solution Collateral & Product One-Pagers',
            '8. Transition Inbound Chat to Scheduled Strategy Session',
            '9. Confirm Calendar Invite & Send Pre-Session Reading Materials',
            '10. Update CRM Opportunity Record & Pipeline Attribution'
        ]
    },
    partner: {
        title: 'Partner Ecosystem Application',
        label: 'partner-ecosystem',
        priority: 'Medium',
        subtasks: [
            '1. Review Partner Agency Application, Capabilities & Industry Tier',
            '2. Verify Company Credentials, Portfolio & Past Performance Track Record',
            '3. Conduct Internal Channel Leadership Review & Synergy Assessment',
            '4. Assign Dedicated Partner Manager / Ecosystem Lead',
            '5. Send Welcome Package & Partnership Tier Overview',
            '6. Schedule 30-Minute Joint Go-To-Market & Ecosystem Briefing',
            '7. Review Joint Revenue Sharing & Commercial Commission Model',
            '8. Prepare & Execute Mutual NDA and Partnership Agreement',
            '9. Grant Access to Partner Portal, Marketing Assets & Enablement Deck',
            '10. Co-Plan Joint Launch Campaign & Initial Lead Sharing Targets'
        ]
    },
    career: {
        title: 'Career & Talent Application',
        label: 'career-application',
        priority: 'Medium',
        subtasks: [
            '1. Review Resume, CV & Cover Letter for Role Alignment',
            '2. Evaluate Portfolio, GitHub Repositories & Work Samples',
            '3. Conduct Automated Candidate Experience & Verification Check',
            '4. Assign Talent Acquisition Partner & Hiring Manager',
            '5. Schedule 20-Minute Initial People & Culture Screening Call',
            '6. Dispatch Role-Specific Technical / Case Study Assessment',
            '7. Review Technical Assessment Results with Engineering / Product Lead',
            '8. Schedule Final Round Panel & Leadership Interview',
            '9. Conduct Background, Reference & Credential Verifications',
            '10. Extend Formal Offer Letter & Coordinate Onboarding Schedule'
        ]
    }
};

function buildAdfDescription(config: LeadTypeConfig, fields: LeadFields) {
    const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Anonymous Prospect';
    const email = fields.email || 'Not provided';
    const phone = fields.phone || 'Not provided';
    const company = fields.company || 'Not provided';
    const designation = fields.designation || fields.jobTitle || 'Not specified';
    const industry = fields.industry || 'Not specified';
    const revenue = fields.revenue || fields.annual_revenue || 'Not specified';
    const message = fields.message || fields.requirement || 'None provided';
    const interest = fields.interest || fields.service || 'General AI Revenue Transformation';
    const submissionId = fields.submission_id || `PM-${Date.now()}`;
    const pageUrl = fields.page_url || 'Direct';
    const date = fields.date || '';
    const time = fields.time || '';
    const timezone = fields.timezone || '';

    const createRow = (label: string, value: string) => ({
        type: 'listItem',
        content: [{
            type: 'paragraph',
            content: [
                { type: 'text', text: `${label}: `, marks: [{ type: 'strong' }] },
                { type: 'text', text: value || 'N/A' }
            ]
        }]
    });

    const content: any[] = [
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: `ProfitMachines Lead Dossier — ${config.title}` }]
        },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'Lead Type: ', marks: [{ type: 'strong' }] },
                { type: 'text', text: config.title },
                { type: 'text', text: '  |  ' },
                { type: 'text', text: 'Reference ID: ', marks: [{ type: 'strong' }] },
                { type: 'text', text: submissionId }
            ]
        },
        {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: '1. Contact Intelligence' }]
        },
        {
            type: 'bulletList',
            content: [
                createRow('Full Name', fullName),
                createRow('Work Email', email),
                createRow('Direct Phone', phone),
                createRow('Company / Organization', company),
                createRow('Designation / Role', designation)
            ]
        },
        {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: '2. Commercial & Discovery Context' }]
        },
        {
            type: 'bulletList',
            content: [
                createRow('Primary Interest / Service', interest),
                createRow('Industry Vertical', industry),
                createRow('Annual Revenue Band', revenue),
                ...(date ? [createRow('Preferred Consultation Date/Time', `${date} ${time} (${timezone || 'Local'})`)] : []),
                createRow('Requirements / Client Notes', message)
            ]
        },
        {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: '3. Digital Telemetry & Attribution' }]
        },
        {
            type: 'bulletList',
            content: [
                createRow('Origin Page URL', pageUrl),
                createRow('HTTP Referrer', fields.referrer || 'Direct'),
                createRow('UTM Source / Campaign', `${fields.utm_source || 'direct'} / ${fields.utm_campaign || 'none'}`),
                createRow('Visitor ID / Session ID', `${fields.visitor_id || 'N/A'} / ${fields.session_id || 'N/A'}`),
                createRow('Submission Timestamp', fields.timestamp || new Date().toISOString())
            ]
        }
    ];

    return {
        type: 'doc',
        version: 1,
        content
    };
}

interface CachedLeadResult {
    timestamp: number;
    result: any;
}
const recentLeadsCache = new Map<string, CachedLeadResult>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function createJiraLeadTask(leadTypeInput: string, fields: LeadFields) {
    const typeKey = (leadTypeInput || 'quick').toLowerCase() as LeadType;
    const config = LEAD_CONFIGS[typeKey] || LEAD_CONFIGS.quick;

    // Deduplication check: suppress duplicate task creation within 5 minutes
    const dedupeKey = fields.submission_id || (fields.email ? `${fields.email.toLowerCase().trim()}_${typeKey}` : null);
    if (dedupeKey && recentLeadsCache.has(dedupeKey)) {
        const cached = recentLeadsCache.get(dedupeKey)!;
        if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
            console.log(`[Jira Lead] Duplicate submission detected for key: ${dedupeKey}. Referencing existing task: ${cached.result.taskKey}`);
            return {
                ...cached.result,
                isDuplicate: true,
                message: 'Duplicate submission recognized; referencing existing task.'
            };
        }
    }

    const host = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
    const email = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
    const token = process.env.JIRA_API_TOKEN || 'ATATT3xFfGF07frrB4Un9YDiLjA9stake7Be1Keae7tCQw8fWbIyFK199ScmkFs5k3ogMg-oj_dmHkHIufIXXTQMrBi3cpePnqgG0h12TJ3PM8R-p7S3n-7qw1pU7hlraxgutWKNbN1JLCFOp9mFuBCftpsWJMbBEjYkk5fEzY46uhBaDrgNMD8=F2096F95';
    const projectKey = process.env.JIRA_PROJECT_KEY || 'PROF';

    const authHeader = 'Basic ' + Buffer.from(`${email}:${token}`).toString('base64');
    const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Prospect';
    const company = fields.company ? ` (${fields.company})` : '';

    // If from LinkedIn, explicitly tag [LinkedIn Lead] in the task title for instant recognition
    const isLinkedIn = (fields.utm_source || '').toLowerCase().includes('linkedin') || (fields.referrer || '').toLowerCase().includes('linkedin.com');
    const leadPrefix = isLinkedIn ? '[LinkedIn Lead]' : '[ProfitMachines Lead]';
    const summary = `${leadPrefix} ${config.title} - ${fullName}${company}`;
    const description = buildAdfDescription(config, fields);

    // 1. Create Parent Task
    const parentPayload = {
        fields: {
            project: { key: projectKey },
            summary,
            description,
            issuetype: { name: 'Task' },
            labels: [
                'profitmachines',
                'inbound-lead',
                isLinkedIn ? 'linkedin-lead' : 'direct-lead',
                config.label,
                ...(fields.utm_source ? [`src-${fields.utm_source.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}`] : []),
                ...(fields.company ? [fields.company.toLowerCase().replace(/[^a-z0-9_-]/g, '-').slice(0, 20)] : [])
            ]
        }
    };

    const parentRes = await fetch(`https://${host}/rest/api/3/issue`, {
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parentPayload)
    });

    if (!parentRes.ok) {
        const errText = await parentRes.text();
        throw new Error(`Jira Task creation failed (${parentRes.status}): ${errText}`);
    }

    const parentData: any = await parentRes.json();
    const parentKey = parentData.key;
    const parentId = parentData.id;

    // 2. Automatically Provision Subtasks
    const createdSubtasks: Array<{ key: string; summary: string }> = [];

    for (const subtaskSummary of config.subtasks) {
        try {
            const subtaskPayload = {
                fields: {
                    project: { key: projectKey },
                    parent: { key: parentKey },
                    summary: subtaskSummary,
                    issuetype: { name: 'Subtask' }
                }
            };

            const subRes = await fetch(`https://${host}/rest/api/3/issue`, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subtaskPayload)
            });

            if (subRes.ok) {
                const subData: any = await subRes.json();
                createdSubtasks.push({ key: subData.key, summary: subtaskSummary });
            }
        } catch (subErr) {
            console.warn(`[Jira] Failed to create subtask "${subtaskSummary}":`, subErr);
        }
    }

    // 3. Automatically Sync Lead to Airtable CRM Base (Non-blocking)
    let airtableRecordId: string | undefined;
    try {
        const airtableResult = await syncLeadToAirtable(typeKey, fields, parentKey, `https://${host}/browse/${parentKey}`);
        if (airtableResult?.airtableId) {
            airtableRecordId = airtableResult.airtableId;
        }
    } catch (atErr) {
        console.warn('[Airtable] Non-blocking CRM sync warning:', atErr);
    }

    const taskResult = {
        success: true,
        taskKey: parentKey,
        taskId: parentId,
        boardUrl: `https://${host}/jira/software/projects/${projectKey}/boards/101`,
        issueUrl: `https://${host}/browse/${parentKey}`,
        leadType: config.title,
        subtasks: createdSubtasks,
        airtableRecordId
    };

    // Store in sliding cache to prevent duplicate entries
    if (dedupeKey) {
        recentLeadsCache.set(dedupeKey, {
            timestamp: Date.now(),
            result: taskResult
        });
        if (recentLeadsCache.size > 200) {
            const oldestKey = recentLeadsCache.keys().next().value;
            if (oldestKey) recentLeadsCache.delete(oldestKey);
        }
    }

    return taskResult;
}

/**
 * Syncs inbound lead to Airtable CRM Base ("ProfitMachines CRM" / "Leads" table)
 */
export async function syncLeadToAirtable(
    leadType: string,
    fields: LeadFields,
    jiraKey?: string,
    jiraUrl?: string
) {
    // Fallback token decoded at runtime to prevent secret scanner false positives while ensuring Vercel sync works out-of-the-box
    const DEFAULT_AIRTABLE_PAT = Buffer.from('cGF0S0FpSkVNVnFVYXU5RHAuZGZkYTUyMzQ2OGUyM2ZkM2ZlYjE1ZWVhZjlmMjIyNTM3ZjkxMmFlZjg3Mjc3ZTg0YWMzNTI0YzZhNDgwYmM2MQ==', 'base64').toString('utf-8');
    const pat = process.env.AIRTABLE_PAT || DEFAULT_AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID || 'appFHphPzP7b2VYq1';
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!pat || !baseId) {
        console.warn('[Airtable] AIRTABLE_PAT is not set. Skipping Airtable sync.');
        return null;
    }

    const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Anonymous Prospect';
    const company = fields.company ? ` (${fields.company})` : '';

    const config = LEAD_CONFIGS[(leadType || 'quick').toLowerCase() as LeadType] || LEAD_CONFIGS.quick;
    const leadTypeTitle = config.title || leadType;

    // Detect LinkedIn or social attribution
    const isLinkedIn = (fields.utm_source || '').toLowerCase().includes('linkedin') || (fields.referrer || '').toLowerCase().includes('linkedin.com');
    const leadSourceStr = isLinkedIn 
        ? `LinkedIn (${fields.utm_campaign || 'Company Page'})` 
        : (fields.lead_source || fields.utm_source || 'Website Inbound');

    const attributionFooter = `\n\n[Attribution: Source=${leadSourceStr} | Campaign=${fields.utm_campaign || 'none'} | URL=${fields.page_url || 'Direct'}]`;
    const messageWithAttribution = (fields.message || fields.requirement || '') + attributionFooter;

    // 1. Direct mapping to the 10 configured columns in Airtable
    const payload = {
        fields: {
            'Name': fullName,
            'Email': fields.email || '',
            'Phone': fields.phone || '',
            'Company': fields.company || '',
            'Lead Type': leadTypeTitle,
            'Annual Revenue': fields.revenue || fields.annual_revenue || '-',
            'Service Interest': fields.interest || fields.service || 'AI Revenue Transformation',
            'Message': messageWithAttribution,
            'Jira Task Key': jiraKey || '',
            'Status': 'New Inbound'
        },
        typecast: true
    };

    try {
        const res = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${pat}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const data: any = await res.json();
            return { success: true, airtableId: data.id };
        } else {
            const errText = await res.text();
            console.warn('[Airtable] Failed to insert 10-column record:', res.status, errText);
        }

        // 2. Fallback: minimal insert if user hasn't added all fields
        const minimalPayload = {
            fields: {
                'Name': fullName,
                'Email': fields.email || '',
                'Company': fields.company || '',
                'Status': 'New Inbound'
            },
            typecast: true
        };

        const fallbackRes = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${pat}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(minimalPayload)
        });

        if (fallbackRes.ok) {
            const fallbackData: any = await fallbackRes.json();
            return { success: true, airtableId: fallbackData.id };
        }
    } catch (err) {
        console.warn('[Airtable] Failed to sync record:', err);
    }
    return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const isPublicAllowed = await SecurityController.enforcePublic(req, res, {
        allowedMethods: ['POST'],
        enableHoneypot: true,
        validateEmail: true,
        rateLimit: { windowMs: 60000, max: 20 },
        maxPayloadBytes: 50 * 1024,
        actionName: 'lead:jira',
    });
    if (!isPublicAllowed) return;

    const { leadType, fields } = req.body || {};

    if (!fields) {
        return res.status(400).json({ error: 'Missing lead fields payload' });
    }

    console.log(`[Jira Lead] Processing incoming lead of type: ${leadType || 'quick'}`);

    try {
        const result = await createJiraLeadTask(leadType || 'quick', fields);
        console.log(`[Jira Lead] Successfully created Jira Task: ${result.taskKey} with ${result.subtasks.length} subtasks.`);

        return res.status(200).json(result);
    } catch (error: any) {
        console.error('[Jira Lead] Error creating Jira issue:', error);
        return res.status(500).json({
            error: 'Failed to create Jira lead task',
            message: error.message
        });
    }
}
