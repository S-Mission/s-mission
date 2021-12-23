const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'S-Mission API',
      version: '0.1.0',
      description: 'S-Mission API',
    },
    servers: [
      {
        url: 'http://localhost:7000',
      },
    ],
  },
  apis: ['./routes/api/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
