/**
 * @swagger
 * /whiteLabel/offramp/initiate:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Initiate crypto sale
 *     description: Start a crypto to fiat transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - cryptoAmount
 *               - cryptoCurrency
 *               - bankAccountId
 *             properties:
 *               customerId:
 *                 type: string
 *               cryptoAmount:
 *                 type: number
 *               cryptoCurrency:
 *                 type: string
 *               bankAccountId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfframpTransaction'
 * 
 * /whiteLabel/offramp/status:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Check transaction status
 *     description: Get the status of an offramp transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *               - customerId
 *             properties:
 *               transactionId:
 *                 type: string
 *               customerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfframpTransaction'
 *
 * /whiteLabel/offramp/quote:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Get quote for crypto sale
 *     description: Get price quote for selling cryptocurrency
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - fromCurrency
 *               - toCurrency
 *               - fromAmount
 *               - chain
 *             properties:
 *               fromCurrency:
 *                 type: string
 *                 example: "USDT"
 *               toCurrency:
 *                 type: string
 *                 example: "AED"
 *               fromAmount:
 *                 type: string
 *                 example: "100"
 *               chain:
 *                 type: string
 *                 example: "matic20"
 *
 * /whiteLabel/offramp/createTransaction:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Create offramp transaction
 *     description: Create a new crypto to fiat transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - fromAmount
 *               - fromCurrency
 *               - toCurrency
 *               - chain
 *               - fiatAccountId
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "w6Rc2asJSU_1094"
 *               fromAmount:
 *                 type: string
 *                 example: "100"
 *               fromCurrency:
 *                 type: string
 *                 example: "USDT"
 *               toCurrency:
 *                 type: string
 *                 example: "AED"
 *               chain:
 *                 type: string
 *                 example: "matic20"
 *               fiatAccountId:
 *                 type: string
 *                 example: "4"
 *
 * /whiteLabel/offramp/transaction:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Get transaction details
 *     description: Get details of a specific offramp transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - transactionId
 *             properties:
 *               customerId:
 *                 type: string
 *               transactionId:
 *                 type: string
 *
 * /whiteLabel/offramp/allTransaction:
 *   post:
 *     tags:
 *       - Offramp
 *     summary: Get all transactions
 *     description: Get list of all offramp transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - page
 *               - pageSize
 *             properties:
 *               page:
 *                 type: string
 *               pageSize:
 *                 type: string
 */ 

const express = require('express');
const router = express.Router();
const axios = require('axios');
const authorize = require('../auth/authorize');

const createOfframpRouter = (apiKey, secret) => {
    const externalApi = axios.create({
        baseURL: 'https://api-test.onramp.money',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });

    externalApi.interceptors.request.use(authorize(apiKey, secret));

    router.post('/offramp/quote', async (req, res) => {
        try {
            console.log("Request received at /offramp/quote");
            const requestBody = req.body;
            
            console.log('Making request to external API with body:', requestBody);
            
            const response = await externalApi.post('/onramp/api/v2/whiteLabel/offramp/quote', requestBody);
            
            console.log('External API Response:', {
                status: response.status,
                headers: response.headers,
                data: response.data
            });
            
            res.json(response.data);
        } catch (error) {
            console.error('Offramp Quote Error:', {
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

module.exports = createOfframpRouter; 