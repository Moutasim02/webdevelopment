const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.firstNameField;
  let lastName = req.body.lastNameField;
  let email = req.body.emailField;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/61af2a11ed"
  const options = {
    method:"POST",
    auth:"moutasim:3a7ebae8e073c35152c47fcf7a885056-us17"
  }
  const request = https.request(url, options, (response) => {
  if (response.statusCode === 200) {
    res.send("Successfully Subscribed!")
  } else {
    res.send("Not successful!")
  }
    response.on("data", (data) => {
        console.log(JSON.parse(data))
    })
  });

  request.write(jsonData)
  request.end()
});

app.listen(3000, () => {
  console.log("server is running in port 3000");
});

// 3a7ebae8e073c35152c47fcf7a885056-us17
// 61af2a11ed
