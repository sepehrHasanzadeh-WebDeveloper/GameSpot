const mongoose = require("mongoose");

const diskSchema = new mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  imgurl: String,
  brand: String,
  option1: String,
  option2: String,
  option3: String,
  category: String,
  stock: Number,
});

module.exports = mongoose.model("disksData", diskSchema, "disks");
