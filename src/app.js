// SERVER SIDE
const path = require('path')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000



// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// If the default views directry name is changed:
const viewsPath = path.join(__dirname, '../templates/views')
// Partials path
const partialsPath = path.join(__dirname, '../templates/partials')



// Set up templating engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Serving static directory to serve
app.use(express.static(publicDirectoryPath)) 



app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather',
    name: 'Emil Joseph'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About me',
    name: 'Emil Joseph'
  })
})

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'Help',
    message: 'Test message',
    name: 'Emil Joseph'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address 

  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error
        })
      } 
      return res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  }) 
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

// Help related 404 page
app.get('/help/*', (req, res) => {
  res.render('404.hbs', {
    title: 404,
    errorMessage: 'Help article not found',
    name: 'Emil Joseph'
  })
})

// 404
app.get('*', (req, res) => {
  res.render('404.hbs', {
    title: 404,
    errorMessage: 'Page not found',
    name: 'Emil Joseph'
  })
})


// Listening on port 3000 locally
app.listen(port, () => {
  console.log(`Listening on ${port}` )
})