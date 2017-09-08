const Article = require("../models/Article.js");

module.exports = function(app) {
  app.get("/", function(req, res) {
    Article.find({}, function(error,data){
      if (error) {
        res.send(error);
      }
      // Or send the data to the browser
      else {
        if(data.length){
          console.log(`data: ${data}`);
          res.render("../views/index", {article:data});
        } else{
          let noData = [
            {
              link:'/',
              headline: "Oops! Looks like there are no articles in the Database.",
              summary: "Hit the scrape button to add articles"
            }
          ];
          console.log(noData);
          res.render("../views/index", {article: noData})
        }
      }
    })
  });

};
