"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findItem = exports.createOrder = void 0;
const database_1 = __importDefault(require("../config/database"));
function createOrder(params) {
    const buy = {
        sql: "INSERT INTO produktai (pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis) VALUES (?, ?, ?, ?, ?)",
        values: Object.values(params),
    };
    return database_1.default.execute(buy);
}
exports.createOrder = createOrder;
function findItem(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const find = yield database_1.default.query("SELECT * from produktai WHERE id = ?", params.id);
        return find;
    });
}
exports.findItem = findItem;
