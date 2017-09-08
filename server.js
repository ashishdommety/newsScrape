//our Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cheerio = require("cheerio");
const request = require("request");
const logger = require("morgan");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Serve static content for the app from the "public" directory in the application directory.
app.use(bodyParser.urlencoded({ extended: true }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./controllers')(app);

app.get("/", function(req,res){
  res.render("../views/index", {});
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
