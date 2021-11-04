import express from "express";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";
import usersRoute from "./routes/api/users";
import authRoute from "./routes/api/auth";
import postsRoute from "./routes/api/posts";
import profileRoute from "./routes/api/profile";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = 5000;
const app = express();

connectDB();
//Init Middleware
app.use(express.json({}));
app.use(cors());

//Define routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
