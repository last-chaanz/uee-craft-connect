const express = require("express");
const { createPost, getAllPosts } = require("../controllers/PostController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/posts", AuthMiddleware, getAllPosts);
router.post("/posts", AuthMiddleware, createPost);

module.exports = router;
