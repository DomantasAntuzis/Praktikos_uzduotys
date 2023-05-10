const query = require("../models/products");
const logger = require("../config/logger");

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

    logger.info(
      `Added new item: ${pavadinimas}. Updated data: aprasymas: ${aprasymas}, pirkimo_suma: ${pirkimo_suma}, pardavimo suma: ${pardavimo_suma}, likutis: ${likutis}`
    );
    res.status(200).json({
      success: true,
      message: "Item added successfully",
      data: result,
    });
  } catch (error) {
    logger.error("Failed to create sell order", error);
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
      logger.info(
        `Item with id: ${itemId} was updated successfuly. Updated columns: ${JSON.stringify(
          updatedFields
        )}`
      );
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      logger.info(`Item with id: ${itemId} was not found`);
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    logger.error("Failed to update item", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//pirkimui,
exports.buyOrder = async (req, res) => {
  const { produkto_id, kiekis } = req.body;
  const numberFromKiekis = parseInt(kiekis);
  //perkamas produktas pagal id
  try {
    const item = await query.findItem([produkto_id]);
    const kaina = item[0][0].pirkimo_suma;
    const suma = numberFromKiekis * -kaina;
    // const data = new Date();
    const currentLikutis = item[0][0].likutis;
    const likutis = currentLikutis + numberFromKiekis;
    // atnaujinti produkto likutis
    await query.updateItem({
      id: produkto_id,
      likutis: likutis.toString(),
    });

    // sukurti buy order
    await query.createOrder([produkto_id, numberFromKiekis, kaina, suma]);

    logger.info(`Buy order created successfuly for item: ${produkto_id}. Amount bought: ${kiekis}, for total of: ${suma}`);
    res.status(200).json({
      success: true,
      message: "Buy order was successfully",
    });
  } catch (error) {
    logger.error("Failed to create buy order", error);
    res.status(500).json({
      success: false,
      message: "Failed to make buy order",
      error: error.message,
    });
  }
};

//pardavimui
exports.sellOrder = async (req, res) => {
  const { produkto_id, kiekis } = req.body;
  const numberFromKiekis = parseInt(kiekis);
  //perkamas produktas pagal id
  try {
    const item = await query.findItem([produkto_id]);
    const kaina = item[0][0].pirkimo_suma;
    const suma = numberFromKiekis * kaina;

    // const data = new Date();
    const currentLikutis = item[0][0].likutis;
    const likutis = currentLikutis - numberFromKiekis;

    // atnaujinti produkto likutis
    await query.updateItem({
      id: produkto_id,
      likutis: likutis.toString(),
    });

    // sukurti buy order
    await query.createOrder([produkto_id, numberFromKiekis, kaina, suma]);

    logger.info(`Sell order created successfuly for item: ${produkto_id}. Amount sold: ${kiekis} for total of: ${suma}`);
    res.status(200).json({
      success: true,
      message: "Sell order was successfully",
    });
  } catch (error) {
    logger.error("Failed to create sell order", error);
    res.status(500).json({
      success: false,
      message: "Failed to make sell order",
      error: error.message,
    });
  }
};
