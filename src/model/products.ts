import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

interface ProduktaiAttributes {
  id?: number;
  pavadinimas: string;
  aprasymas: string;
  pirkimo_suma: number;
  pardavimo_suma: number;
  likutis: number;
}

class Produktai extends Model<ProduktaiAttributes> implements ProduktaiAttributes {
  public id!: number;
  public pavadinimas!: string;
  public aprasymas!: string;
  public pirkimo_suma!: number;
  public pardavimo_suma!: number;
  public likutis!: number;
}

Produktai.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pavadinimas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aprasymas: {
      type: DataTypes.STRING,
    },
    pirkimo_suma: {
      type: DataTypes.DECIMAL(10, 2),
    },
    pardavimo_suma: {
      type: DataTypes.DECIMAL(10, 2),
    },
    likutis: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "produktai",
    timestamps: false,
  },
);

export default Produktai;
