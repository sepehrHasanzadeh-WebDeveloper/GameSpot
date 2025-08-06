const express = require("express");
const router = express.Router();
const GiftCardSchema = require("../Models/GiftCards_Model");
const NewProduct = require("../Models/console-product");
const diskSchema = require("../Models/Disks_Model");
const consoleSchema = require("../Models/Consoles");
router.get("/consoleProduct", async (req, res, next) => {
  try {
    const products = await NewProduct.find().limit(4);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/consoleProductS", async (req, res, next) => {
  try {
    const productxx = await NewProduct.find()

      .skip(4)
      .limit(5);
    res.json(productxx);
  } catch (err) {
    next(err);
  }
});
router.get("/newController", async (req, res, next) => {
  try {
    const controller = await NewProduct.find().skip(9);
    res.json(controller);
  } catch (err) {
    next(err);
  }
});

router.get("/GiftCardsProduct", async (req, res, next) => {
  try {
    const giftCards = await GiftCardSchema.find().limit(10);
    res.status(200).json(giftCards);
  } catch (err) {
    next(err);
  }
});

router.get("/GiftCardsProduct2", async (req, res, next) => {
  try {
    const giftCards = await GiftCardSchema.find().skip(10);
    res.status(200).json(giftCards);
  } catch (err) {
    next(err);
  }
});
router.get("/disksDataProduct", async (req, res, next) => {
  try {
    const Disks = await diskSchema.find().limit(11);
    res.status(200).json(Disks);
  } catch (err) {
    next(err);
  }
});
router.get("/xboxdiskDataProduct", async (req, res, next) => {
  try {
    const Disks = await diskSchema.find().skip(11);
    res.status(200).json(Disks);
  } catch (err) {
    next(err);
  }
});
router.get("/AllConsoles", async (req, res, next) => {
  try {
    const console = await consoleSchema.find();
    res.status(200).json(console);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
