/**
 * @swagger
 * /whiteLabel/kyb/requirements:
 *   get:
 *     tags:
 *       - KYB
 *     summary: Get KYB requirements
 *     description: Get the KYB requirements for a specific country
 *     parameters:
 *       - in: query
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Country code (e.g., IND)
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
 * /whiteLabel/kyb/submit:
 *   post:
 *     tags:
 *       - KYB
 *     summary: Submit KYB details
 *     description: Submit KYB information for verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - entityName
 *               - legalEntityNature
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Unique identifier for the customer
 *               entityName:
 *                 type: string
 *                 description: Name of the entity
 *               legalEntityNature:
 *                 type: string
 *                 description: Nature of the legal entity
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
 * /whiteLabel/kyb/status:
 *   post:
 *     tags:
 *       - KYB
 *     summary: Check KYB status
 *     description: Check the status of a KYB submission
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - submissionId
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Unique identifier for the customer
 *               submissionId:
 *                 type: string
 *                 description: KYB submission ID
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
 */ 