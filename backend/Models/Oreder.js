const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    address: {
      street: String,
      city: String,
      postalcode: String,
      country: String,
    },
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
      category: String,
      image: String,
    },
  ],
  totalPrice: Number,
  status: {
    type: String,
    enum: ["در حال پردازش", "تحویل داده شده", "لغو شده"],
    default: "در حال پردازش",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema, "orders");
