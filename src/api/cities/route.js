const express = require("express");
const router = express.Router();
const Cities = require("./controller");

router.get("/", Cities.getCities);

module.exports = router;
