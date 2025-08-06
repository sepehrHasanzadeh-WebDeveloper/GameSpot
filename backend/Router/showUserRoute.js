const express = require("express");
const router = express.Router();
const User = require("../Models/Users");
const { deleteUser, ShowUserList } = require("../Controls/AdminControllers");
router.get("/userListShow", ShowUserList);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
