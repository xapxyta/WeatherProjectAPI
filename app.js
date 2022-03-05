const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");;
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const units = "metric";
  const key = "0d4488ed20cd2be5aa2353494034d375";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + key;
  https.get(url, function(response){
    console.log(response.statusCode);
  response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const iconId = weatherData.weather[0].icon;
    const icon = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
    res.write("<h1>The weather is currently " + description + "</h1>");
    res.write("<h2>The temperature in " + query + " is " + temp + " degrees Celsius.</h2>");
    res.write("<div style='background-color:pink;'><img src='https://openweathermap.org/img/wn/" + iconId + "@2x.png'></div>" );
    res.send();
  });
  });
});

app.listen(3000, function(){
  console.log("Server is running on porn 3000.");
});
