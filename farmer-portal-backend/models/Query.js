const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  question: String,
  response: String,
  status: {
    type: String,
    enum: ["pending", "answered"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Query", querySchema);
