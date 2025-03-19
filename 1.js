const { exec } = require('child_process');
const crypto = require('crypto');
require('dotenv').config();

// Your credentials
const apiKey = process.env.API_KEY;
const secret = process.env.API_SECRET;

// Request body
const body = {
    fiatType: '12',
    customerId: 'vqzubP9504_3491',
    type: '3',
    urls: '{"passportFront.jpg": "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg","passportBack.jpg": "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg","selfie.jpg": "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg"}'
};

// Generate headers
const timestamp = Date.now().toString();
const obj = { body, timestamp };
const payload = Buffer.from(JSON.stringify(obj)).toString('base64');
const signature = crypto.createHmac('sha512', secret).update(payload).digest('hex');

// Construct curl command
const curlCommand = `curl --location 'https://api-test.onramp.money/onramp/api/v2/whiteLabel/kyc/submitFiles' \\
--header 'apiKey: ${apiKey}' \\
--header 'payload: ${payload}' \\
--header 'signature: ${signature}' \\
--header 'timestamp: ${timestamp}' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'fiatType=12' \\
--data-urlencode 'customerId=vqzubP9504_3491' \\
--data-urlencode 'type=3' \\
--data-urlencode 'urls={"passportFront.jpg": "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg","passportBack.jpg": "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg","selfie.jpg": "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg"}'`;

console.log('Generated Headers:');
console.log('timestamp:', timestamp);
console.log('payload:', payload);
console.log('signature:', signature);
console.log('\nExecuting curl command...\n');

// Execute curl command
exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    if (stderr) {
        console.error('Stderr:', stderr);
    }
    console.log('Response:', stdout);
});
