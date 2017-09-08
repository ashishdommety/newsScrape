const Article = require("../models/Article.js");

module.exports = function(app) {
  app.get("/", function(req, res) {
    Article.find({}, function(error,data){
      if (error) {
        res.send(error);
      }
      // Or send the data to the browser
      else {
        console.log(data);
        res.render("../views/index", {article:data});
      }
    })
  });

};
