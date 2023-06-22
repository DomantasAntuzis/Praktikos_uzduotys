import { Sequelize } from "sequelize-typescript";
const sequelize = new Sequelize({
  database: "warehouse",
  username: "root",
  password: "",
  host: "34.118.3.177",
  dialect: "mysql",
});
export default sequelize;
