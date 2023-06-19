import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

interface UserAttributes {
  id?: number;
  vartotojo_vardas: string;
  slaptazodis: string;
  leidimai?: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public vartotojo_vardas!: string;
  public slaptazodis!: string;
  public leidimai!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    vartotojo_vardas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slaptazodis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leidimai: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
    },
  },
  {
    sequelize,
    tableName: "vartotojai",
    timestamps: false,
  },
);

export default User;
