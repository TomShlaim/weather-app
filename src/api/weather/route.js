const express = require("express");
const route = express.Router();
const Weather = require("./controller");

route.get("/:location", Weather.getWeather);

module.exports = route;
