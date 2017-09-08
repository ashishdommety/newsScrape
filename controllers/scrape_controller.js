const request = require("request");
const cheerio = require("cheerio");

module.exports = function(app){
  app.get("/scrape", function(req,res){
    console.log('entered get');
    let results = [];
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
          results.push({
            headline: headline,
            link: link,
            summary:summary
          });
        }
        // Save these results in an object that we'll push into the results array we defined earlier

      });
      res.json(results);
    });

  })
};
