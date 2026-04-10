const express = require("express");
const router = express.Router();

const {
  getCropAdvisory,
  getAICropRecommendation
} = require("../controllers/cropController");

// ✅ IMPORTANT
router.get("/", getCropAdvisory);

// ✅ AI route
router.post("/ai", getAICropRecommendation);

module.exports = router;