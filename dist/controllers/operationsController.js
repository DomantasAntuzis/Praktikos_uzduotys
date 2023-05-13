"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellOrder = exports.buyOrder = void 0;
const query = __importStar(require("../models/operations"));
const query2 = __importStar(require("../models/products"));
// import logger from "../config/logger";
function buyOrder(req, res) {
    let { produkto_id, kiekis } = req.body;
    kiekis = parseInt(kiekis, 10);
    query
        .findItem({ id: produkto_id })
        .then((item) => {
        const kaina = item[0][0].pirkimo_suma;
        const suma = kiekis * -kaina;
        const currentLikutis = item[0][0].likutis;
        const likutis = currentLikutis + kiekis;
        const id = Number(produkto_id);
        query2.updateItem({
            id,
            likutis,
        });
        query.createOrder({ produkto_id, kiekis, kaina, suma });
        // logger.info(`Buy order created successfully for item: ${produkto_id}. Amount bought: ${kiekis}, for a total of: ${suma}`);
        res.status(200).json({
            success: true,
            message: "Buy order was successful",
        });
    })
        .catch((error) => {
        // logger.error("Failed to create buy order", error);
        res.status(500).json({
            success: false,
            message: "Failed to make buy order",
            error: error.message,
        });
    });
}
exports.buyOrder = buyOrder;
function sellOrder(req, res) {
    let { produkto_id, kiekis } = req.body;
    kiekis = parseInt(kiekis, 10);
    query
        .findItem({ id: produkto_id })
        .then((item) => {
        const kaina = item[0][0].pirkimo_suma;
        const suma = kiekis * kaina;
        const currentLikutis = item[0][0].likutis;
        const likutis = currentLikutis - kiekis;
        let id = produkto_id;
        query2.updateItem({
            id,
            likutis,
        });
        query.createOrder({ produkto_id, kiekis, kaina, suma });
        // logger.info(`Sell order created successfully for item: ${produkto_id}. Amount sold: ${kiekis} for a total of: ${suma}`);
        res.status(200).json({
            success: true,
            message: "Sell order was successful",
        });
    })
        .catch((error) => {
        // logger.error("Failed to create sell order", error);
        res.status(500).json({
            success: false,
            message: "Failed to make sell order",
            error: error.message,
        });
    });
}
exports.sellOrder = sellOrder;
