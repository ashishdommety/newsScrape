const request = require("request");
const cheerio = require("cheerio");
const Article = require("../models/Article.js");

module.exports = function(app){
  app.post("/scrape", function(req,res){
    console.log('entered get');
    let result = {};
    request("https://www.nytimes.com/", function(error, response, html){
      let $ = cheerio.load(html);
      $("article.story.theme-summary").each(function(i, element) {

        let headline = $(element).children("h2").children("a").text();
        let link = $(element).children("h2").children("a").attr("href");
        let summary = $(element).children("p").text();

        if(headline){
          console.log(`headline: ${headline}
                      link: ${link}
                      summary: ${summary}`);
          console.log("---------------------------------");
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
              console.log(doc);
            }
          });
        }
      });
      res.send("Scrape completed!");
    });

  })
};
