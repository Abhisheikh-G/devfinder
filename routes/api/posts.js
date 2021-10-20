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

// @route GET api/posts/:id
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) return res.status(404).json({ msg: "Posts not found." });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error." });
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });
    if (!post) return res.status(404).json({ msg: "Post not found." });
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found." });

    return res.status(500).json({ msg: "Server Error." });
  }
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found." });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized." });

    await post.remove();

    res.status(200).json({ msg: "Post removed." });
  } catch (error) {
    console.log(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found." });

    return res.status(500).json({ msg: "Server Error." });
  }
});

module.exports = router;
