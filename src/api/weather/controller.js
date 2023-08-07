const axios = require("axios");
require("dotenv").config();

async function getWeather(req, res) {
  const { location } = req.params;
  const isValidLocation = await isValidCity(location);

  if (isValidLocation) {
    const apiToken = process.env.API_TOKEN;
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiToken}&q=${location}`,
    );
    res.send(response.data.current);
  } else {
    res.status(404).send("City not found");
  }
}

async function isValidCity(location) {
  const response = await axios.get(`http://localhost:2626/cities`);
  const isValidCity = isCityInArray(location, response.data);

  return isValidCity;
}

function isCityInArray(cityToCheck, data) {
  for (const entry of data) {
    if (entry.cities.includes(cityToCheck)) {
      return true;
    }
  }
  return false;
}

module.exports = { getWeather };
