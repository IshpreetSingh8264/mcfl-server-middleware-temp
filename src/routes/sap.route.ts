import express, { Request, Response } from 'express';
import axios, { Method } from 'axios';
import { logWithTag } from '../util/logger';

const router = express.Router();

router.use('/', async (req: Request, res: Response) => {
    const TAG = 'SAP_MIDDLEWARE';
    try {
        const { sapUrl, username, password, sapBody } = req.body;
        const routeParam = req.params.route || req.query.route; // Fallback if needed, though req.body is primary source per logic

        // 1. Basic Validation
        if (!sapUrl || !username || !password) {
            logWithTag(TAG, 'warn', 'Missing required fields', { sapUrl, username: !!username, password: !!password });
            return res.status(400).json({
                ok: false,
                error: 'Missing required fields: sapUrl, username, or password',
            });
        }

        // 2. Construct Target URL
        // The user mentioned "http://112.196.38.156:3000/${route}" in their snippet, 
        // but also said "Example SAP url... frontend will send us details for this url".
        // The snippet used `targetUrl = new URL(...)`. 
        // We will trust the `sapUrl` from body as the base.

        let targetUrl: URL;
        try {
            targetUrl = new URL(sapUrl);
        } catch (e) {
            logWithTag(TAG, 'error', 'Invalid SAP URL', sapUrl);
            return res.status(400).json({ ok: false, error: 'Invalid SAP URL provided' });
        }

        // Append query parameters from the *incoming request* to the *outgoing SAP URL*
        // The frontend snippet did: Object.entries(req.query).forEach...
        Object.entries(req.query).forEach(([k, v]) => {
            // Exclude internal params if any (like 'route' if it was passed in query)? 
            // The snippet blindly appended all req.query. We will do the same.
            targetUrl.searchParams.append(k, v as string);
        });

        // 3. Determine Method and Body
        // "if we have SAP body, tehn we consider it a post request and send data to sap for POST"
        const hasBody = sapBody && Object.keys(sapBody).length > 0;
        const method: Method = hasBody ? 'POST' : 'GET';
        const data = hasBody ? sapBody : undefined;

        logWithTag(TAG, 'info', `Forwarding request to SAP`, {
            method,
            url: targetUrl.toString(),
            hasBody
        });

        // 4. Make Request to SAP
        // We use Basic Auth credentials provided in the boby
        const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

        const response = await axios({
            method: method,
            url: targetUrl.toString(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
                // Forward other relevant headers? 
                // The snippet forwarded `...req.headers`. 
                // We generally want to be careful forwarding host/content-length etc.
                // For now, we stick to clean new headers + auth.
            },
            data: data,
            // Axios throws by default for non-2xx. We might want to catch that and pass it through.
            validateStatus: () => true // Allow any status to be handled manually
        });

        // 5. Handle Response
        const status = response.status;
        const responseData = response.data;
        const contentType = response.headers['content-type'];

        logWithTag(TAG, 'info', `SAP Response received`, { status, contentType });

        // Send back to client
        // If it's JSON, express .json() handles it. If text, .send().
        // We can just use .status(status).send(responseData) and express handles object vs string logic often,
        // but explicitly setting type is good.

        if (contentType) {
            res.type(contentType);
        }

        return res.status(status).send(responseData);

    } catch (error: any) {
        logWithTag(TAG, 'error', 'Proxy request failed', error.message);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Internal Server Error',
        });
    }
});

export default router;
