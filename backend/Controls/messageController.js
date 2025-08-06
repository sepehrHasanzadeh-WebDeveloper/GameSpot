const mongoose = require("mongoose");
const messgaeM = require("../Models/MessagesModel");

const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    const newMessage = await messgaeM.create({
      senderId,
      receiverId: process.env.ADMIN_ID,
      message,
    });
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "خطا در ارسال پیام " });
  }
};

const GetUserMessageResponse = async (req, res) => {
  const userId = req.user.id;
  const adminId = process.env.ADMIN_ID;

  try {
    const messages = await messgaeM
      .find({
        $or: [
          { senderId: userId, receiverId: adminId },
          { senderId: adminId, receiverId: userId },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت گفتگو با ادمین" });
  }
};

const getMessagesBetweenUsers = async (req, res) => {
  try {
    const adminId = new mongoose.Types.ObjectId(process.env.ADMIN_ID);
    const userId = new mongoose.Types.ObjectId(req.query.userId);

    const messages = await messgaeM
      .find({
        $or: [
          { senderId: adminId, receiverId: userId },
          { senderId: userId, receiverId: adminId },
        ],
      })
      .sort({ createdAt: 1 })
      .populate("senderId", "firstName lastName email");

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطا در دریافت گفتگو" });
  }
};

const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await messgaeM.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: "خطا در به‌روزرسانی پیام" });
  }
};

const getAdminMessage = async (req, res, next) => {
  try {
    const adminId = new mongoose.Types.ObjectId(process.env.ADMIN_ID);

    const messages = await messgaeM
      .find({ receiverId: adminId })
      .sort({ createdAt: -1 })
      .populate("senderId", "firstName lastName email");

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطا در دریافت پیام‌ها" });
  }
};

const replyToMessage = async (req, res, next) => {
  try {
    const senderId = process.env.ADMIN_ID;
    const { receiverId, message } = req.body;
    if (!receiverId || !message) {
      return res.status(400).json({ error: "خطا در ارسال پیام" });
    }
    const newMessage = await messgaeM.create({
      senderId,
      receiverId,
      message,
    });
    res.status(201).json({ message: "پاسخ با موفقیت ارسال شد" });
  } catch (err) {
    res.status(500).json({ error: "خطا در ارسال پاسخ" });
  }
};
module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  markMessageAsRead,
  getAdminMessage,
  replyToMessage,
  GetUserMessageResponse,
};
