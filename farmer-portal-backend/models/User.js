const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  region: String,
  role: {
    type: String,
    enum: ["farmer", "officer"],
    default: "farmer"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
