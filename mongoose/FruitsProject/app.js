const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitsSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Great taste"
});
fruit.save();
