/**
 * @swagger
 * /whiteLabel/support/createTicket:
 *   post:
 *     tags:
 *       - Support
 *     summary: Create support ticket
 *     description: Create a new support ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - subject
 *               - message
 *               - issueType
 *               - email
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "w6Rc2asJSU_1094"
 *               subject:
 *                 type: string
 *                 example: "Transaction Issue"
 *               message:
 *                 type: string
 *                 example: "This is a test message"
 *               issueType:
 *                 type: string
 *                 enum: [Buy Crypto, KYC, Sell Crypto, Login Issues, Bank Verification, Account Delete]
 *                 example: "Buy Crypto"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /whiteLabel/support/ticket:
 *   post:
 *     tags:
 *       - Support
 *     summary: Get support ticket
 *     description: Get details of a specific support ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - ticketId
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Unique identifier for the customer
 *               ticketId:
 *                 type: string
 *                 description: Support ticket ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportTicket'
 * 
 * /whiteLabel/support/allTickets:
 *   post:
 *     tags:
 *       - Support
 *     summary: Get all support tickets
 *     description: Get list of all support tickets for a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - page
 *               - pageSize
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Unique identifier for the customer
 *               page:
 *                 type: integer
 *                 description: Page number
 *                 minimum: 1
 *               pageSize:
 *                 type: integer
 *                 description: Number of items per page
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupportTicket'
 */ 