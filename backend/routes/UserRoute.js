const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// user register
router.post("/register", UserController.registerUser);

// user login
router.post("/login", UserController.loginUser);

module.exports = router;
