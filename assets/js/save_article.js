$(document).ready(function(){
  $(document).on("click", ".save_article_button",function(){
    console.log($(this).data("ref"));
  });
});
