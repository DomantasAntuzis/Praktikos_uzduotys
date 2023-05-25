import express, { Application, Request, Response } from "express";
import productsRoutes from "./routes/products.js";
import operationsRoutes from "./routes/operations.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.js";
import sequelize from "./config/sequelize.js";
import logger from "./config/logger.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlingMiddleware);

app.use("/api", productsRoutes);
app.use("/api", operationsRoutes);

// Route interface
interface Route {
  method: string;
  path: string;
}

// Retrieve routes
const routes: Route[] = [];

app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    const { path, stack } = middleware.route;
    stack.forEach((route: any) => {
      const { method } = route;
      routes.push({
        method: method.toUpperCase(),
        path: "/api" + path,
      });
    });
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((layer: any) => {
      const baseRoute = layer.route.path;
      layer.route && layer.route.stack.forEach((route: any) => {
        const { method } = route;
        routes.push({
          method: method.toUpperCase(),
          path: "/api" + baseRoute,
        });
      });
    });
  }
});

// all routes
app.get("/api/routes", (_req: Request, res: Response) => {
  res.json(routes);
});

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
