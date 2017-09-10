const Article = require("../models/Article.js");

module.exports = function(app) {
  app.get("/saved", function(req, res) {
    Article.find({
      saved: true
    }, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        if (data.length) {
          res.render("../views/index", {
            article: data
          });
          // res.json(data);
        } else {
          let noData = [{
            link: '/',
            headline: "There are no saved articles",
            summary: "Please save an article on the homepage"
          }];
          res.render("../views/index", {
            article: noData
          })
        }
      }
    })
    // console.log(`entered saved data`);
    // res.send("saved data here");
  });

  app.post("/articles/:id", (req, res) => {
    console.log(`save value ${req.body.saveValue}`);
    console.log(`id: ${req.params.id}
      -----------------------`);
    Article.update({
      _id: req.params.id
    }, {
      saved: req.body.saveValue
    }, {
      multi: false
    }, (data) => {
      if (req.body.saveValue) {

        console.log(`successfully saved article!`);
        res.redirect("back");
      } else {
        console.log("successfully deleted article from saved list");
        res.send("deleted");
      }
    })
  })

};
