const express = require("express");
const router = express.Router();
const orderModel = require("../Models/Oreder");
const giftCardModel = require("../Models/GiftCards_Model");
const ConsoleModel = require("../Models/Consoles");
const DiskModel = require("../Models/Disks_Model");
const ConsoleProductModel = require("../Models/console-product");
const authmiddlewares = require("../middlewares/authmiddlewares");

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

router.post("/", async (req, res) => {
  const { items, totalPrice, userInfo } = req.body;

  try {
    for (const item of items) {
      const Model = getModelBytype(item.category);
      if (!Model) {
        return res
          .status(400)
          .json({ message: `نوع دسته‌بندی "${item.category}" ناشناخته است.` });
      }

      const product = await Model.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `موجودی محصول "${product?.name || "نامشخص"}" کافی نیست.`,
        });
      }
    }

    for (const item of items) {
      const Model = getModelBytype(item.category);
      await Model.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    const newOrder = new orderModel({
      user: userInfo,
      items,
      totalPrice,
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json({
      message: "سفارش با موفقیت ثبت شد",
      orderId: newOrder._id,
    });
  } catch (err) {
    res.status(500).json({ message: "خطا در سرور هنگام ثبت سفارش" });
  }
});

router.get("/orderlist", async (req, res) => {
  try {
    const OrderData = await orderModel.find().sort({ createdAt: -1 });
    res.status(200).json(OrderData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "مشکلی از سمت سرور در دریافت اطلاعات رخ داد" });
  }
});

router.get("/my/order", authmiddlewares, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ "user._id": userId })
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "مشکلی در دریافت سفارشات پیش آمد" });
  }
});

router.patch("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "سفارش پیدا نشد" });

    order.status = status;
    await order.save();

    res.json({ message: "وضعیت سفارش با موفقیت بروزرسانی شد", order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
