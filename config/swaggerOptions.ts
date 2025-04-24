import swaggerJsDoc from "swagger-jsdoc";

const serverUrl =
  process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Class/Course Organizer API Documentation",
      version: "1.0.0",
      description:
        "Documention for class and course organizer app. Perform CRUD operations on classes, courses, and students",
    },
    server: [
      {
        url: serverUrl,
        description: "Local Server",
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/api/v1/routes/*.ts",
    "./src/api/v1/models/*.ts",
    "./src/app.ts",
  ], // Path to the API docs when routes are in separate files
};

// Initialize Swagger JSDoc object
export const generateSwaggerDocs = (): object => {
  return swaggerJsDoc(swaggerOptions);
};
