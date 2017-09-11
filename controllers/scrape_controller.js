const request = require("request");
const cheerio = require("cheerio");
const Article = require("../models/Article.js");
const Note = require("../models/Note.js");

module.exports = function(app){
  app.post("/scrape", function(req,res){
    // console.log('entered post request');

    let result = {};
    request("https://www.nytimes.com/", function(error, response, html){
      let $ = cheerio.load(html);

      $("article.story.theme-summary").each(function(i, element) {

        let headline = $(element).children("h2").children("a").text();
        let link = $(element).children("h2").children("a").attr("href");
        let summary = $(element).children("p").text();

        if(headline){
          result.headline = headline;
          result.summary = summary;
          result.link = link;

          let entry = new Article(result);
          // Now, save that entry to the db
          entry.save(function(err, doc) {
            // Log any errors
            if (err) {
              console.log(err);
            }
            // Or log the doc
            else {
              // console.log(doc);
            }
          });
        }
      });
      console.log('successfully saved');
      res.redirect("/");
      // var noData = {};
      // res.render("../views/index", {article: noData})
    });
  });

  app.post("/unscrape", (req,res)=>{
    Article.collection.drop();
    Note.collection.drop();
    res.redirect("/");
    // var noData = {};
    // res.render("../views/index", {article: noData})
  });
};
