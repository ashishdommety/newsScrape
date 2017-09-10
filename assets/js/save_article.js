$(document).ready(function(){
  $(document).on("click", ".save_article_button, .delete_article_button",function(){
    var articleId = $(this).data("ref");
    console.log($(this).data("ref"));
    localStorage.setItem("articleSaved", articleId);

    if($(this).hasClass("delete_article_button")){
      console.log("kaboom! this was deleted");
      postSaved(false);
      // window.location.href = "/";
    } else if($(this).hasClass("save_article_button")){
      console.log("hooray! this was saved");
      postSaved(true);
    }


    function postSaved(bool){
      $.post("/articles/" + articleId,{saveValue: bool})
        .done(function(data){
          console.log("article saved in db!");
          setTimeout(function(){
            location.reload();
          }, 10);
        });
    }
  });


});
