const mongoose = require("mongoose");

const GiftCardsSchema = new mongoose.Schema({
  title: String,
  code: String,
  type: String,
  imgurl: String,
  value: Number,
  price: Number,
  currency: String,
  is_used: Boolean,
  expiry_date: String,
  stock: Number,
  option1: String,
  option2: String,
  option3: String,
  category: String,
});

module.exports = mongoose.model("giftCards", GiftCardsSchema, "giftCards");
