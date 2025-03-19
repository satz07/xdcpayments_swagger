/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: apiKey
 *       description: API key for authentication
 *     SignatureAuth:
 *       type: apiKey
 *       in: header
 *       name: signature
 *       description: HMAC-SHA512 signature of the payload
 *     PayloadAuth:
 *       type: apiKey
 *       in: header
 *       name: payload
 *       description: Base64 encoded request payload
 *     TimestampAuth:
 *       type: apiKey
 *       in: header
 *       name: timestamp
 *       description: Current timestamp in milliseconds
 * 
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 0
 *         code:
 *           type: integer
 *           example: 400
 *         error:
 *           type: string
 *           example: "Missing required parameters"
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 1
 *         code:
 *           type: integer
 *           example: 200
 *         data:
 *           type: object
 *     SupportTicket:
 *       type: object
 *       properties:
 *         ticketId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [2, 3, 4, 5]
 *           description: |
 *             2 - OPEN
 *             3 - PENDING
 *             4 - RESOLVED
 *             5 - CLOSED
 *         ticketDetails:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *     KYCRequest:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           description: Unique identifier for the customer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         country:
 *           type: string
 *         idType:
 *           type: string
 *           enum: [PASSPORT, DRIVING_LICENSE, NATIONAL_ID]
 *         idNumber:
 *           type: string
 *         idFront:
 *           type: string
 *           format: binary
 *         idBack:
 *           type: string
 *           format: binary
 *         selfie:
 *           type: string
 *           format: binary
 *     KYCStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         remarks:
 *           type: string
 *     BankAccount:
 *       type: object
 *       properties:
 *         accountId:
 *           type: string
 *         accountHolderName:
 *           type: string
 *         accountNumber:
 *           type: string
 *         bankName:
 *           type: string
 *         ifscCode:
 *           type: string
 *         accountType:
 *           type: string
 *           enum: [SAVINGS, CURRENT]
 *         isVerified:
 *           type: boolean
 *         isPrimary:
 *           type: boolean
 *     OnrampTransaction:
 *       type: object
 *       properties:
 *         transactionId:
 *           type: string
 *         customerId:
 *           type: string
 *         fiatAmount:
 *           type: number
 *         fiatCurrency:
 *           type: string
 *         cryptoAmount:
 *           type: number
 *         cryptoCurrency:
 *           type: string
 *         status:
 *           type: string
 *           enum: [INITIATED, PROCESSING, COMPLETED, FAILED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         paymentMethod:
 *           type: string
 *           enum: [UPI, BANK_TRANSFER, CARD]
 *         exchangeRate:
 *           type: number
 *         fees:
 *           type: number
 *     OfframpTransaction:
 *       type: object
 *       properties:
 *         transactionId:
 *           type: string
 *         customerId:
 *           type: string
 *         cryptoAmount:
 *           type: number
 *         cryptoCurrency:
 *           type: string
 *         fiatAmount:
 *           type: number
 *         fiatCurrency:
 *           type: string
 *         status:
 *           type: string
 *           enum: [INITIATED, PROCESSING, COMPLETED, FAILED]
 *         bankAccountId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         exchangeRate:
 *           type: number
 *         fees:
 *           type: number
 *         withdrawalAddress:
 *           type: string
 *         networkFee:
 *           type: number
 *     TransactionLimits:
 *       type: object
 *       properties:
 *         minAmount:
 *           type: number
 *         maxAmount:
 *           type: number
 *         dailyLimit:
 *           type: number
 *         monthlyLimit:
 *           type: number
 *         remainingDailyLimit:
 *           type: number
 *         remainingMonthlyLimit:
 *           type: number
 *         currency:
 *           type: string
 *     WebhookPayload:
 *       type: object
 *       properties:
 *         referenceId:
 *           type: string
 *           description: Transaction ID for onramp/offramp, submission ID for KYC/KYB
 *         eventType:
 *           type: string
 *           enum: [onramp, offramp, kyc, kyb]
 *           description: Type of event that triggered the webhook
 *         status:
 *           type: string
 *           description: Current status of the event
 *         metadata:
 *           type: object
 *           description: Additional information about the event
 *     AuthenticationInfo:
 *       type: object
 *       description: |
 *         Every request must be authenticated using the following headers:
 *         1. apiKey - Your API key
 *         2. signature - HMAC-SHA512 signature of the payload using your secret
 *         3. payload - Base64 encoded JSON containing request body and timestamp
 *         4. timestamp - Current timestamp in milliseconds
 *         
 *         Example JavaScript code to generate headers:
 *         ```javascript
 *         const generateAuthHeaders = (apiKey, secret, body) => {
 *           const timestamp = Date.now().toString();
 *           const obj = {
 *             body,
 *             timestamp
 *           };
 *           const payload = CryptoJS.enc.Base64.stringify(
 *             CryptoJS.enc.Utf8.parse(JSON.stringify(obj))
 *           );
 *           const signature = CryptoJS.enc.Hex.stringify(
 *             CryptoJS.HmacSHA512(payload, secret)
 *           );
 *           
 *           return {
 *             apiKey,
 *             payload,
 *             signature,
 *             timestamp
 *           };
 *         };
 *         ```
 */ 