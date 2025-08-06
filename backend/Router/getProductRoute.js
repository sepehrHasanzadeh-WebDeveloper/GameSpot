const express = require("express");
const {
  NewItemData,
  giftCardData,
  getDiskData,
  consolesData,
} = require("../Controls/ProductController");
const router = express.Router();

router.get("/newItem/:id", NewItemData);
router.get("/giftCards/:id", giftCardData);
router.get("/disks/:id", getDiskData);
router.get("/console/:id", consolesData);
module.exports = router;
