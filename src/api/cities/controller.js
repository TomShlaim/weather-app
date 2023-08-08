const axios = require("axios");
async function getCities(req, res) {
  const response = await axios.get(
      `https://countriesnow.space/api/v0.1/countries`,
  );
  res.send(response.data.data);
}

module.exports = { getCities };
