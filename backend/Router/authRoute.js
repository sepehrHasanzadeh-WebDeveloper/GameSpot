const express = require("express");
const router = express.Router();
const { register, logout, login } = require("../Controls/authControls");
const authmiddlewares = require("../middlewares/authmiddlewares");
const { updateUserData, updatepass } = require("../Controls/UpdateControllers");

router.post("/userregister", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/updateuserInfo", authmiddlewares, updateUserData);
router.post("/updatepassword", authmiddlewares, updatepass);

module.exports = router;
