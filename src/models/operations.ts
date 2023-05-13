import con from "../config/database";
import { QueryOptions } from "mysql2/promise";

interface OrderParams {
  produkto_id: number;
  kiekis: number;
  kaina: number;
  suma: number;
}

export function createOrder(params: OrderParams): Promise<any> {
  const buy: QueryOptions = {
    sql:  "INSERT INTO operacijos (produkto_id, kiekis, kaina, suma) VALUES (?, ?, ?, ?)",
    values: Object.values(params),
  };
  console.log(buy)
  return con.execute(buy);
}

export function findItem(params: { id: number }): Promise<any> {
  const find: QueryOptions = {
    sql: "SELECT * from produktai WHERE id = ?",
    values: [params.id],
  };
  return con.execute(find);
}
