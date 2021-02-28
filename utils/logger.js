import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

const { stream, send } = logflarePinoVercel({
    apiKey: "B9eki42Pv1DC",
    sourceToken: "5cf79f96-0af6-4b23-8fee-3f3889f1cb50"
});

const logger = pino({
    browser: {
        transmit: {
            send: send,
        }
    },
    level: "debug",
    base: {
        env: process.env.NODE_ENV || "NODE_ENV not set",
        revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
}, stream);

const formatObjectKeys = headers => {

    const keyValues = {}
    Object.keys(headers).map(key => {
        const newKey = key.replace(/-/g, "_");
        keyValues[newKey] = headers[key]
    });

    return keyValues
}

export { logger, formatObjectKeys }