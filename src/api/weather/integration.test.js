const request = require("supertest");
const express = require("express");

const app = express();
const port = 2626;

const server = app.listen(port, () => {
  console.log(`Example test server listening on port ${port}`);
});

function close() {
  server.close();
}

describe(getName(), () => {
  test("should return weather data for a valid city", async () => {
    const response = await request(app).get("/weather/Kabul");
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
    const response = await request(app).get("/weather/Invalid");
    expect(response.statusCode).toBe(404);
  });
});

afterAll(() => {
  close();
});

function getName() {
  return "Some describe name";
}
