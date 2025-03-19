/**
 * @swagger
 * /whiteLabel/onramp/initiate:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Initiate crypto purchase
 *     description: Start a fiat to crypto transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - fiatAmount
 *               - fiatCurrency
 *               - cryptoCurrency
 *               - paymentMethod
 *             properties:
 *               customerId:
 *                 type: string
 *               fiatAmount:
 *                 type: number
 *               fiatCurrency:
 *                 type: string
 *               cryptoCurrency:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OnrampTransaction'
 * 
 * /whiteLabel/onramp/status:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Check transaction status
 *     description: Get the status of an onramp transaction
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
 *               $ref: '#/components/schemas/OnrampTransaction'
 *
 * /whiteLabel/onramp/quote:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Get quote for crypto purchase
 *     description: Get price quote for buying cryptocurrency
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
 *               - paymentMethodType
 *             properties:
 *               fromCurrency:
 *                 type: string
 *                 example: "AED"
 *               toCurrency:
 *                 type: string
 *                 example: "USDT"
 *               fromAmount:
 *                 type: string
 *                 example: "1000"
 *               chain:
 *                 type: string
 *                 example: "matic20"
 *               paymentMethodType:
 *                 type: string
 *                 enum: [UPI, IMPS, AED-BANK-TRANSFER]
 *                 example: "AED-BANK-TRANSFER"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       clientFee:
 *                         type: number
 *                       gasFee:
 *                         type: string
 *                       gatewayFee:
 *                         type: number
 *                       onrampFee:
 *                         type: string
 *                       type:
 *                         type: string
 *
 * /whiteLabel/onramp/createTransaction:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Create onramp transaction
 *     description: Create a new fiat to crypto transaction
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
 *               - paymentMethodType
 *               - depositAddress
 *               - rate
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "w6Rc2asJSU_1094"
 *               fromAmount:
 *                 type: string
 *                 example: "300"
 *               fromCurrency:
 *                 type: string
 *                 example: "AED"
 *               toCurrency:
 *                 type: string
 *                 example: "USDT"
 *               chain:
 *                 type: string
 *                 example: "matic20"
 *               paymentMethodType:
 *                 type: string
 *                 example: "AED-BANK-TRANSFER"
 *               depositAddress:
 *                 type: string
 *                 example: "0x2EAf174Bf1CD624eD63e3C8c74Dd66B66e5cb273"
 *               rate:
 *                 type: string
 *                 example: "3.89"
 *               merchantRecognitionId:
 *                 type: string
 *                 example: "merchant123"
 *
 * /whiteLabel/onramp/transaction:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Get transaction details
 *     description: Get details of a specific onramp transaction
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
 * /whiteLabel/onramp/allTransaction:
 *   post:
 *     tags:
 *       - Onramp
 *     summary: Get all transactions
 *     description: Get list of all onramp transactions
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

const createOnrampRouter = (apiKey, secret) => {
    const externalApi = axios.create({
        baseURL: 'https://api-test.onramp.money',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });

    externalApi.interceptors.request.use(authorize(apiKey, secret));

    router.post('/onramp/quote', async (req, res) => {
        try {
            console.log("Request received at /onramp/quote");
            const requestBody = req.body;
            
            console.log('Making request to external API with body:', requestBody);
            
            const response = await externalApi.post('/onramp/api/v2/whiteLabel/onramp/quote', requestBody);
            
            console.log('External API Response:', {
                status: response.status,
                headers: response.headers,
                data: response.data
            });
            
            res.json(response.data);
        } catch (error) {
            console.error('Onramp Quote Error:', {
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

module.exports = createOnrampRouter; 