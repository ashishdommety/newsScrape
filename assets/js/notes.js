$(document).ready(function(){
  $(document).on("click", ".add_note_button", function(){
    var articleId = $(this).data("ref");
    $.post("/articles/" + articleId + "/notes")
      .done(function(data){
        console.log("article saved in db!");
      });
    console.log("clicked add note");
    var data = "<div class='notes'>"+
                "<h3>Article notes</h3>" +
                "<hr>" +
                "<p> Earlier note here<button> X </button></p>" +
                "<hr>" +
                "<textarea rows='4' cols='50'> "+
                "Enter new note here."+
                "</textarea>" +
               "</div>"
    bootbox.dialog({message: data});
  })

});
