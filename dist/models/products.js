"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.addItem = void 0;
const database_1 = __importDefault(require("../config/database"));
function addItem(params) {
    const insert = {
        sql: "INSERT INTO produktai (pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis) VALUES (?, ?, ?, ?, ?)",
        values: Object.values(params),
    };
    return database_1.default.execute(insert);
}
exports.addItem = addItem;
function updateItem(params) {
    let updateQuery = "UPDATE produktai SET";
    let updateValues = [];
    if (params.pavadinimas) {
        updateQuery += " pavadinimas = ?,";
        updateValues.push(params.pavadinimas);
    }
    if (params.aprasymas) {
        updateQuery += " aprasymas = ?,";
        updateValues.push(params.aprasymas);
    }
    if (params.pirkimo_suma) {
        updateQuery += " pirkimo_suma = ?,";
        updateValues.push(params.pirkimo_suma);
    }
    if (params.pardavimo_suma) {
        updateQuery += " pardavimo_suma = ?,";
        updateValues.push(params.pardavimo_suma);
    }
    if (typeof params.likutis !== "undefined" && params.likutis !== null) {
        updateQuery += " likutis = ?,";
        updateValues.push(params.likutis);
    }
    updateQuery = updateQuery.slice(0, -1);
    updateQuery += " WHERE id = ?";
    updateValues.push(params.id);
    const update = {
        sql: updateQuery,
        values: updateValues,
    };
    console.log(update);
    return database_1.default.execute(update);
}
exports.updateItem = updateItem;
