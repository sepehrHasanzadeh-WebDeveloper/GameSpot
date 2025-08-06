const express = require("express");
const router = express.Router();

const {
  getMessagesBetweenUsers,
  sendMessage,
  markMessageAsRead,
  getAdminMessage,
  replyToMessage,
  GetUserMessageResponse,
} = require("../Controls/messageController");
const authmiddlewares = require("../middlewares/authmiddlewares");

router.post("/", authmiddlewares, sendMessage);

router.get("/Conversetion", getMessagesBetweenUsers);

router.patch("/:id/read", markMessageAsRead);

router.get("/adminMessages", getAdminMessage);

router.post("/admin/reply", replyToMessage);

router.get("/userRes", authmiddlewares, GetUserMessageResponse);

module.exports = router;
