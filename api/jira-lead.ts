import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createJiraLeadTask } from './_lib/jira';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers for secure browser submissions
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

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
