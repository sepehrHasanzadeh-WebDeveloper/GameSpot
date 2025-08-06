const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  brand: String,
  imgurl: String,
  stock: Number,
});

module.exports = mongoose.model(
  "consoleProduct",
  ProductSchema,
  "console-product"
);
