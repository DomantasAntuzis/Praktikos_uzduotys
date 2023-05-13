import express, { Router, Request, Response } from "express";
import * as productsController from "../controllers/productsController";

const router: Router = express.Router();

router.post("/addItem", (req: Request, res: Response) => {
  productsController.addItem(req, res);
});

router.put("/updateItem/:id", (req: Request, res: Response) => {
  productsController.updateItem(req, res);
});

export default router;
