const express = require("express");
const router = express.Router();
const giftCardModel = require("../Models/GiftCards_Model");
const ConsoleModel = require("../Models/Consoles");
const DiskModel = require("../Models/Disks_Model");
const ConsoleProductModel = require("../Models/console-product");

const getModelBytype = (category) => {
  switch (category) {
    case "giftcard":
      return giftCardModel;
    case "console":
      return ConsoleModel;
    case "game":
      return DiskModel;
    case "consoleProduct":
      return ConsoleProductModel;
    default:
      return null;
  }
};
router.post("/validate", async (req, res) => {
  const cartItems = req.body.items;
  try {
    const failedItems = [];
    for (const item of cartItems) {
      const Model = getModelBytype(item.category);
      if (!Model) {
        failedItems.push({ id: item.id, reason: "نوع محصول ناشناس است" });
        continue;
      }
      const product = await Model.findById(item.id);
      if (!product) {
        failedItems.push({ id: item.id, reason: "محصول یافت نشد" });
      } else if (product.stock < item.quantity) {
        failedItems.push({
          id: item.id,
          name: product.name,
          reason: `موجودی کافی نیست. موجودی فعلی: ${product.stock}`,
        });
      }
    }

    if (failedItems.length > 0) {
      return res.status(400).json({
        message: "برخی محصولات موجودی کافی ندارند",
        failedItems,
      });
    }

    res.json({ message: "سبد خرید تأیید شد و آماده ادامه خرید است" });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور در بررسی سبد خرید" });
  }
});

module.exports = router;
