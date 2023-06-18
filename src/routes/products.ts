import express from "express";
import { addProduktai, updateProduktai, getAllProduktai } from "../controllers/productsController.js";
import { checkPermissions } from "../middlewares/permissionHandling.js";
import Permissions from "../permissions.js";

const router = express.Router();

router.post("/addItem", checkPermissions(Permissions.WRITE), addProduktai);
router.put("/updateItem", checkPermissions(Permissions.UPDATE), updateProduktai);
router.get("/allItems", checkPermissions(Permissions.READ), getAllProduktai);

export default router;
