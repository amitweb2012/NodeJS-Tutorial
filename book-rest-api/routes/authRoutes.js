const express = require('express');
const {
  userRegister,
  userLogin,
  getRefreshToken,
  userLogout,
} = require("../controllers/authController");

//create express router
const router = express.Router();

//all routes that are related to authentication only
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/refresh", getRefreshToken);
router.get("/logout", userLogout);

module.exports = router;