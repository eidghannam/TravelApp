const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// POST route to analyze trip information
app.post("/analyze", async function (req, res) {
  const { city, date } = req.body;

  if (!city || !date) {
    return res
      .status(400)
      .json({ status: { code: "1", msg: "City and date are required" } });
  }

  try {
    // Step 1: Get coordinates from Geonames API
    const geoResponse = await fetch(
      `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=eid_hamamda`
    );
    const geoData = await geoResponse.json();

    if (!geoData.geonames || geoData.geonames.length === 0) {
      return res
        .status(400)
        .json({ status: { code: "1", msg: "City not found" } });
    }

    const { lat, lng } = geoData.geonames[0];

    // Step 2: Get weather data from Weatherbit API
    const weatherResponse = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=a5248b06a21d4128a7525e1bc0e0d1b5`
    );
    const weatherData = await weatherResponse.json();

    // Check if the city name contains spaces and replace them with hyphens
    const modifiedCity = city.includes(" ") ? city.replace(/ /g, "-") : city;

    // Step 3: Get an image from Pixabay API
    const imageResponse = await fetch(
      `https://pixabay.com/api/?key=48762932-7e11fa11a2071fe1965f9118c&q=${encodeURIComponent(
        modifiedCity
      )}&image_type=photo&pretty=true`
    );
    const imageData = await imageResponse.json();

    const weather =
      weatherData.data.find((day) => day.datetime === date) ||
      weatherData.data[0]; // if date not found, fallback to current weather

    const response = {
      city,
      country: geoData.geonames[0].countryName,
      forecast: [
        {
          date: weather.datetime,
          max_temp: weather.max_temp,
          min_temp: weather.min_temp,
          temp: weather.temp,
          weather: weather.weather.description,
        },
      ],
      imageUrl: imageData.hits[0].webformatURL,
    };

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: { code: "1", msg: "Server error" } });
  }
});

app.listen(8082, function () {
  console.log("App listening on port 8082!");
});

module.exports = app;
