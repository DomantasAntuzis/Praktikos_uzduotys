import express from "express";
import { buyOrder, sellOrder, showOrders } from "../controllers/operationsController.js";

const router = express.Router();

router.post("/buyOrder", buyOrder);
router.post("/sellOrder", sellOrder);
router.get("/allOrders", showOrders);

export default router;
