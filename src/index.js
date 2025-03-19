const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const axios = require('axios');
const authorize = require('./auth/authorize');
const kycRoutes = require('./routes/kyc');
const createKycRouter = require('./routes/kyc');
const createOnrampRouter = require('./routes/onramp');
const createOfframpRouter = require('./routes/offramp');

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OnRamp API Documentation',
      version: '1.0.0',
      description: 'API documentation for OnRamp services',
      contact: {
        name: 'API Support',
        url: 'https://onramp.money',
        email: 'support@onramp.money'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Sandbox Environment'
      },
      {
        url: 'https://api.onramp.money',
        description: 'Production Environment'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'apiKey'
        },
        SignatureAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'signature'
        },
        PayloadAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'payload'
        }
      }
    },
    security: [
      {
        ApiKeyAuth: [],
        SignatureAuth: [],
        PayloadAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/swagger/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "OnRamp API Documentation"
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Initialize with your credentials
const apiKey = 'rbihpytthakdqfvggrerilvlblkdmisk';
const secret = 'geeatxyfqgraoiwdvhwpocgajfhlletf';

// Create routers with credentials
const kycRouter = createKycRouter(apiKey, secret);
const onrampRouter = createOnrampRouter(apiKey, secret);
const offrampRouter = createOfframpRouter(apiKey, secret);

// Use the routes
app.use('/', kycRouter);
app.use('/', onrampRouter);
app.use('/', offrampRouter);

app.listen(port, () => {
  console.log(`API documentation server running at http://localhost:${port}/api-docs`);
});