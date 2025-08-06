const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  path: String,
  ip: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Visit", visitSchema, "visitData");
