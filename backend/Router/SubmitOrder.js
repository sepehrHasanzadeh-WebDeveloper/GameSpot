const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const router = express.Router();

router.post("/submit/order", authmiddlewares, async (req, res) => {
  const userId = req.user.id;
  const { item, totalprice } = req.body;
});

module.exports = router;
