import express, { Router, Request, Response, NextFunction } from "express";
import * as operationsController from "../controllers/operationsController.js";

const router: Router = express.Router();

router.post("/buyOrder", (req: Request, res: Response, next: NextFunction) => {
  operationsController.buyOrder(req, res, next);
});

router.post("/sellOrder",  (req: Request, res: Response, next: NextFunction) => {
  operationsController.sellOrder(req, res, next);
});

export default router;
