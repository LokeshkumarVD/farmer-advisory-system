const axios = require("axios");
const { generateAlerts } = require("../utils/alertGenerator");
const districts = require("../utils/tamilNaduDistricts");
const { getFarmingAdvice } = require("../utils/farmingAdvisor");

// 🌍 Current weather
exports.getWeatherByDistrict = async (req, res) => {
  const { district } = req.body;

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    const selected = districts.find(
      (d) => d.name.toLowerCase() === district.toLowerCase()
    );

    if (!selected) {
      return res.status(404).json({ message: "District not found" });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: selected.lat,
          lon: selected.lon,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const weather = response.data;
    const alerts = generateAlerts(weather);

    res.json({ weather, alerts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Weather fetch failed" });
  }
};


// 📅 Forecast + Advice
exports.getForecastByDistrict = async (req, res) => {
  const { district } = req.body;

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    const selected = districts.find(
      (d) => d.name.toLowerCase() === district.toLowerCase()
    );

    if (!selected) {
      return res.status(404).json({ message: "District not found" });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: selected.lat,
          lon: selected.lon,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const forecast = response.data.list;

    const advice = getFarmingAdvice(forecast);

    res.json({
      forecast,
      advice,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Forecast fetch failed" });
  }
};