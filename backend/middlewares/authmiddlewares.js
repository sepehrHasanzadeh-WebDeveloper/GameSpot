const jwt = require("jsonwebtoken");

const authmiddlewares = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "وارد حساب کاربری نشده‌اید" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (err) {
    return res.status(401).json({ message: "توکن معتبر نیست" });
  }
};

module.exports = authmiddlewares;
