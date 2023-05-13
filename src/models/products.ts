import con from "../config/database";
import { QueryOptions } from "mysql2";

interface ItemParams {
  pavadinimas: string;
  aprasymas: string;
  pirkimo_suma: number;
  pardavimo_suma: number;
  likutis: number;
  id?: number;
}

export function addItem(params: ItemParams): Promise<any> {
  const insert: QueryOptions = {
    sql: "INSERT INTO produktai (pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis) VALUES (?, ?, ?, ?, ?)",
    values: Object.values(params),
  };
  return con.execute(insert);
}

interface UpdateItemParams {
  pavadinimas?: string;
  aprasymas?: string;
  pirkimo_suma?: number;
  pardavimo_suma?: number;
  likutis?: number;
  id: number;
}

export function updateItem(params: UpdateItemParams): Promise<any> {
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

  if (typeof params.likutis !== "undefined" && params.likutis !== null) {
    updateQuery += " likutis = ?,";
    updateValues.push(params.likutis);
  }

  updateQuery = updateQuery.slice(0, -1);

  updateQuery += " WHERE id = ?";
  updateValues.push(params.id);

  const update: QueryOptions = {
    sql: updateQuery,
    values: updateValues,
  };
  console.log(update);
  return con.execute(update);
}
