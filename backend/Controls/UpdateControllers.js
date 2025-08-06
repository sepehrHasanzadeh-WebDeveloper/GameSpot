const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const updateUserData = async (req, res, next) => {
  const userid = req.user.id;
  const { firstName, lastName, email, phoneNumber } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
      { new: true }
    );

    res.json({
      message: "اطلاعات با موفقیت ویرایش شد",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ویرایش اطلاعات" });
  }
};

const updatepass = async (req, res, next) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "کاربر پیدا نشد" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          message: "رمز عبور باید بیشتر از 8 حروف و حرف بزرگ و عدد باشد",
        });
    }

    const hashnewPass = await bcrypt.hash(newPassword, 10);
    user.password = hashnewPass;

    await user.save();

    res.status(200).json({ message: "رمز عبور با موفقیت تغییر کرد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در تغییر رمز عبور " });
  }
};

module.exports = { updateUserData, updatepass };
