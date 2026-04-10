const getFarmingAdvice = (forecast) => {
  const advice = [];

  forecast.slice(0, 10).forEach((item) => {
    const temp = item.main.temp;
    const condition = item.weather[0].main;

    if (condition === "Rain") {
      advice.push("🌧 Rain expected → Avoid irrigation & protect crops");
    }

    if (temp > 35) {
      advice.push("🔥 High temperature → Increase watering");
    }

    if (temp < 20) {
      advice.push("❄️ Low temperature → Cover crops");
    }

    if (condition === "Clear") {
      advice.push("☀️ Good weather → Suitable for harvesting");
    }
  });

  return [...new Set(advice)];
};

module.exports = { getFarmingAdvice };