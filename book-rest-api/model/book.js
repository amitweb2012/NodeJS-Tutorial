const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxLength: [100, "Book title can not be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
    maxLength: [100, "Author title can not be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [50, "Price must be atleast 50"],
    max: [1000, "Price must be more 1000"],
  },
  year: {
    type: Number,
    required: [true, "Publication year is required"],
    min: [1000, "Year must be atleast 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);