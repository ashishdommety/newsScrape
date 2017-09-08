const Article = require("../models/Article.js");

module.exports = function(app) {
  app.get("/saved", function(req, res) {
    Article.find({saved:true}, (error,data)=>{
      if (error) {
        res.send(error);
      }else {
        if(data.length){
          res.json(data);
        }else {
          let noData = [
              {
                link:'/',
                headline: "There are no saved articles",
                summary: "Please save an article on the homepage"
              }
            ];
          res.render("../views/index", {article: noData})
        }
      }
    })
    console.log(`entered saved data`);
    // res.send("saved data here");
  });

};
