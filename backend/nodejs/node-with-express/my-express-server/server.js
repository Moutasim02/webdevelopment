const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/bmicalculator.html')
})

app.post("/bmicalculator", (req, res) => {
    let weight = parseFloat(req.body.weight)
    let height = parseFloat(req.body.height)
    let result = weight * height;
    res.send("You BMI is " + result)
}) 

app.listen(3000, () => {
    console.log("Server started")
});
