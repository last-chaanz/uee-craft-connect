const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
} = require("../controllers/PostController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/posts", AuthMiddleware, getAllPosts);
router.post("/posts", AuthMiddleware, createPost);
// Delete a Product
router.delete("/posts/:id", AuthMiddleware, deletePost);

module.exports = router;
