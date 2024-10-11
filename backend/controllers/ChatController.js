const Chat = require("../models/Chat");
const User = require("../models/User");

// Get all chats for a user
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "name email")
      .populate("messages.sender", "name")
      .sort({ lastMessage: -1 });

    if (chats.length > 0) {
      res.json(chats);
    } else {
      res.json({ chats: "not available" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//get chat by ID
// Get all chats for a user
const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "name email")
      .populate("messages.sender", "name");
    if (!chat) return res.status(404).send("Chat not found");

    res.json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// Get all sellers for starting new chat
const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({
      role: "admin",
      _id: { $ne: req.user._id },
    }).select("name email");
    if (sellers.length > 0) {
      res.json(sellers);
    } else {
      res.json({ sellers: "not available" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Start or continue a chat
const chat = async (req, res) => {
  try {
    const { recipientId, message } = req.body;

    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, recipientId] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [req.user._id, recipientId],
        messages: [
          {
            sender: req.user._id,
            content: message,
          },
        ],
      });
    } else {
      chat.messages.push({
        sender: req.user._id,
        content: message,
      });
    }

    chat.lastMessage = Date.now();
    await chat.save();

    await chat.populate("participants", "name email");
    await chat.populate("messages.sender", "name");

    res.json(chat);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Mark messages as read
const markRead = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).send("Chat not found");

    chat.messages.forEach((message) => {
      if (message.sender.toString() !== req.user._id.toString()) {
        message.read = true;
      }
    });

    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllChats, getChat, getAllSellers, chat, markRead };
