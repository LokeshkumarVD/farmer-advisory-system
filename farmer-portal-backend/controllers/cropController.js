const axios = require("axios");
const crops = require("../utils/cropData");

// 🌱 BASIC ADVISORY (IMPROVED)
exports.getCropAdvisory = (req, res) => {
  try {
    const { soilType, season } = req.query;

    if (!soilType || !season) {
      return res.json([]);
    }

    const soil = soilType.toLowerCase();
    const seasonInput = season.toLowerCase();

    // 🔍 Filter crops dynamically
    const filteredCrops = crops.filter(
      (crop) =>
        crop.soil.includes(soil) &&
        crop.season.includes(seasonInput)
    );

    // 🔄 Fallback if no match
    if (filteredCrops.length === 0) {
      return res.json(crops);
    }

    res.json(filteredCrops);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in advisory" });
  }
};

// 🤖 AI + WEATHER
exports.getAICropRecommendation = async (req, res) => {
  try {
    const { district, N, P, K, ph } = req.body;

    // 🌦 Get weather
    const weatherRes = await axios.post(
      "http://localhost:5000/api/weather/district",
      { district }
    );

    const weather = weatherRes.data.weather;

    const temperature = weather.main.temp;
    const humidity = weather.main.humidity;

    let rainfall = 50;
    const condition = weather.weather[0].main;

    if (condition === "Rain") rainfall = 200;
    else if (condition === "Clouds") rainfall = 100;

    // 🤖 AI API call
    const aiRes = await axios.post(
      "http://localhost:5001/predict",
      {
        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        rainfall
      }
    );

    res.json({
      cropName: aiRes.data.crop,
      temperature,
      humidity,
      rainfall
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ message: "AI prediction failed" });
  }
};