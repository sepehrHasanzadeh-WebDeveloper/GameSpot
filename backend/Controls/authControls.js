const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterValidator = require("../Validators/Register_Validator");
const loginValidator = require("../Validators/login-Validator");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } =
      req.body;
    const ValidationResult = RegisterValidator(req.body);

    if (ValidationResult !== true) {
      return res.status(422).json(ValidationResult);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "این آدرس ایمیل قبلا استفاده شده است" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      role,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "حساب شما با موفقیت ساخته شد" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validationResult = loginValidator(req.body);
    if (validationResult !== true) {
      return res.status(422).json(validationResult);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "آدرس ایمیل وارد شده وجود ندارد.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "رمز عبور وارد شده نادرست است.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "با موفقیت وارد شدید",
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, naxt) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
  });
  res.json({ message: "با موفقیت خارج شدید" });
};

module.exports = { register, logout, login };
