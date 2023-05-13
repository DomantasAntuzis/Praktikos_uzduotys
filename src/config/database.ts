import { Pool } from "mysql2/promise";

const connection: Pool = require("mysql2/promise").createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "warehouse",
});

export default connection;
