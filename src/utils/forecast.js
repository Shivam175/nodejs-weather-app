const request = require("postman-request");

const getForecast = ({ latitude, longitude }, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=8d434ab1b9cb5be0ed051176520b8b32&query=${latitude},${longitude}`;

  request(forecastUrl, { json: true }, (err, { body }) => {
    const data = body.current;
    if (err) callback("Could not connect to the weather API!", undefined);
    else if (data?.weather_descriptions?.length < 1 || body.error)
      callback("Bad request parameters for the weather API!", undefined);
    else {
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees outside. There is ${data.precip}% chance of rain.`
      );
    }
  });
};

module.exports = {
  getForecast
};
