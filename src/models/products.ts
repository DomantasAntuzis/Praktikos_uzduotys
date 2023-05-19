import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

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

  // Other model configurations (e.g., tableName, timestamps) go here

  // Define associations if needed
}

Produktai.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: 'produktai',
    timestamps: false,
  }
);

export default Produktai;
