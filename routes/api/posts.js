const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  [auth, check("text", "Text is required to make a post.").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error." });
    }
  }
);

module.exports = router;
