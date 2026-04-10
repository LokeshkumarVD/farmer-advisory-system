const express = require("express");
const router = express.Router();

const {
  getWeatherByDistrict,
  getForecastByDistrict
} = require("../controllers/weatherController");

router.post("/district", getWeatherByDistrict);
router.post("/forecast", getForecastByDistrict);

module.exports = router;