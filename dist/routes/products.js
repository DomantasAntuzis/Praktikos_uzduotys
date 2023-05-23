import express from "express";
import * as productsController from "../controllers/productsController.js";
const router = express.Router();
router.post("/addItem", (req, res, next) => {
    productsController.addItem(req, res, next);
});
router.put("/updateItem", (req, res, next) => {
    productsController.updateItem(req, res, next);
});
export default router;
