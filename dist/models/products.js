import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
class Produktai extends Model {
    id;
    pavadinimas;
    aprasymas;
    pirkimo_suma;
    pardavimo_suma;
    likutis;
}
Produktai.init({
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
}, {
    sequelize,
    tableName: 'produktai',
    timestamps: false,
});
export default Produktai;
