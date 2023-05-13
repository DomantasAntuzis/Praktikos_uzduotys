"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const operations_1 = __importDefault(require("./routes/operations"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + "/views"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", products_1.default);
app.use("/api", operations_1.default);
// not implemented routes
app.use((_req, res) => {
    res.status(501).json({ message: "Not Implemented" });
});
app.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
