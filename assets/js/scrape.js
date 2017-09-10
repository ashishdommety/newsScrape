$(document).ready(function() {
  console.log(`scrape.js has loaded`);
  $(document).on("click", "#scrape_button, #unscrape_button", function() {

    var buttonId = $(this).attr("id");

    if (buttonId === "scrape_button") {
      console.log("the scrape button was clicked");
      $("#content").empty();
      $.post("/scrape", {})
        .done(function(data) {
          console.log("post to scrape data successfully sent! Timer activated");
          // $("#content").text("loading...");
          setTimeout(function(){
            // $("#content").empty();
            location.reload();
          }, 10);
        });
    } else if (buttonId === "unscrape_button") {
      console.log("unscrape button clicked");
      $.post("/unscrape", {})
        .done(function(data) {
          console.log("post to unscrape data successfully sent!");
          setTimeout(function(){
            location.reload();
          }, 10);
        });
    }

  })
})
