$(document).ready(function(){
  $(document).on("click", ".save_article_button",function(){
    var articleId = $(this).data("ref");
    console.log($(this).data("ref"));

    $.post("/articles/" + articleId,{})
      .done(function(data){
        console.log("article saved in db!");
      });
  });
});
