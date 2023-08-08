const express = require("express");
const weather = require("./weather/route");
const cities = require("./cities/route");
const app = express();
const port = 2626;

app.use("/weather", weather);
app.use("/cities", cities);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
