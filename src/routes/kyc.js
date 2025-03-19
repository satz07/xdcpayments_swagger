/**
 * @swagger
 * /whiteLabel/kyc/submit:
 *   post:
 *     security:
 *       - WhiteLabelAuth: []
 *     tags:
 *       - KYC
 *     summary: Submit KYC details
 *     description: Submit customer KYC information for verification
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/KYCRequest'
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
 * /whiteLabel/kyc/status:
 *   post:
 *     tags:
 *       - KYC
 *     summary: Check KYC status
 *     description: Get the KYC verification status for a customer
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KYCStatus'
 * 
 * /whiteLabel/kyc/url:
 *   post:
 *     security:
 *       - WhiteLabelAuth: []
 *     tags:
 *       - KYC
 *     summary: Get KYC URL
 *     description: Get the URL for KYC verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - clientCustomerId
 *               - phoneNumber
 *               - type
 *               - closeAfterLogin
 *             properties:
 *               clientCustomerId:
 *                 type: string
 *                 example: "vqzubP9504_3491"
 *               phoneNumber:
 *                 type: string
 *                 description: Must start with '+' and contain only numbers
 *                 example: "+919876543210"
 *               type:
 *                 type: string
 *                 enum: [INDIVIDUAL]
 *                 default: INDIVIDUAL
 *                 example: "INDIVIDUAL"
 *               closeAfterLogin:
 *                 type: string
 *                 default: true
 *                 example: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientCustomerId:
 *                   type: string
 *                 customerId:
 *                   type: string
 *                 kycUrl:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /whiteLabel/kyc/requirements:
 *   post:
 *     tags:
 *       - KYC
 *     summary: Get KYC requirements
 *     description: Get KYC requirements for a specific fiat type
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
 *               fiatType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *
 * /whiteLabel/kyc/submitData:
 *   post:
 *     tags:
 *       - KYC
 *     summary: Submit KYC data
 *     description: Submit customer KYC information
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - address
 *               - details
 *               - fiatType
 *               - identityNumber
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "w6Rc2asJSU_1094"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City"
 *               details:
 *                 type: string
 *                 example: "{\"firstName\":\"John\",\"lastName\":\"Doe\"}"
 *               fiatType:
 *                 type: string
 *                 example: "INR"
 *               identityNumber:
 *                 type: string
 *                 example: "ABCDE1234F"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const authorize = require('../auth/authorize');

const createKycRouter = (apiKey, secret) => {
    // Initialize API client with auth for external API
    const externalApi = axios.create({
        baseURL: 'https://api-test.onramp.money',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });

    // Add authorization interceptor
    externalApi.interceptors.request.use(authorize(apiKey, secret));

    router.post('/whiteLabel/kyc/url', async (req, res) => {
        try {
            console.log("Request received at /whiteLabel/kyc/url");
            const { clientCustomerId, phoneNumber } = req.body;
            
            // Create request body
            const requestBody = {
                clientCustomerId,
                phoneNumber,
                type: 'INDIVIDUAL',
                closeAfterLogin: "true"
            };
            
            console.log('Making request to external API with body:', requestBody);
            
            // Make request to external API
            const response = await externalApi.post('/onramp/api/v2/whiteLabel/kyc/url', requestBody);
            
            console.log('External API Response:', {
                status: response.status,
                headers: response.headers,
                data: response.data
            });
            
            res.json(response.data);
        } catch (error) {
            console.error('KYC URL Error:', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
                message: error.message
            });
            res.status(error.response?.status || 500).json({
                error: error.response?.data?.error || error.message
            });
        }
    });

    // Add KYC status endpoint
    router.post('/whiteLabel/kyc/status', async (req, res) => {
        try {
            console.log("Request received at /kyc/status");
            const requestBody = req.body;
            
            console.log('Making request to external API with body:', requestBody);
            
            const response = await externalApi.post('/onramp/api/v2/whiteLabel/kyc/status', requestBody);
            
            console.log('External API Response:', {
                status: response.status,
                headers: response.headers,
                data: response.data
            });
            
            res.json(response.data);
        } catch (error) {
            console.error('KYC Status Error:', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
                message: error.message
            });
            res.status(error.response?.status || 500).json({
                error: error.response?.data?.error || error.message
            });
        }
    });

    return router;
};

module.exports = createKycRouter; 