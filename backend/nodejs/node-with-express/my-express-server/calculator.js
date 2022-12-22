const express = require("express");
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({extended: true})) //urlencoded** for parsing data coming from html form

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let result = num1 + num2;
    res.send("The result is " + result)
})


app.listen(3200, () => {
    console.log("Server started")
});