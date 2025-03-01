const express = require("express");
const authHandler = require("../handlers/authHandler");

const router = express.Router();

router.post("/register", authHandler.registerUser);
router.post("/login", authHandler.loginUser);

module.exports = router;
