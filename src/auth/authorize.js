const crypto = require('crypto');

/**
 * Adds authentication headers to your request
 * @param {string} apiKey - Your API key
 * @param {string} secret - Your API secret
 * @param {Object} requestConfig - Axios request config object
 * @returns {Object} Updated request config with auth headers
 */
const authorize = (apiKey, secret) => {
    return (requestConfig) => {
        console.log('Request Config Before:', requestConfig);

        // Get request body
        const body = requestConfig.data || {};
        
        // Generate timestamp and create payload object
        const timestamp = Date.now().toString();
        const obj = { body, timestamp };
        
        // Generate payload and signature
        const payload = Buffer.from(JSON.stringify(obj)).toString('base64');
        const signature = crypto.createHmac('sha512', secret).update(payload).digest('hex');

        // Add all required headers
        requestConfig.headers = {
            ...requestConfig.headers,
            'apiKey': apiKey,
            'payload': payload,
            'signature': signature,
            'timestamp': timestamp,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        console.log('Generated Headers:', {
            apiKey,
            payload,
            signature,
            timestamp
        });

        console.log('Request Config After:', requestConfig);

        return requestConfig;
    };
};

module.exports = authorize; 