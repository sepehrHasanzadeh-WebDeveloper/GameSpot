const User = require("../Models/Users");

const ShowUserList = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }
    res.status(200).json({ message: "کاربر با موفقیت حذف شد" });
  } catch (err) {
    return next(err);
  }
};

module.exports = { deleteUser, ShowUserList };
