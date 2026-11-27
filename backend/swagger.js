
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
        url: "/",
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
  apis: [`${__dirname}/routes/api/*.js`, `${__dirname}/routes/api/*.yaml`],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
