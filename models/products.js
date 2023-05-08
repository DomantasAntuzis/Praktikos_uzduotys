//naujos prekės pridėjimas
const con = require("../config/database");

exports.addItem = async (params) => {
  let query = await con.query(
    "INSERT INTO produktai (pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis) VALUES (?, ?, ?, ?, ?)",
    params
  );
  return query;
};

//redagavimui,
//pirkimui,
//pardavimui
