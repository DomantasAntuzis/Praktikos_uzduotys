const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController");

router.post('/addItem', productsController.addItem);

module.exports = router;


