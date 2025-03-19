/**
 * @swagger
 * components:
 *   securitySchemes:
 *     WhiteLabelAuth:
 *       description: |
 *         ```javascript
 *         // Set your credentials
 *         const apiKey = "YOUR_API_KEY"; 
 *         const secret = "YOUR_SECRET";
 *         
 *         // Get request body
 *         let body = {};
 *         if(pm.request.body.urlencoded) {
 *             body = pm.request.body.urlencoded.reduce((data, param) => {
 *                 data[param.key] = param.value;
 *                 return data;
 *             }, {});   
 *         } else if(pm.request.body.formdata) {
 *             body = pm.request.body.formdata.reduce((data, param) => {
 *                 data[param.key] = param.value;
 *                 return data;
 *             }, {});
 *         }
 *         
 *         // Generate and set headers
 *         const timestamp = Date.now().toString();
 *         const obj = { body, timestamp };
 *         const payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(obj)));
 *         const signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA512(payload, secret));
 *         
 *         pm.request.headers.add({ key: "apiKey", value: apiKey });
 *         pm.request.headers.add({ key: "payload", value: payload });
 *         pm.request.headers.add({ key: "signature", value: signature });
 *         pm.request.headers.add({ key: "timestamp", value: timestamp });
 *         ```
 */ 