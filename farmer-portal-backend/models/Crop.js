const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  cropName: String,
  soilType: String,
  season: String,
  fertilizer: String,
  pestControl: String,
  irrigation: String
});

module.exports = mongoose.model("Crop", cropSchema);
