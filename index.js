const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const constants = require("./config/constants");

mongoose.connect(constants.mongoURI);

require("./models/urlModel");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
require("./routes/")(app);


const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});

