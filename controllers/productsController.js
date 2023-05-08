const query = require("../models/products");

//naujos prekės pridėjimas

exports.addItem = async (req, res) => {
 const { pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis } = req.body;

 try {
    const result = await query.addItem([pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis]);

    res.status(200).json({ success: true, message: 'Item added successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add item', error: error.message });
  }
}

