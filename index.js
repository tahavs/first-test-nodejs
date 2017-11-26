const yargs = require('yargs');
const reqGeo = require('./modules');
const axios = require('axios');

const argv = yargs
            .option({
               address:{
                  description: 'write your address here',
                  demand: true,
                  alias: 'a',
                  string: true
               }
            })
            .help()
            .alias('help', 'h')
            .argv

var address = encodeURIComponent(argv.address)
// reqGeo.requestGeometry(address, (err, loc) => {
//    console.log(address);
//    if(err){
//       console.log(err);
//    }
//    else{
//       reqGeo.requestWeather(loc, (err, temp) => {
//          if(err){
//             console.log(err);
//          }
//          else{
//             console.log(`It is ${temp.real}, but seems like ${temp.sense}.`);
//          }
//       })
//    }
// })

// reqGeo.requestGeometryPromise(address).then((msg) => {
//    console.log(msg);
//    return reqGeo.requestWeatherPromise(msg)
// }).then((msg) => {
//    console.log(`It is ${msg.real}, but seems like ${msg.sense}.`);
// }).catch((e) => {
//    console.log(e);
// })

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`).then((res) => {
   if (res.data.status === 'ZERO_RESULTS') {
     throw new Error('Unable to find that address.');
   }
   console.log('\n________________________');
   console.log('< forecast application >');
   console.log('------------------------');
   var lat = res.data.results[0].geometry.location.lat;
   var lng = res.data.results[0].geometry.location.lng;
   console.log(res.data.results[0].formatted_address);
   return axios.get(`https://api.darksky.net/forecast/bc5501692be51004cc26a2df6ccb6678/${lat},${lng}`)
}).then((res) => {
   var real = reqGeo.FtoC(res.data.currently.temperature)
   var sense = reqGeo.FtoC(res.data.currently.apparentTemperature)
   var summary = res.data.currently.summary
   console.log(`It is ${real}, but seems like ${sense}, and it is ${summary}`);
      console.log('________________________');
}).catch((e) => {
   console.log(e.message);
})
