const User = require("../../models/User");

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { name, email, password } = req.body;
    try {
      //Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      await user.save();
      //Return jsonwebtoken
      res.send("User registered.");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error.");
    }
    res.send("User route.");
  }
);

module.exports = router;
