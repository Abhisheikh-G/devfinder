import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import auth from "../../middleware/auth";
import User from "../../models/User";
import Profile from "../../models/Profile";
import request from "request";
const profileRouter = express.Router();

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
profileRouter.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user!.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile)
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });

    res.status(200).json(profile);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error." });
  }
});

interface Profile {
  user: string;
  company: string;
  website: string;
  location: string;
  bio: string;
  status: string;
  githubusername: string;
  skills: string;
  social?: {
    youtube: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}
// @route POST api/profile
// @desc Create or update user profile
// @access Private
profileRouter.post(
  "/",
  [
    auth,
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
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
    const profileFields: Profile = {
      user: "",
      company: "",
      website: "",
      location: "",
      bio: "",
      status: "",
      githubusername: "",
      skills: "",
    };
    profileFields.user = req.user!.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (company) profileFields.company = company;
    if (skills) {
      profileFields.skills = skills
        .split(",")
        .map((skill: string) => skill.trim());
    }
    //Build social media object
    profileFields.social = {
      youtube: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    };
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user!.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user!.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(profile);
      }

      //Create new profile if one doesn't exist
      profile = new Profile(profileFields);
      await profile.save();
      return res.status(200).json(profile);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
    res.status(200).json({ msg: "Success" });
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public
profileRouter.get("/", async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).json(profiles);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error." });
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
profileRouter.get("/user/:user_id", async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found." });
    res.status(200).json(profile);
  } catch (error: any) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not found." });
    res.status(500).json({ msg: "Server Error." });
  }
});

// @route DELETE api/profile
// @desc Delete profile, user, and posts
// @access Private
profileRouter.delete("/", auth, async (req: Request, res: Response) => {
  try {
    //remove users posts

    //remove Profile
    let profile = await Profile.findOneAndRemove({ user: req.user!.id });
    //remove User
    let user = await User.findOneAndRemove({ _id: req.user!.id });
    if (!profile && !user)
      return res.status(400).json({ msg: "Profile not found." });
    res.status(200).json({ msg: "User deleted." });
  } catch (error: any) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not found." });
    res.status(500).json({ msg: "Server Error." });
  }
});

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
profileRouter.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user!.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      res.status(200).json(profile);
    } catch (error: any) {
      console.log(error.message);
      if (error.kind === "ObjectId")
        return res.status(400).json({ msg: "Profile not found." });
      res.status(500).json({ msg: "Server Error." });
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience by id
// @access Private
profileRouter.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user!.id });
    const removeIndex = profile.experience
      .map((item: { id: string }) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.status(200).json(profile);
  } catch (error: any) {
    console.log(error.message);
  }
});

// @route PUT api/profile/education
// @desc Add profile education
// @access Private
profileRouter.put(
  "/education",
  [
    auth,
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user!.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.status(200).json(profile);
    } catch (error: any) {
      console.log(error.message);
      if (error.kind === "ObjectId")
        return res.status(400).json({ msg: "Profile not found." });
      res.status(500).json({ msg: "Server Error." });
    }
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc Delete profile education by id
// @access Private
profileRouter.delete(
  "/education/:edu_id",
  auth,
  async (req: Request, res: Response) => {
    try {
      const profile = await Profile.findOne({ user: req.user!.id });
      const removeIndex = profile.education
        .map((item: { id: string }) => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();
      res.status(200).json(profile);
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// @route DELETE api/profile/github/:username
// @desc Get user repos from Github
// @access Public
profileRouter.get("/github/:username", async (req: Request, res: Response) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT}&client_secret=${process.env.GITHUB_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found." });
      }
      res.status(200).json(JSON.parse(body));
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error." });
  }
});

export default profileRouter;
