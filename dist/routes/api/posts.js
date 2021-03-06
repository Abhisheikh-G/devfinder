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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middleware/auth"));
var express_validator_1 = require("express-validator");
var User_1 = __importDefault(require("../../models/User"));
var Post_1 = __importDefault(require("../../models/Post"));
var postsRouter = express_1.default.Router();
// @route POST api/posts
// @desc Create a post
// @access Private
postsRouter.post("/", [auth_1.default, (0, express_validator_1.check)("text", "Text is required to make a post.").not().isEmpty()], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, user, newPost, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById(req.user.id).select("-password")];
            case 2:
                user = _a.sent();
                newPost = new Post_1.default({
                    text: req.body.text,
                    name: user.name,
                    avatar: user.avatar,
                    user: req.user.id,
                });
                return [4 /*yield*/, newPost.save()];
            case 3:
                _a.sent();
                res.status(200).json(newPost);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route GET api/posts/:id
// @desc Get all posts
// @access Private
postsRouter.get("/", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.find().sort({ date: -1 })];
            case 1:
                posts = _a.sent();
                if (!posts)
                    return [2 /*return*/, res.status(404).json({ msg: "Posts not found." })];
                res.status(200).json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2.message);
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route GET api/posts/:id
// @desc Get post by id
// @access Private
postsRouter.get("/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findById(req.params.id).sort({ date: -1 })];
            case 1:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found." })];
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                if (error_3.kind === "ObjectId")
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found." })];
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
postsRouter.delete("/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found." })];
                if (post.user.toString() !== req.user.id)
                    return [2 /*return*/, res.status(401).json({ msg: "User not authorized." })];
                return [4 /*yield*/, post.remove()];
            case 2:
                _a.sent();
                res.status(200).json({ msg: "Post removed." });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4.message);
                if (error_4.kind === "ObjectId")
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found." })];
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route PUT api/posts/like/:id
// @desc Like post by id
// @access Private
postsRouter.put("/like/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (post.likes.filter(function (like) { return like.user.toString() === req.user.id; })
                    .length > 0) {
                    return [2 /*return*/, res.status(400).json({ msg: "You already liked this post." })];
                }
                post.likes.unshift({ user: req.user.id });
                return [4 /*yield*/, post.save()];
            case 2:
                _a.sent();
                res.status(200).json(post.likes);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5.message);
                if (error_5.kind === "ObjectId")
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found." })];
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route PUT api/posts/unlike/:id
// @desc Unlike post by id
// @access Private
postsRouter.put("/unlike/:id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, removeIndex, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (post.likes.filter(function (like) { return like.user.toString() === req.user.id; })
                    .length === 0) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "You cannot unlike a post that hasn't been liked." })];
                }
                removeIndex = post.likes.map(function (like) {
                    return like.user.toString().indexOf(req.user.id);
                });
                post.likes.splice(removeIndex, 1);
                return [4 /*yield*/, post.save()];
            case 2:
                _a.sent();
                res.status(200).json(post.likes);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log(error_6.message);
                if (error_6.kind === "ObjectId")
                    return [2 /*return*/, res.status(404).json({ msg: "Post not found." })];
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
postsRouter.post("/comment/:id", [auth_1.default, (0, express_validator_1.check)("text", "Text is required to make a post.").not().isEmpty()], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, user, post, newComment, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1.default.findById(req.user.id).select("-password")];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, Post_1.default.findById(req.params.id)];
            case 3:
                post = _a.sent();
                newComment = {
                    text: req.body.text,
                    name: user.name,
                    avatar: user.avatar,
                    user: req.user.id,
                };
                post.comments.unshift(newComment);
                return [4 /*yield*/, post.save()];
            case 4:
                _a.sent();
                res.status(200).json(post.comments);
                return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                console.log(error_7.message);
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 6: return [2 /*return*/];
        }
    });
}); });
// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment by post id and comment id
// @access Private
postsRouter.delete("/comment/:id/:comment_id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, comment, removeIndex, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                comment = post.comments.find(function (comment) { return comment.id === req.params.comment_id; });
                if (!comment)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ msg: "Sorry, we couldn't find that comment." })];
                if (comment.user.toString() !== req.user.id)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ msg: "You can only delete your own comments." })];
                removeIndex = post.comments.map(function (comment) {
                    return comment.user.toString().indexOf(req.user.id);
                });
                post.comments.splice(removeIndex, 1);
                return [4 /*yield*/, post.save()];
            case 2:
                _a.sent();
                res.status(200).json({ msg: "Comment removed." });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.log(error_8.message);
                if (error_8.kind === "ObjectId")
                    return [2 /*return*/, res.status(404).json({ msg: "Comment not found." })];
                return [2 /*return*/, res.status(500).json({ msg: "Server Error." })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = postsRouter;
