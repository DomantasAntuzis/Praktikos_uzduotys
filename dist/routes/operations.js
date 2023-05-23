import express from "express";
import * as operationsController from "../controllers/operationsController.js";
const router = express.Router();
router.post("/buyOrder", operationsController.validateOrderSchema, (req, res, next) => {
    operationsController.buyOrder(req, res, next);
});
router.post("/sellOrder", operationsController.validateOrderSchema, (req, res, next) => {
    operationsController.sellOrder(req, res, next);
});
export default router;
