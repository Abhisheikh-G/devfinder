"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require("express");
var _a = require("express-validator"), check = _a.check, validationResult = _a.validationResult;
var router = express.Router();
var auth = require("../../middleware/auth");
var User = require("../../models/User");
var Profile = require("../../models/Profile");
var request = require("request");
// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"])];
            case 1:
                profile = _a.sent();
                if (!profile)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "There is no profile for this user." })];
                res.status(200).json(profile);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1.message);
                res.status(500).json({ msg: "Server error." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post("/", [
    auth,
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills is required").not().isEmpty(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin, profileFields, profile, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, company = _a.company, website = _a.website, location = _a.location, bio = _a.bio, status = _a.status, githubusername = _a.githubusername, skills = _a.skills, youtube = _a.youtube, facebook = _a.facebook, twitter = _a.twitter, instagram = _a.instagram, linkedin = _a.linkedin;
                profileFields = {};
                profileFields.user = req.user.id;
                if (company)
                    profileFields.company = company;
                if (website)
                    profileFields.website = website;
                if (location)
                    profileFields.location = location;
                if (githubusername)
                    profileFields.githubusername = githubusername;
                if (bio)
                    profileFields.bio = bio;
                if (status)
                    profileFields.status = status;
                if (company)
                    profileFields.company = company;
                if (skills) {
                    profileFields.skills = skills.split(",").map(function (skill) { return skill.trim(); });
                }
                //Build social media object
                profileFields.social = {};
                if (youtube)
                    profileFields.social.youtube = youtube;
                if (facebook)
                    profileFields.social.facebook = facebook;
                if (instagram)
                    profileFields.social.instagram = instagram;
                if (twitter)
                    profileFields.social.twitter = twitter;
                if (linkedin)
                    profileFields.social.linkedin = linkedin;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Profile.findOne({ user: req.user.id })];
            case 2:
                profile = _b.sent();
                if (!profile) return [3 /*break*/, 4];
                return [4 /*yield*/, Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })];
            case 3:
                profile = _b.sent();
                return [2 /*return*/, res.status(200).json(profile)];
            case 4:
                //Create new profile if one doesn't exist
                profile = new Profile(profileFields);
                return [4 /*yield*/, profile.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).json(profile)];
            case 6:
                error_2 = _b.sent();
                console.log(error_2.message);
                res.status(500).send("Server Error");
                return [3 /*break*/, 7];
            case 7:
                res.status(200).json({ msg: "Success" });
                return [2 /*return*/];
        }
    });
}); });
// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profiles, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Profile.find().populate("user", ["name", "avatar"])];
            case 1:
                profiles = _a.sent();
                res.status(200).json(profiles);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                res.status(500).json({ msg: "Server Error." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get("/user/:user_id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Profile.findOne({
                        user: req.params.user_id,
                    }).populate("user", ["name", "avatar"])];
            case 1:
                profile = _a.sent();
                if (!profile)
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found." })];
                res.status(200).json(profile);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4.message);
                if (err.kind === "ObjectId")
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found." })];
                res.status(500).json({ msg: "Server Error." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route DELETE api/profile
// @desc Delete profile, user, and posts
// @access Private
router.delete("/", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Profile.findOneAndRemove({ user: req.user.id })];
            case 1:
                profile = _a.sent();
                return [4 /*yield*/, User.findOneAndRemove({ _id: req.user.id })];
            case 2:
                user = _a.sent();
                if (!profile && !user)
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found." })];
                res.status(200).json({ msg: "User deleted." });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5.message);
                if (err.kind === "ObjectId")
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found." })];
                res.status(500).json({ msg: "Server Error." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
router.put("/experience", [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, title, company, location, from, to, current, description, newExperience, profile, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, title = _a.title, company = _a.company, location = _a.location, from = _a.from, to = _a.to, current = _a.current, description = _a.description;
                newExperience = {
                    title: title,
                    company: company,
                    location: location,
                    from: from,
                    to: to,
                    current: current,
                    description: description,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Profile.findOne({ user: req.user.id })];
            case 2:
                profile = _b.sent();
                profile.experience.unshift(newExperience);
                return [4 /*yield*/, profile.save()];
            case 3:
                _b.sent();
                res.status(200).json(profile);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                console.log(error_6.message);
                if (err.kind === "ObjectId")
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found." })];
                res.status(500).json({ msg: "Server Error." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience by id
// @access Private
router.delete("/experience/:exp_id", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, removeIndex, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Profile.findOne({ user: req.user.id })];
            case 1:
                profile = _a.sent();
                removeIndex = profile.experience
                    .map(function (item) { return item.id; })
                    .indexOf(req.params.exp_id);
                profile.experience.splice(removeIndex, 1);
                return [4 /*yield*/, profile.save()];
            case 2:
                _a.sent();
                res.status(200).json(profile);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.log(error_7.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route PUT api/profile/education
// @desc Add profile education
// @access Private
router.put("/education", [
    auth,
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, school, degree, fieldofstudy, from, to, current, description, newEducation, profile, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, school = _a.school, degree = _a.degree, fieldofstudy = _a.fieldofstudy, from = _a.from, to = _a.to, current = _a.current, description = _a.description;
                newEducation = {
                    school: school,
                    degree: degree,
                    fieldofstudy: fieldofstudy,
                    from: from,
                    to: to,
                    current: current,
                    description: description,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Profile.findOne({ user: req.user.id })];
            case 2:
                profile = _b.sent();
                profile.education.unshift(newEducation);
                return [4 /*yield*/, profile.save()];
            case 3:
                _b.sent();
                res.status(200).json(profile);
                return [3 /*break*/, 5];
            case 4:
                error_8 = _b.sent();
                console.log(error_8.message);
                if (err.kind === "ObjectId")
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found." })];
                res.status(500).json({ msg: "Server Error." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route DELETE api/profile/education/:edu_id
// @desc Delete profile education by id
// @access Private
router.delete("/education/:edu_id", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, removeIndex, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Profile.findOne({ user: req.user.id })];
            case 1:
                profile = _a.sent();
                removeIndex = profile.education
                    .map(function (item) { return item.id; })
                    .indexOf(req.params.edu_id);
                profile.education.splice(removeIndex, 1);
                return [4 /*yield*/, profile.save()];
            case 2:
                _a.sent();
                res.status(200).json(profile);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.log(error_9.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route DELETE api/profile/github/:username
// @desc Get user repos from Github
// @access Public
router.get("/github/:username", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        try {
            options = {
                uri: "https://api.github.com/users/" + req.params.username + "/repos?per_page=5&sort=created:asc&client_id=" + process.env.GITHUB_CLIENT + "&client_secret=" + process.env.GITHUB_SECRET,
                method: "GET",
                headers: { "user-agent": "node.js" },
            };
            request(options, function (error, response, body) {
                if (error)
                    console.log(error);
                if (response.statusCode !== 200) {
                    return res.status(404).json({ msg: "No Github profile found." });
                }
                res.status(200).json(JSON.parse(body));
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Server Error." });
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
