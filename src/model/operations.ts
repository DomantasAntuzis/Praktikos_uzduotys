import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

interface OperacijosAttributes {
  id?: number;
  produkto_id: number;
  kiekis: number;
  kaina: number;
  suma: number;
}

class Operacijos extends Model<OperacijosAttributes> implements OperacijosAttributes {
  public id!: number;
  public produkto_id!: number;
  public kiekis!: number;
  public kaina!: number;
  public suma!: number;
}

Operacijos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    produkto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kiekis: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kaina: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    suma: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "operacijos",
    timestamps: false,
  },
);

export default Operacijos;
