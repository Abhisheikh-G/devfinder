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

// @route PUT api/posts/like/:id
// @desc Like post by id
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "You already liked this post." });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found." });

    return res.status(500).json({ msg: "Server Error." });
  }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike post by id
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "You cannot unlike a post that hasn't been liked." });
    }
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found." });

    return res.status(500).json({ msg: "Server Error." });
  }
});

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post(
  "/comment/:id",
  [auth, check("text", "Text is required to make a post.").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.status(200).json(post.comments);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error." });
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment by post id and comment id
// @access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment)
      return res
        .status(404)
        .json({ msg: "Sorry, we couldn't find that comment." });

    if (comment.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: "You can only delete your own comments." });

    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.status(200).json({ msg: "Comment removed." });
  } catch (error) {
    console.log(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Comment not found." });

    return res.status(500).json({ msg: "Server Error." });
  }
});
module.exports = router;
