const express = require("express");

const authmiddlewares = require("../middlewares/authmiddlewares");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("/panel", authmiddlewares, (req, res) => {
  res
    .status(200)
    .json({ message: "به پنل کاربری خوش امدید ", userId: req.user.id });
});

router.get("/dashboard", authmiddlewares, isAdmin, (req, res) => {
  res.json({ message: "به پنل ادمین خوش امدید " });
});

module.exports = router;
