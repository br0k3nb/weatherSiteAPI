//jshint esversion:9
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

let temperature;
let city;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/',(req, res) => {
  let cityName = req.body.city;
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  city = cityName;
  let cityLink = cityName + ",br";
  cityLink = "https://api.openweathermap.org/data/2.5/weather?appid=f45e7f69bb622e1f86194350be403ae3&units=metric&q="+ cityLink;

  https.get(cityLink, function (response) {

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      let temp =  Math.floor(weatherData.main.temp);
      temperature = temp;
      res.redirect('/temp');

  });

});

});

app.get('/temp', (req, res) => res.render('weather', {temperature: temperature, city: city}));

app.listen(3000, () => console.log("The server is online at port 3000!"));
