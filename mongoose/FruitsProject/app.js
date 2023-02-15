const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitsSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Why no name?"]
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const lemon = new Fruit({
  _id: 5,
  name: "Lemon",
  rating: 9,
  review: "Tastes like lime"
});

lemon.save()

// const banana = new Fruit({
//   _id: 2,
//   name: "banana",
//   rating: 7,
//   review: "Great taste"
// });

// const orange = new Fruit({
//   _id: 3,
//   name: "orange",
//   rating: 7,
//   review: "Great taste"
// });

// Fruit.insertMany([kiwi, orange, banana], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved");
//   }
// })

Fruit.find((err, fruits) => {
  if(err) {
    console.log(err);
  } else {
    // mongoose.connection.close()
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    })
  }
})