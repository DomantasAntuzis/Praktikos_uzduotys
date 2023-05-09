const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.post("/addItem", productsController.addItem);

router.put("/updateItem/:id", productsController.updateItem);

router.post("/buyOrder", productsController.buyOrder);

router.post("/sellOrder", productsController.sellOrder);

module.exports = router;
