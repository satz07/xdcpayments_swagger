/**
 * @swagger
 * /whiteLabel/bank/add:
 *   post:
 *     tags:
 *       - Bank
 *     summary: Add bank account
 *     description: Add a new bank account for withdrawals
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/BankAccount'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 * 
 * /whiteLabel/bank/list:
 *   post:
 *     tags:
 *       - Bank
 *     summary: List bank accounts
 *     description: Get list of bank accounts for a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *             properties:
 *               customerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BankAccount'
 *
 * /whiteLabel/bank/addFiatAccount:
 *   post:
 *     tags:
 *       - Bank
 *     summary: Add fiat account
 *     description: Add a new fiat account for withdrawals
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - fiatAccount
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "w6Rc2asJSU_1094"
 *               fiatAccount:
 *                 type: string
 *                 example: "{\"accountNumber\":\"1234567890\",\"ifsc\":\"ABCD0001234\"}"
 *
 * /whiteLabel/bank/addFiatAccountUrl:
 *   post:
 *     tags:
 *       - Bank
 *     summary: Get fiat account URL
 *     description: Get URL for adding fiat account
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - redirectUrl
 *             properties:
 *               customerId:
 *                 type: string
 *               redirectUrl:
 *                 type: string
 *
 * /whiteLabel/bank/fiatAccounts:
 *   post:
 *     tags:
 *       - Bank
 *     summary: List fiat accounts
 *     description: Get list of fiat accounts for a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "w6Rc2asJSU_1094"
 */ 