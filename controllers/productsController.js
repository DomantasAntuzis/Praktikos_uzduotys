const query = require("../models/products");

//naujos prekės pridėjimas

exports.addItem = async (req, res) => {
  const { pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis } =
    req.body;

  try {
    const result = await query.addItem([
      pavadinimas,
      aprasymas,
      pirkimo_suma,
      pardavimo_suma,
      likutis,
    ]);

    res.status(200).json({
      success: true,
      message: "Item added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item",
      error: error.message,
    });
  }
};

//redagavimui,
exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { id, ...updatedFields } = req.body;

    const updateResult = await query.updateItem({
      id: itemId,
      ...updatedFields,
    });

    if (updateResult[0].affectedRows > 0) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//pirkimui,
exports.buyOrder = async (req, res) => {
  const { produkto_id, kiekis } = req.body;
  const numberFromKiekis = parseInt(kiekis)
  //perkamas produktas pagal id
  const item = await query.findItem([produkto_id]);

  const kaina = item[0][0].pirkimo_suma;
  const suma = numberFromKiekis * (-kaina);
  // const data = new Date();
  const currentLikutis = item[0][0].likutis;
  const likutis =  currentLikutis + numberFromKiekis;
  try {
    // atnaujinti produkto likutis
    await query.updateItem({
      id: produkto_id,
      likutis: likutis.toString(),
    });

    // sukurti buy order
    await query.createOrder([produkto_id, numberFromKiekis, kaina, suma]);

    res.status(200).json({
      success: true,
      message: "Order was successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to make order",
      error: error.message,
    });
  }
};

//pardavimui
exports.sellOrder = async (req, res) => {
  const { produkto_id, kiekis } = req.body;
  const numberFromKiekis = parseInt(kiekis)
  //perkamas produktas pagal id
  const item = await query.findItem([produkto_id]);
  // console.log("item:", item)

  const kaina = item[0][0].pirkimo_suma;
  const suma = numberFromKiekis * kaina;
  // const data = new Date();
  const currentLikutis = item[0][0].likutis;
  const likutis = currentLikutis - numberFromKiekis;
  try {
    // atnaujinti produkto likutis
    console.log('Updating item:', {id: produkto_id, likutis: likutis});
   await query.updateItem({
      id: produkto_id,
      likutis: likutis.toString(),
    });
    // sukurti buy order
    await query.createOrder([produkto_id, numberFromKiekis, kaina, suma]);

    res.status(200).json({
      success: true,
      message: "Order was successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to make order",
      error: error.message,
    });
  }
};
