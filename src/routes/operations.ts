import express, { Router, Request, Response } from "express";
import * as operationsController from "../controllers/operationsController";

const router: Router = express.Router();

router.post("/buyOrder", (req: Request, res: Response) => {
  operationsController.buyOrder(req, res);
});

router.post("/sellOrder", (req: Request, res: Response) => {
  operationsController.sellOrder(req, res);
});

export default router;
