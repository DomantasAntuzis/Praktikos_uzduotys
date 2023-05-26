import express, { Router, Request, Response, NextFunction } from "express";
import * as productsController from "../controllers/productsController.js";

const router: Router = express.Router();

router.post("/addItem", (req: Request, res: Response, next: NextFunction) => {
  productsController.addItem(req, res, next);
});

router.put("/updateItem", (req: Request, res: Response, next: NextFunction) => {
  productsController.updateItem(req, res, next);
});

router.get("/allItems", (req: Request, res: Response, next: NextFunction) => {
  productsController.showItems(req, res, next);
});

export default router;
