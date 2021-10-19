const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile)
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });

    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
