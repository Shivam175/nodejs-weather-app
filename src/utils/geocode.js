const request = require("postman-request");

const getGeocode = (address, callback) => {
  const geoLocationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2hpdmFtMTEwIiwiYSI6ImNsaWZ1MDV1OTA4eG4za253dzA4bHFiZ3kifQ.-XvJczPs31us3RRPjLdHGg&limit=2`;

  request(geoLocationUrl, { json: true }, (err, { body }) => {
    const { features, message } = body;
    if (err) callback("Could not connect to the API!", undefined);
    else if (features?.length < 1 || message)
      callback("Bad request parameters!", undefined);
    else {
      callback(undefined, {
        latitude: features[0]?.center[1],
        longitude: features[0]?.center[0],
        location: features[0]?.place_name
      });
    }
  });
};

module.exports = {
  getGeocode
};
