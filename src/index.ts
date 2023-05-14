import express, { Application, Request, Response } from "express";
import productsRoutes from "./routes/products";
import operationsRoutes from "./routes/operations";
import { errorHandlingMiddleware } from "./middlewares/errorHandling";
import logger from "./config/logger";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlingMiddleware);

app.use("/api", productsRoutes);
app.use("/api", operationsRoutes);

// not implemented routes
app.use((_req: Request, res: Response) => {
  res.status(501).json({ message: "Not Implemented" });
});

app.listen(PORT, () => {
  logger.info(`Server Running here 👉 https://localhost:${PORT}`);
});
