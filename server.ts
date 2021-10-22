import express from "express";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
//Init Middleware
app.use(express.json({}));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
