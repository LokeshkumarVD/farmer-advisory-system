const generateAlerts = (weather) => {
  const alerts = [];

  const temp = weather.main.temp;
  const condition = weather.weather[0].main;

  if (condition === "Rain") {
    alerts.push("Rain expected: Avoid irrigation");
  }

  if (temp > 35) {
    alerts.push("High temperature: Increase watering");
  }

  if (temp < 15) {
    alerts.push("Low temperature: Protect crops");
  }

  return alerts;
};

module.exports = { generateAlerts };