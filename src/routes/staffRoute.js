const express = require("express");
const staffController = require("../controller/staffController");

const router = express.Router();

router.post("/register", staffController.registerStaff);

router.post("/login", staffController.loginStaff);
router.post("/logout", staffController.logoutStaff);

module.exports = router;