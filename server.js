//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cheerio = require("cheerio");
const request = require("request");
const logger = require("morgan");
const mongoose = require("mongoose");

// Requiring our Note and Article models
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("assets"));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//checks if local host exists or not
mongoose.connect( "mongodb://heroku_zpg02kwj:k0ccb6j41snuqro6vn48hjqheg@ds127564.mlab.com:27564/heroku_zpg02kwj" || "mongodb://localhost/newscrape");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//requiring all the controllers
require('./controllers')(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
