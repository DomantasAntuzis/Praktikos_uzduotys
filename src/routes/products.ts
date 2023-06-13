import express from "express";
import { addProduktai, updateProduktai, getAllProduktai } from "../controllers/productsController.js";

const router = express.Router();

router.post("/addItem", addProduktai);
router.put("/updateItem", updateProduktai);
router.get("/allItems", getAllProduktai);

export default router;
