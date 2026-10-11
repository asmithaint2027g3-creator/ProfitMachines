/**
 * api/_lib/jira.ts
 * Enterprise Jira Cloud Bridge for ProfitMachines
 * Captures 7 Lead Types as Tasks with Auto-Generated Subtasks in Jira Space (Project: PROF)
 */

import dotenv from 'dotenv';
dotenv.config();

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
            '1. Initial Contact & Identity Verification',
            '2. Schedule 15-Minute Executive Discovery Call',
            '3. Qualify Revenue Band & AI Opportunity Fit'
        ]
    },
    enterprise: {
        title: 'Enterprise Architecture Lead',
        label: 'enterprise-lead',
        priority: 'Highest',
        subtasks: [
            '1. Account & Tech Stack Intelligence Research',
            '2. Tailor Enterprise AI Proposal & Solution Architecture',
            '3. Schedule Briefing with Principal AI Architect',
            '4. Finalize Commercial Scope & Pilot SOW'
        ]
    },
    demo: {
        title: 'Live Demo Booking',
        label: 'demo-booking',
        priority: 'Highest',
        subtasks: [
            '1. Provision Custom Demo Sandbox & Industry Scenario Deck',
            '2. Send Calendar Confirmation & Pre-Meeting Brief',
            '3. Execute Live AI Platform Walkthrough',
            '4. Post-Demo Commercial Proposal Follow-up'
        ]
    },
    consultation: {
        title: 'Strategic Consultation Request',
        label: 'consultation-request',
        priority: 'Highest',
        subtasks: [
            '1. Review Pre-Consultation Dossier & Pain Points',
            '2. Assign Senior AI Growth Strategist',
            '3. Conduct 45-Minute Strategic Architecture Session',
            '4. Deliver Custom Profit Roadmap & ROI Projection'
        ]
    },
    audit: {
        title: 'Revenue & Profit Diagnostic Audit',
        label: 'diagnostic-audit',
        priority: 'High',
        subtasks: [
            '1. Synthesize Self-Assessment Diagnostic Responses & Leakage Metrics',
            '2. Compile Comprehensive Executive Revenue Audit Dossier',
            '3. Schedule Audit Review & Action Plan Briefing'
        ]
    },
    chatbot: {
        title: 'AI Chatbot Inbound Lead',
        label: 'chatbot-inbound',
        priority: 'High',
        subtasks: [
            '1. Review Chatbot Conversation Transcript & Prospect Intent Topic',
            '2. Rapid SDR Outreach via Email / Phone',
            '3. Transition Bot Inquiry to Scheduled Consultation'
        ]
    },
    partner: {
        title: 'Partner Ecosystem Application',
        label: 'partner-ecosystem',
        priority: 'Medium',
        subtasks: [
            '1. Review Partner Agency Capabilities & Tier Alignment',
            '2. Internal Channel Leadership Review',
            '3. Schedule Partnership Briefing & Joint Go-To-Market Discussion'
        ]
    },
    career: {
        title: 'Career & Talent Application',
        label: 'career-application',
        priority: 'Medium',
        subtasks: [
            '1. Review Resume, GitHub/Portfolio & Experience Level',
            '2. Conduct Initial People & Culture Screening Call',
            '3. Schedule Technical Assessment & Leadership Interview'
        ]
    }
};

/**
 * Builds an Atlassian Document Format (ADF) description for Jira REST API v3
 */
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

/**
 * Creates a Lead Task in Jira and automatically provisions all related Subtasks
 */
export async function createJiraLeadTask(leadTypeInput: string, fields: LeadFields) {
    const host = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
    const email = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
    const token = process.env.JIRA_API_TOKEN || '';
    const projectKey = process.env.JIRA_PROJECT_KEY || 'PROF';

    if (!token) {
        throw new Error('JIRA_API_TOKEN is not configured in environment variables');
    }

    const typeKey = (leadTypeInput || 'quick').toLowerCase() as LeadType;
    const config = LEAD_CONFIGS[typeKey] || LEAD_CONFIGS.quick;

    const authHeader = 'Basic ' + Buffer.from(`${email}:${token}`).toString('base64');
    const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Prospect';
    const company = fields.company ? ` (${fields.company})` : '';
    const summary = `[ProfitMachines Lead] ${config.title} - ${fullName}${company}`;
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
                config.label,
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

    const parentData = await parentRes.json();
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
                const subData = await subRes.json();
                createdSubtasks.push({ key: subData.key, summary: subtaskSummary });
            }
        } catch (subErr) {
            console.warn(`[Jira] Failed to create subtask "${subtaskSummary}":`, subErr);
        }
    }

    return {
        success: true,
        taskKey: parentKey,
        taskId: parentId,
        boardUrl: `https://${host}/jira/software/projects/${projectKey}/boards/101`,
        issueUrl: `https://${host}/browse/${parentKey}`,
        leadType: config.title,
        subtasks: createdSubtasks
    };
}
