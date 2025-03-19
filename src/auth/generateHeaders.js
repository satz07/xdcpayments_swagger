/**
 * Generates authentication headers for API requests
 * @param {string} apiKey - Your API key
 * @param {string} secret - Your API secret
 * @param {Object} body - Request body
 * @returns {Object} Headers object with apiKey, payload, signature and timestamp
 */
const CryptoJS = require('crypto-js');

const generateHeaders = (apiKey, secret, body = {}) => {
    const timestamp = Date.now().toString();
    const obj = { body, timestamp };
    
    const payload = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(JSON.stringify(obj))
    );
    
    const signature = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA512(payload, secret)
    );

    return {
        apiKey,
        payload,
        signature,
        timestamp
    };
};

module.exports = generateHeaders; 