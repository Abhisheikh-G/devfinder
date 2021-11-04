"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./utils/db");
var dotenv_1 = __importDefault(require("dotenv"));
var users_1 = __importDefault(require("./routes/api/users"));
var auth_1 = __importDefault(require("./routes/api/auth"));
var posts_1 = __importDefault(require("./routes/api/posts"));
var profile_1 = __importDefault(require("./routes/api/profile"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var PORT = 5000;
var app = (0, express_1.default)();
(0, db_1.connectDB)();
//Init Middleware
app.use(express_1.default.json({}));
app.use((0, cors_1.default)());
//Define routes
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/profile", profile_1.default);
app.use("/api/posts", posts_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.listen(PORT, function () { return console.log("Server started on port " + PORT); });
