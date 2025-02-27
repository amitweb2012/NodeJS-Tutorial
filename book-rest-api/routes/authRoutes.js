const express = require('express');
const {
  userRegister,
  userLogin,
  getRefreshToken,
} = require("../controllers/authController");

//create express router
const router = express.Router();

//all routes that are related to authentication only
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/refresh", getRefreshToken);

module.exports = router;