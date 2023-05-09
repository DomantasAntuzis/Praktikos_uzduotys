//naujos prekės pridėjimas
const con = require("../config/database");

exports.addItem = async (params) => {
  let insert = await con.query(
    "INSERT INTO produktai (pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis) VALUES (?, ?, ?, ?, ?)",
    params
  );
  return insert;
};

//redagavimui

exports.updateItem = async (params) => {
  let updateQuery = "UPDATE produktai SET";
  let updateValues = [];

  if (params.pavadinimas) {
    updateQuery += " pavadinimas = ?,";
    updateValues.push(params.pavadinimas);
  }

  if (params.aprasymas) {
    updateQuery += " aprasymas = ?,";
    updateValues.push(params.aprasymas);
  }

  if (params.pirkimo_suma) {
    updateQuery += " pirkimo_suma = ?,";
    updateValues.push(params.pirkimo_suma);
  }

  if (params.pardavimo_suma) {
    updateQuery += " pardavimo_suma = ?,";
    updateValues.push(params.pardavimo_suma);
  }

  if (params.likutis) {
    updateQuery += " likutis = ?,";
    updateValues.push(params.likutis);
  }

  updateQuery = updateQuery.slice(0, -1);

  updateQuery += " WHERE id = ?";
  updateValues.push(params.id);

  let update = await con.query(updateQuery, updateValues);
  console.log(update);
  return update;
};

//pirkimui ir pardavimui

exports.createOrder = async (params) => {
  let buy = await con.query(
    "INSERT INTO operacijos (produkto_id, kiekis, kaina, suma) VALUES (?, ?, ?, ?)",
    params
  );
  return buy;
};

//pardavimui


//prekes suradimui
exports.findItem = async (params) => {
  let find = await con.query(
    "SELECT * from produktai WHERE id = ?", 
    params);
  return find;
};
