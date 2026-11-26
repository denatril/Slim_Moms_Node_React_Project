
import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Slim Moms API",
      version: "1.0.0",
      description: "API documentation for the Slim Moms application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`${__dirname}/routes/api/*.js`],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
