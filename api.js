const request = require('request');
const config = require('./config.json')


exports.getWeatherforLocation = function(location, units) {
    return new Promise((resolve, reject) => {
      request(`${config.weatherurl}data/2.5/weather?q=${location}&units=${units}&APPID=${config.weatherToken}`, function(e, r, b) {
        var c = JSON.parse(b);
        resolve(c);
      })
    })
  }
