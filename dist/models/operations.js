"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findItem = exports.createOrder = void 0;
const database_1 = __importDefault(require("../config/database"));
function createOrder(params) {
    const buy = {
        sql: "INSERT INTO operacijos (produkto_id, kiekis, kaina, suma) VALUES (?, ?, ?, ?)",
        values: Object.values(params),
    };
    console.log(buy);
    return database_1.default.execute(buy);
}
exports.createOrder = createOrder;
function findItem(params) {
    const find = {
        sql: "SELECT * from produktai WHERE id = ?",
        values: [params.id],
    };
    return database_1.default.execute(find);
}
exports.findItem = findItem;
