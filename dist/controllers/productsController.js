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
exports.updateItem = exports.addItem = void 0;
const query = __importStar(require("../models/products"));
const logger_1 = __importDefault(require("../config/logger"));
const joi_1 = __importDefault(require("joi"));
const addItemSchema = joi_1.default.object({
    pavadinimas: joi_1.default.string().required(),
    aprasymas: joi_1.default.string().required(),
    pirkimo_suma: joi_1.default.number().required(),
    pardavimo_suma: joi_1.default.number().required(),
    likutis: joi_1.default.number().required(),
});
function addItem(req, res) {
    const { error: validationError, value: validData } = addItemSchema.validate(req.body);
    if (validationError) {
        logger_1.default.error("Validation error while adding item", validationError);
        res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: validationError.details.map((detail) => detail.message),
        });
        return;
    }
    console.log(validData);
    query
        .addItem(validData)
        .then((result) => {
        logger_1.default.info(`Added new item: ${validData.pavadinimas}. Updated data: aprasymas: ${validData.aprasymas}, pirkimo_suma: ${validData.pirkimo_suma}, pardavimo suma: ${validData.pardavimo_suma}, likutis: ${validData.likutis}`);
        res.status(200).json({
            success: true,
            message: "Item added successfully",
            data: result,
        });
    })
        .catch((error) => {
        logger_1.default.error("Failed to add item", error);
        res.status(500).json({
            success: false,
            message: "Failed to add item",
            error: error.message,
        });
    });
}
exports.addItem = addItem;
const updateItemSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    pavadinimas: joi_1.default.string(),
    aprasymas: joi_1.default.string(),
    pirkimo_suma: joi_1.default.number(),
    pardavimo_suma: joi_1.default.number(),
    likutis: joi_1.default.number(),
});
function updateItem(req, res) {
    const { error: validationError, value: validData } = updateItemSchema.validate(req.body);
    if (validationError) {
        logger_1.default.error("Validation error while updating item", validationError);
        res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: validationError.details.map((detail) => detail.message),
        });
        return;
    }
    query
        .updateItem(validData)
        .then((updateResult) => {
        if (updateResult[0].affectedRows > 0) {
            logger_1.default.info(`Item with id: ${validData.itemId} was updated successfully.`);
            res.status(200).json({ message: "Item updated successfully" });
        }
        else {
            logger_1.default.info(`Item with id: ${validData.itemId} was not found`);
            res.status(404).json({ error: "Item not found" });
        }
    })
        .catch((error) => {
        logger_1.default.error("Failed to update item", error);
        res.status(500).json({ error: "Internal server error" });
    });
}
exports.updateItem = updateItem;
