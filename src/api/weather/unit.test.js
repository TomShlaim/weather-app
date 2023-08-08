// Import the function to be tested
const { isCityInArray, getWeather } = require("./controller");
const axios = require("axios");

// Sample data for testing
const testData = [
  {
    iso2: "AF",
    iso3: "AFG",
    country: "Afghanistan",
    cities: ["Herat", "Kabul"],
  },
  // Add more test data entries here...
];

describe("getWeather function", () => {
  test("should return weather data for a valid city", async () => {
    console.log('a');
    const citiesResponseMock = [
      {
        iso2: "AF",
        iso3: "AFG",
        country: "Afghanistan",
        cities: [
          "Herat",
          "Kabul",
          "Kandahar",
          "Molah",
          "Rana",
          "Shar",
          "Sharif",
          "Wazir Akbar Khan",
        ],
      },
      {
        iso2: "AL",
        iso3: "ALB",
        country: "Albania",
        cities: [
          "Elbasan",
          "Petran",
          "Pogradec",
          "Shkoder",
          "Tirana",
          "Ura Vajgurore",
        ],
      },
    ];
    const weatherResponseMock = {
      current: {
        last_updated_epoch: 1691386200,
        last_updated: "2023-08-07 10:00",
        temp_c: 27.8,
        temp_f: 82,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 2.7,
        wind_kph: 4.3,
        wind_degree: 51,
        wind_dir: "NE",
        pressure_mb: 1001,
        pressure_in: 29.57,
        precip_mm: 0,
        precip_in: 0,
        humidity: 18,
        cloud: 0,
        feelslike_c: 25.9,
        feelslike_f: 78.6,
        vis_km: 10,
        vis_miles: 6,
        uv: 7,
        gust_mph: 3.1,
        gust_kph: 5,
      },
    };
    const validCity = "Kabul";

    //Axios response type - https://www.delftstack.com/howto/typescript/axios-typescript/
    const axiosSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: citiesResponseMock })
      .mockResolvedValueOnce({ data: weatherResponseMock });

    const req = { params: { location: validCity } };
    const res = { send: jest.fn() };
    // jest.spyOn(res, "send").mockReturnValue(null);

    const response = await getWeather(req, res);

    expect(axiosSpy).toBeCalledTimes(2);
    expect(axiosSpy).toHaveBeenNthCalledWith(1, "http://localhost:2626/cities");
    expect(axiosSpy).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining(validCity),
    );
    expect(axiosSpy).toHaveBeenNthCalledWith(
      2,
      expect.stringMatching(/api.weatherapi*/),
    );
    expect(res.send).toHaveBeenCalledWith(weatherResponseMock.current);
    // const resSendResponse = res.send();
    // expect(resSendResponse).toBeNull();
  });
  test("should return 404 for an invalid city", async () => {
    console.log('b');
    const citiesResponseMock = [
      {
        iso2: "AF",
        iso3: "AFG",
        country: "Afghanistan",
        cities: [
          "Herat",
          "Kabul",
          "Kandahar",
          "Molah",
          "Rana",
          "Shar",
          "Sharif",
          "Wazir Akbar Khan",
        ],
      },
      {
        iso2: "AL",
        iso3: "ALB",
        country: "Albania",
        cities: [
          "Elbasan",
          "Petran",
          "Pogradec",
          "Shkoder",
          "Tirana",
          "Ura Vajgurore",
        ],
      },
    ];
    const weatherResponseMock = {
      current: {
        last_updated_epoch: 1691386200,
        last_updated: "2023-08-07 10:00",
        temp_c: 27.8,
        temp_f: 82,
        is_day: 1,
        condition: {
          text: "Sunny",
          icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          code: 1000,
        },
        wind_mph: 2.7,
        wind_kph: 4.3,
        wind_degree: 51,
        wind_dir: "NE",
        pressure_mb: 1001,
        pressure_in: 29.57,
        precip_mm: 0,
        precip_in: 0,
        humidity: 18,
        cloud: 0,
        feelslike_c: 25.9,
        feelslike_f: 78.6,
        vis_km: 10,
        vis_miles: 6,
        uv: 7,
        gust_mph: 3.1,
        gust_kph: 5,
      },
    };
    const invalidCity = "InvalidCity";

    const axiosSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: citiesResponseMock });

    const req = { params: { location: invalidCity } };
    const res = { status: jest.fn(() => res), send: jest.fn() };

    const response = await getWeather(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('City not found');
  });
});
describe("isCityInArray function", () => {
  test("should return true if city is in the array", () => {
    console.log('c');
    const cityToCheck = "Kabul";
    const result = isCityInArray(cityToCheck, testData);
    expect(result).toBe(true);
  });

  test("should return false if city is not in the array", () => {
    console.log('d');
    const cityToCheck = "New York";
    const result = isCityInArray(cityToCheck, testData);
    expect(result).toBe(false);
  });
});
