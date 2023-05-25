import express from "express";
import * as operationsController from "../controllers/operationsController.js";
const router = express.Router();
router.post("/buyOrder", (req, res, next) => {
    operationsController.buyOrder(req, res, next);
});
router.post("/sellOrder", (req, res, next) => {
    operationsController.sellOrder(req, res, next);
});
export default router;
