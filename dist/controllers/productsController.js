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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.addItem = void 0;
const query = __importStar(require("../models/products"));
// import logger from '../config/logger';
function addItem(req, res) {
    const { pavadinimas, aprasymas, pirkimo_suma, pardavimo_suma, likutis } = req.body;
    query.addItem({
        pavadinimas,
        aprasymas,
        pirkimo_suma,
        pardavimo_suma,
        likutis,
    })
        .then((result) => {
        // logger.info(
        //   `Added new item: ${pavadinimas}. Updated data: aprasymas: ${aprasymas}, pirkimo_suma: ${pirkimo_suma}, pardavimo suma: ${pardavimo_suma}, likutis: ${likutis}`
        // );
        res.status(200).json({
            success: true,
            message: "Item added successfully",
            data: result,
        });
    })
        .catch((error) => {
        // logger.error("Failed to create sell order", error);
        res.status(500).json({
            success: false,
            message: "Failed to add item",
            error: error.message,
        });
    });
}
exports.addItem = addItem;
function updateItem(req, res) {
    const itemId = req.params.id;
    const _a = req.body, { id } = _a, updatedFields = __rest(_a, ["id"]);
    query
        .updateItem(Object.assign({ id: itemId }, updatedFields))
        .then((updateResult) => {
        if (updateResult[0].affectedRows > 0) {
            // logger.info(
            //   `Item with id: ${itemId} was updated successfully. Updated columns: ${JSON.stringify(updatedFields)}`
            // );
            res.status(200).json({ message: "Item updated successfully" });
        }
        else {
            // logger.info(`Item with id: ${itemId} was not found`);
            res.status(404).json({ error: "Item not found" });
        }
    })
        .catch((error) => {
        // logger.error("Failed to update item", error);
        res.status(500).json({ error: "Internal server error" });
    });
}
exports.updateItem = updateItem;
