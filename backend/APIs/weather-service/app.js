const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Fetching live data from open weather API from user input
app.post("/", (req, res) => {
    const location = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=metric&appid=97343a62e8a6c4d7a4f604166d5ba806";
    https.get(url, (response) => {
        console.log(response.statusCode)
        response.on("data", (data) => {
            const parsedData = JSON.parse(data)
            const temperature = parsedData.main.temp;
            const weatherDescription = parsedData.weather[0].description;
            const iconURL = "http://openweathermap.org/img/wn/" + parsedData.weather[0].icon + "@2x.png";
            res.write("<p>Weather in " + location + " is " + weatherDescription + "</p>")
            res.write("<h1>The weather temperature in "+ location + " is " + temperature + "</h1>")
            res.write('<img src="' + iconURL + '"/>')
            res.send()
        })
    });
})

app.listen(3000)