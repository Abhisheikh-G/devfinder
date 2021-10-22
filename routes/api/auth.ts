import auth from "../../middleware/auth";
import User from "../../models/User";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import express, { Request, Response } from "express";
const authRouter = express.Router();

// @route GET api/auth
// @desc Test route
// @access Public
authRouter.get("/", auth, async (req: Request, res: Response) => {
  try {
    if (req?.user?.id) {
      const user = await User.findById(req.user.id).select("-password");
      res.status(200).json(user);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error." });
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
authRouter.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "A password is required.").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { email, password } = req.body;
    email = email.toLowerCase();

    try {
      //Check if user does not exist
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }
      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET as Secret,
        { expiresIn: 36000 * 24 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = authRouter;
