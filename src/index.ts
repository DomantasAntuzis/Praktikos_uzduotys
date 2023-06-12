import express, { Application, Request, Response } from "express";
import productsRoutes from "./routes/products.js";
import operationsRoutes from "./routes/operations.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.js";
import sequelize from "./config/sequelize.js";
import logger from "./config/logger.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json" assert { type: "json" };

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  "/api-docs",
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", productsRoutes);
app.use("/api", operationsRoutes);

app.use(errorHandlingMiddleware);

// not implemented routes
app.use((_req: Request, res: Response) => {
  res.status(501).json({ message: "Not Implemented" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      logger.info(`Server Running here 👉 https://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Unable to connect to the database: ", error);
    console.error("Unable to connect to the database: ", error);
  }
}

startServer();
