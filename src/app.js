const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const staticDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set HBS Paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found",
    title: "404 Page"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address query param missing."
    });
  } else {
    let geoLocation = "";

    const forecastCallback = (error, response) => {
      if (error) {
        return res.send({
          error
        });
      }
      if (response) {
        return res.send({
          forecast: response,
          location: geoLocation,
          address: req.query.address
        });
      }
    };

    const geocodeCallback = (error, response) => {
      if (error) {
        return res.send({
          error
        });
      }
      if (response) {
        geoLocation = response.location;
        forecast.getForecast(response, forecastCallback);
      }
    };

    geocode.getGeocode(req.query.address, geocodeCallback);
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found",
    title: "404 Page"
  });
});

app.listen("3000", () => {
  console.log("Server is running on port 3000.");
});
