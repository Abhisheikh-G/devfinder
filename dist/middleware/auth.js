"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
module.exports = function (req, res, next) {
    //Get token
    var token = req.header("x-auth-token");
    if (!token) {
        return res
            .status(401)
            .json({ msg: "Access denied, you must be signed in." });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
    }
    catch (error) {
        if (error.message) {
            console.log(error.message);
        }
        res.status(401).json({ msg: "Invalid token." });
    }
};
