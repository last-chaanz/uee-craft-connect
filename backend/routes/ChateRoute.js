const express = require("express");
const {
  getAllChats,
  getChat,
  getAllSellers,
  chat,
  markRead,
} = require("../controllers/ChatController");

const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/chats", AuthMiddleware, getAllChats);
router.get("/chats/:chatId", AuthMiddleware, getChat);
router.get("/sellers", AuthMiddleware, getAllSellers);
router.post("/chat", AuthMiddleware, chat);
router.put("/chats/:chatId/read", AuthMiddleware, markRead);

module.exports = router;
