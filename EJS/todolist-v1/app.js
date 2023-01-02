const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

var items = [];
app.get("/", (req, res) => { 
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: 'long'
  };

  var day = today.toLocaleDateString('en-US', options)
  res.render("list", {kindOfDay: day, newListItems: items}); // The key (variable) is the same as the one in list.ejs
});

app.post('/', (req, res) => {
  var item =  req.body.todoInput;
  items.push(item)
  res.redirect("/")
});

app.listen(3000);
