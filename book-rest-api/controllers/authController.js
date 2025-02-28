const User = require('../models/userModel'); //importing the user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateAccessRefreshTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1m" });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserRegister = await User.create({ username, email, password: hashedPassword });
    if (newUserRegister) {
      res.status(201).json({
        success: true,
        message: "User Register successfully",
        data: newUserRegister,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.password);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { accessToken, refreshToken } = generateAccessRefreshTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again"
    });
  }
};

const getRefreshToken = async (req, res) => { 
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    if (user.refreshToken !== refreshToken) return res.status(403).json({ message: "Invalid refresh token" });
    const { accessToken, refreshToken: newRefreshToken } = generateAccessRefreshTokens(decoded.userId);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({
      success: true,
      message: "New access token generated",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

const userLogout = async (req, res) => { 
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getRefreshToken,
  userLogout,
};