"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection = require("mysql2/promise").createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "warehouse",
});
exports.default = connection;
