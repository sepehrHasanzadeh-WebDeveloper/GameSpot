const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema({
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
  description: {
    title: String,
    content: String,
    title2: String,
    content2: String,
    title3: String,
    content3: String,
    title4: String,
    content4: String,
    imgDesc: String,
  },
});

module.exports = mongoose.model("consoleData", consoleSchema, "consoles");
