const express = require("express");
const router = express.Router();
const giftcardModel = require("../Models/GiftCards_Model");
const disksModel = require("../Models/Disks_Model");
const ConsoleModel = require("../Models/Consoles");
router.post("/add/product/giftcard", async (req, res, next) => {
  const {
    title,
    code,
    type,
    imgurl,
    value,
    currency,
    expiry_date,
    is_used,
    stock,
    price,
    option1,
    option2,
    option3,
    category,
  } = req.body;

  try {
    const newProduct = new giftcardModel({
      title,
      code,
      type,
      imgurl,
      value,
      currency,
      expiry_date,
      is_used,
      stock,
      price,
      option1,
      option2,
      option3,
      category,
    });

    const savedData = await newProduct.save();
    res.status(201).json({ message: "محصول ذخیره شد", data: savedData });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
});

router.post("/add/product/disks", async (req, res, next) => {
  const {
    name,
    title,
    price,
    imgurl,
    brand,
    stock,
    option1,
    option2,
    option3,
    category,
  } = req.body;

  try {
    const newProduct = new disksModel({
      name,
      title,
      price,
      imgurl,
      brand,
      stock,
      option1,
      option2,
      option3,
      category,
    });

    const savedData = await newProduct.save();
    res.status(201).json({ message: "محصول ذخیره شد", data: savedData });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
});
router.post("/add/product/consoles", async (req, res, next) => {
  const {
    name,
    title,
    price,
    imgurl,
    brand,
    stock,
    option1,
    option2,
    option3,
    category,
  } = req.body;

  try {
    const newProduct = new ConsoleModel({
      name,
      title,
      price,
      imgurl,
      brand,
      stock,
      option1,
      option2,
      option3,
      category,
    });

    const savedData = await newProduct.save();
    res.status(201).json({ message: "محصول ذخیره شد", data: savedData });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور" });
  }
});
module.exports = router;
