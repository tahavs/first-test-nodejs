const request = require('request')

module.exports.requestGeometry = (address, callback) => {
   request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
      json: true
   }, (err, res, body)=> {
      if(err){
         callback('Error in connection to server');
      }
      else if (body.status === 'ZERO_RESULTS') {
         callback('Address is invalid');
      }
      else if (body.status === 'OK') {
         callback(undefined, {
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
         });
      }
      else {
         callback('Unknown error happened');
      }
   })
}

module.exports.requestWeather = (loc, callback) => {
   request({
      url: `https://api.darksky.net/forecast/bc5501692be51004cc26a2df6ccb6678/${loc.lat},${loc.lng}`,
      json: true
   }, (err, res, body)=> {
      if(err){
         callback('Error in connection to server');
      }
      else if (body.code === 400) {
         callback('Address is invalid');
      }
      else if (body.latitude !=undefined && body.longitude !=undefined) {
         callback(undefined, {
            real: body.currently.temperature,
            sense: body.currently.apparentTemperature
         });
      }
      else {
         callback('Unknown error happened');
      }
   })
}

module.exports.requestGeometryPromise = (address) => {
   return new Promise((resolve, reject) => {
      request({
         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
         json: true
      }, (err, res, body)=> {
         if(err){
            reject('Error in connection to server');
         }
         else if (body.status === 'ZERO_RESULTS') {
            reject('Address is invalid');
         }
         else if (body.status === 'OK') {
            resolve({
               lat: body.results[0].geometry.location.lat,
               lng: body.results[0].geometry.location.lng
            });
         }
         else {
            reject('Unknown error happened');
         }
      })
   })
}

module.exports.requestWeatherPromise = (loc) => {
   return new Promise((resolve, reject) =>{
      request({
         url: `https://api.darksky.net/forecast/bc5501692be51004cc26a2df6ccb6678/${loc.lat},${loc.lng}`,
         json: true
      }, (err, res, body)=> {
         if(err){
            reject('Error in connection to server');
         }
         else if (body.code === 400) {
            reject('Address is invalid');
         }
         else if (body.latitude !=undefined && body.longitude !=undefined) {
            resolve({
               real: body.currently.temperature,
               sense: body.currently.apparentTemperature
            });
         }
         else {
            reject('Unknown error happened');
         }
      })
   })
}

module.exports.FtoC = (fDeg) => {
   var num = (fDeg - 32) * 5 / 9
   var cDeg = Math.round(num * 100) / 100
   return cDeg
}

// module.exports.requestGeometryPromise('tehran').then((msg) => {
//    console.log(msg);
//    return module.exports.requestWeatherPromise(msg)
// }).then((msg) => {
//    console.log(`It is ${msg.real}, but seems like ${msg.sense}.`);
// }).catch((e) => {
//    console.log(e);
// })
