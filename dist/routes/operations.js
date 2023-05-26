import express from "express";
import * as operationsController from "../controllers/operationsController.js";
const router = express.Router();
router.post("/buyOrder", (req, res, next) => {
    operationsController.buyOrder(req, res, next);
});
router.post("/sellOrder", (req, res, next) => {
    operationsController.sellOrder(req, res, next);
});
router.get("/allOrders", (req, res, next) => {
    operationsController.showOrders(req, res, next);
});
export default router;
