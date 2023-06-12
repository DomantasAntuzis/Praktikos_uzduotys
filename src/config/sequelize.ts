import { Sequelize } from "sequelize-typescript";
const sequelize = new Sequelize({
  database: "warehouse",
  username: "main",
  password: "",
  host: "34.116.134.185",
  dialect: "mysql",
});
export default sequelize;
