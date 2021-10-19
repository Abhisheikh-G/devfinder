const express = require("express");
const { check, validationResult } = require("express-validator");
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

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (company) profileFields.company = company;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //Build social media object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(profile);
      }

      //Create new profile if one doesn't exist
      profile = new Profile(profileFields);
      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
    res.status(200).json({ msg: "Success" });
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error." });
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found." });
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not found." });
    res.status(500).json({ msg: "Server Error." });
  }
});

// @route DELETE api/profile
// @desc Delete profile, user, and posts
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    //remove users posts

    //remove Profile
    let profile = await Profile.findOneAndRemove({ user: req.user.id });
    //remove User
    let user = await User.findOneAndRemove({ _id: req.user.id });
    if (!profile && !user)
      return res.status(400).json({ msg: "Profile not found." });
    res.status(200).json({ msg: "User deleted." });
  } catch (error) {
    console.log(error.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not found." });
    res.status(500).json({ msg: "Server Error." });
  }
});
module.exports = router;
