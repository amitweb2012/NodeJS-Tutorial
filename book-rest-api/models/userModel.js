const e = require("express");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username title is required"],
    trim: true,
    unique: true,
    maxLength: [100, "Username can not be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    maxLength: [100, "Email can not be more than 100 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  refreshToken:
  {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);