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
    min: [1, "Price must be atleast 1"],
    max: [1000, "Price must be more 1000"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
    trim: true,
    maxLength: [100, "Genre title can not be more than 100 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);