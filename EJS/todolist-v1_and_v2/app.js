const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
// Stopped at 347
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/todolistDB");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter a task first"],
  },
});

const ToDoItem = mongoose.model(
  "ToDo",
  todoSchema
); /*"ToDo",in quotes, is the name of collection stored in the DB */

const task1 = new ToDoItem({
  task: "This is the first task!",
});

const task2 = new ToDoItem({
  task: "This is the second task!",
});

const task3 = new ToDoItem({
  task: "This is the third task!",
});

const defaultTasks = [task1, task2, task3];

const listSchema = {
  name: String,
  items: [todoSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);

  ToDoItem.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      ToDoItem.insertMany(defaultTasks, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added!");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { kindOfDay: day, newListItems: foundItems }); // The key (variable) is the same as the one in list.ejs
    }
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;

  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultTasks,
        });
        list.save();
		res.redirect("/" + customListName);
      } else {
        res.render("list", {
          kindOfDay: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.post("/delete", (req, res) => {
  const taskToDelete = req.body.taskToDelete;
  ToDoItem.findByIdAndRemove(taskToDelete, (err) => {
    if (!err) console.log("Successfully Removed");
  });
  res.redirect("/");
});

app.post("/", (req, res) => {
  var taskName = req.body.todoInput;
  const task = new ToDoItem({ task: taskName });
  task.save();
  res.redirect("/");
});

app.listen(3000);
