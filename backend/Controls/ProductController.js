const NewProduct = require("../Models/console-product");
const giftcardModel = require("../Models/GiftCards_Model");
const disksModel = require("../Models/Disks_Model");
const consoleMondel = require("../Models/Consoles");
const NewItemData = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await NewProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "محصول یافت نشد " });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "مشکلی در پیش امده " });
  }
};

const giftCardData = async (req, res) => {
  const { id } = req.params;
  try {
    const giftcard = await giftcardModel.findById(id);
    if (!giftcard) {
      return res.status(404).json({ message: "محصول یافت نشد " });
    }
    res.json(giftcard);
  } catch (err) {
    res.status(500).json({ error: "مشکلی در پیش امده " });
  }
};

const getDiskData = async (req, res) => {
  const { id } = req.params;
  try {
    const disks = await disksModel.findById(id);
    if (!disks) {
      return res.status(404).json({ message: "محصول یافت نشد " });
    }
    res.json(disks);
  } catch (err) {
    res.status(500).json({ error: "مشکلی در پیش امده " });
  }
};

const consolesData = async (req, res) => {
  const { id } = req.params;
  try {
    const console = await consoleMondel.findById(id);
    if (!console) {
      return res.status(404).json({ message: "محصول یافت نشد " });
    }
    res.json(console);
  } catch (err) {
    res.status(500).json({ error: "مشکلی در پیش امده " });
  }
};

module.exports = { NewItemData, giftCardData, getDiskData, consolesData };
