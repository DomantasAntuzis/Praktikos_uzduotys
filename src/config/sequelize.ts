import { Sequelize } from "sequelize-typescript";
const sequelize = new Sequelize({
  database: "warehouse",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
});
export default sequelize;
