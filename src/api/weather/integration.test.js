const request = require("supertest");
const axios = require("axios");

describe("Weather integration tests", () => {
  test("should return weather data for a valid city", async () => {
    const response = await axios.get("http://localhost:2626/weather/Kabul");
    //Just for sanity check
    //console.log(response);
    //It can be changed and that's why I commented it
    // expect(JSON.parse(response.text)).toEqual({
    //   last_updated_epoch: 1691476200,
    //   last_updated: "2023-08-08 11:00",
    //   temp_c: 27.6,
    //   temp_f: 81.7,
    //   is_day: 1,
    //   condition: {
    //     text: "Sunny",
    //     icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    //     code: 1000,
    //   },
    //   wind_mph: 2.2,
    //   wind_kph: 3.6,
    //   wind_degree: 121,
    //   wind_dir: "ESE",
    //   pressure_mb: 1001,
    //   pressure_in: 29.57,
    //   precip_mm: 0,
    //   precip_in: 0,
    //   humidity: 18,
    //   cloud: 0,
    //   feelslike_c: 25.7,
    //   feelslike_f: 78.3,
    //   vis_km: 10,
    //   vis_miles: 6,
    //   uv: 7,
    //   gust_mph: 2.2,
    //   gust_kph: 3.6,
    // });
  });
  test("should return 404 for an invalid city", async () => {
    try {
      const response = await axios.get("http://localhost:2626/weather/Kabul2");
    }
    catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
