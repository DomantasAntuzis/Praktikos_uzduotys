import express from "express";
import { buyOrder, sellOrder, showOrders } from "../controllers/operationsController.js";
import Permissions from "../permissions.js";
import { checkPermissions } from "../middlewares/permissionHandling.js";

const router = express.Router();

router.post("/buyOrder", checkPermissions(Permissions.WRITE), buyOrder);
router.post("/sellOrder", checkPermissions(Permissions.WRITE), sellOrder);
router.get("/allOrders", checkPermissions(Permissions.READ), showOrders);

export default router;
