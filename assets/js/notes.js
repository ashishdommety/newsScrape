$(document).ready(function() {
  $(document).on("click", ".add_note_button, .note_button", function() {

    if ($(this).hasClass("add_note_button")) {
      var articleId = $(this).data("ref");
      console.log("clicked add note");
      var data = "<div class='notes'>" +
        "<h3 data-idNum=" + articleId + ">Article notes</h3>" +
        "<hr>" +
        "<div id='notes_" + articleId + "'></div>" +
        "<hr>" +
        "<textarea class='note_data' rows='4' cols='50'> " +
        "</textarea>" +
        "<hr>" +
        "<button type='submit' class='note_button'>Submit</button>" +
        "</div>";

      bootbox.dialog({
        message: data
      });

      $.get("/populatedArticles/" + articleId, function(data) {
          // console.log("this is: " + $(this));
          // console.log("article notes: " + data.note[0].body);
          var notes = data.note;
          for (var i = 0; i < notes.length; i++) {
            console.log("notes number" + i + ": " + notes[i].body);
            $("#notes_" + articleId).append("<p>" + notes[i].body + "<button> X </button></p>")
          }
        })
    } else if ($(this).hasClass("note_button")) {
      var noteData = $(this).parent().children(".note_data").val().trim();
      var articleId = $(this).parent().children("h3").attr("data-idNum");
      console.log(noteData);
      console.log(articleId);
      $.post("/submitNote", {
          noteData: noteData,
          articleId: articleId
        })
        .done(function(data) {
          console.log("article saved in db!");
        });
      // 59b33489f5cd7f21881244b5
    }




  })

});
