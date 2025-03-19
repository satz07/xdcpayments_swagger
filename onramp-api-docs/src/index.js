const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const postmanToOpenApi = require('postman-to-openapi');

const app = express();
const port = 3001;

// Convert Postman collection to OpenAPI
async function generateOpenAPI() {
  try {
    // Path to your Postman collection
    const postmanCollection = path.join(__dirname, '../test.json');
    // Output path for OpenAPI spec
    const outputFile = path.join(__dirname, '../swagger.yml');

    // Convert Postman collection to OpenAPI
    await postmanToOpenApi(postmanCollection, outputFile, {
      defaultTag: 'General',
    });

    // Load the OpenAPI spec
    const swaggerDocument = YAML.load(outputFile);
    return swaggerDocument;
  } catch (err) {
    console.log('Error converting Postman collection:', err);
    throw err;
  }
}

// Set up Swagger UI
app.use('/api-docs', async (req, res, next) => {
  try {
    const swaggerDocument = await generateOpenAPI();
    swaggerUi.setup(swaggerDocument)(req, res, next);
  } catch (err) {
    next(err);
  }
});

app.use('/api-docs', swaggerUi.serve);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`API documentation server running at http://localhost:${port}/api-docs`);
}); 