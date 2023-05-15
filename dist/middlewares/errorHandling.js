"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = void 0;
const logger_1 = __importDefault(require("../config/logger"));
function errorHandlingMiddleware(err, req, res, next) {
    logger_1.default.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}
exports.errorHandlingMiddleware = errorHandlingMiddleware;
