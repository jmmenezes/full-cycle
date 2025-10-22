import { app } from "./express";
import dotenv from "dotenv";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);