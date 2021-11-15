const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1ce282775c133c7815402372c4bcabc5&query=${latitude},${longitude}&unites=f`

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather services!', undefined)
    } else if(body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out in ${body.location.name}, ${body.location.region}, with a real feel of ${body.current.feelslike} degrees.`)
    }
  })
}



module.exports = forecast