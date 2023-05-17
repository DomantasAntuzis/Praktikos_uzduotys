import express, { Router, Request, Response, NextFunction } from "express";
import * as operationsController from "../controllers/operationsController";

const router: Router = express.Router();

router.post("/buyOrder", operationsController.validateOrderSchema, (req: Request, res: Response, next: NextFunction) => {
  operationsController.buyOrder(req, res, next);
});

router.post("/sellOrder", operationsController.validateOrderSchema, (req: Request, res: Response, next: NextFunction) => {
  operationsController.sellOrder(req, res, next);
});

export default router;
