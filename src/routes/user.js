/**
 * @swagger
 * /whiteLabel/user/limit:
 *   post:
 *     tags:
 *       - User
 *     summary: Get user limits
 *     description: Retrieve the transaction limits for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - fiatType
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Unique identifier for the customer
 *               fiatType:
 *                 type: string
 *                 description: Type of fiat currency
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionLimits'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */ 