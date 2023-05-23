import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
class Operacijos extends Model {
    id;
    produkto_id;
    kiekis;
    kaina;
    suma;
}
Operacijos.init({
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
}, {
    sequelize,
    tableName: 'operacijos',
    timestamps: false,
});
export default Operacijos;
