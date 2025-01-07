const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({
path: "./.env",
});
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

module.exports = connectDB;