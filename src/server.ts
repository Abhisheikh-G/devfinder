import express from "express";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";
import usersRoute from "./routes/api/users";
import authRoute from "./routes/api/auth";
import postsRoute from "./routes/api/posts";
import profileRoute from "./routes/api/profile";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();
//Init Middleware
app.use(express.json({}));

//Define routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
