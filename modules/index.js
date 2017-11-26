const req = require('./request');

module.exports = {
   requestGeometry: req.requestGeometry,
   requestWeather: req.requestWeather,
   requestGeometryPromise: req.requestGeometryPromise,
   requestWeatherPromise: req.requestWeatherPromise,
   FtoC: req.FtoC
}
