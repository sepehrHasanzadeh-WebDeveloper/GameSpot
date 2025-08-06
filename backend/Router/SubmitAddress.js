const express = require("express");
const validateAddress = require("../Validators/Address-Validator");
const authmiddlewares = require("../middlewares/authmiddlewares");
const Users = require("../Models/Users");
const router = express.Router();

router.put("/submitAddress", authmiddlewares, async (req, res) => {
  const userId = req.user.id;
  const { street, city, postalcode, country } = req.body;
  const address = { street, city, postalcode, country };

  const check = validateAddress(address);

  try {
    if (check !== true) {
      return res.status(400).json(check);
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId, 
      { address },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "کاربر پیدا نشد" });
    }
    res.status(200).json({
      message: "آدرس ذخیره شد",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: "خطای سرور در ذخیره آدرس" });
  }
});

module.exports = router;
