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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellOrder = exports.buyOrder = void 0;
const query = __importStar(require("../models/operations"));
const query2 = __importStar(require("../models/products"));
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../config/logger"));
const orderSchema = joi_1.default.object({
    produkto_id: joi_1.default.string().required(),
    kiekis: joi_1.default.number().required(),
});
function buyOrder(req, res) {
    const { error: validationError, value: validData } = orderSchema.validate(req.body);
    if (validationError) {
        logger_1.default.error("Validation error while creating buy order", validationError);
        res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: validationError.details.map((detail) => detail.message),
        });
        return;
    }
    let { produkto_id, kiekis } = validData;
    kiekis = parseInt(kiekis, 10);
    query
        .findItem({ id: produkto_id })
        .then((item) => {
        const kaina = parseInt(item[0][0].pirkimo_suma);
        const suma = kiekis * -kaina;
        const currentLikutis = item[0][0].likutis;
        const likutis = currentLikutis + kiekis;
        const id = produkto_id;
        query2
            .updateItem({ id, likutis })
            .then(() => {
            return query.createOrder({ produkto_id: id, kiekis, kaina, suma });
        })
            .then(() => {
            logger_1.default.info(`Buy order created successfully for item: ${produkto_id}. Amount bought: ${kiekis} for a total of: ${suma}`);
            res.status(200).json({
                success: true,
                message: "Buy order was successful",
            });
        })
            .catch((error) => {
            logger_1.default.error("Failed to make buy order", error);
            res.status(500).json({
                success: false,
                message: "Failed to make buy order",
                error: error.message,
            });
        });
    })
        .catch((error) => {
        logger_1.default.error("Failed to find item", error);
        res.status(500).json({
            success: false,
            message: "Failed to find item",
            error: error.message,
        });
    });
}
exports.buyOrder = buyOrder;
function sellOrder(req, res) {
    const { error: validationError, value: validData } = orderSchema.validate(req.body);
    if (validationError) {
        logger_1.default.error("Validation error while creating buy order", validationError);
        res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: validationError.details.map((detail) => detail.message),
        });
        return;
    }
    let { produkto_id, kiekis } = validData;
    kiekis = parseInt(kiekis, 10);
    query
        .findItem({ id: produkto_id })
        .then((item) => {
        const kaina = item[0][0].pirkimo_suma;
        const suma = kiekis * kaina;
        const currentLikutis = item[0][0].likutis;
        const likutis = currentLikutis - kiekis;
        const id = produkto_id;
        query2
            .updateItem({ id, likutis })
            .then(() => {
            return query.createOrder({ produkto_id: id, kiekis, kaina, suma });
        })
            .then(() => {
            logger_1.default.info(`Sell order created successfully for item: ${produkto_id}. Amount sold: ${kiekis} for a total of: ${suma}`);
            res.status(200).json({
                success: true,
                message: "Sell order was successful",
            });
        })
            .catch((error) => {
            logger_1.default.error("Failed to make sell order", error);
            res.status(500).json({
                success: false,
                message: "Failed to make sell order",
                error: error.message,
            });
        });
    })
        .catch((error) => {
        logger_1.default.error("Failed to find item", error);
        res.status(500).json({
            success: false,
            message: "Failed to find item",
            error: error.message,
        });
    });
}
exports.sellOrder = sellOrder;
