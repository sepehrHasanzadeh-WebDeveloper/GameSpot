const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "دسترسی غیرمجاز - فقط مدیر مجاز است" });
  }
};

module.exports = isAdmin;
