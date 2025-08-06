const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async function connectDb() {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase is ready and connected");
  } catch (err) {
    console.log(err);
  }
};
