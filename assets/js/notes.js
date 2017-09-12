$(document).ready(function() {
  $(document).on("click", ".add_note_button, .note_button, .delete_note", function() {

    if ($(this).hasClass("add_note_button")) {
      var articleId = $(this).data("ref");
      localStorage.setItem("articleNoteClicked", articleId);
      console.log("clicked add note");
      var data = "<div class='notes'>" +
        "<h3 data-idNum=" + articleId + ">Article notes</h3>" +
        "<hr>" +
        "<div id='notes_for_" + articleId + "'></div>" +
        // "<hr>" +
        "<textarea class='note_data' rows='4' cols='50'> " +
        "</textarea>" +
        "<hr>" +
        "<button type='submit' class='note_button hvr-grow'>Submit</button>" +
        "</div>";

      bootbox.dialog({
        message: data
      });

      $.get("/populatedArticles/" + articleId, function(data) {
          // console.log("this is: " + $(this));
          // console.log("article notes: " + data.note[0].body);
          var notes = data.note;
          for (var i = 0; i < notes.length; i++) {
            // console.log("notes number" + i + ": " + notes[i].body);
            $("#notes_for_" + articleId).append("<p>" +
            notes[i].body +
            "<button class='delete_note hvr-grow' data-ref="+
            notes[i]._id+
            "> X </button></p>")
          }
        })
    } else if ($(this).hasClass("note_button")) {
      var noteData = $(this).parent().children(".note_data").val().trim();
      var articleId = $(this).parent().children("h3").attr("data-idNum");
      console.log(noteData);
      console.log("article id is: " + articleId);
      localStorage.setItem("articleNoteSubmitted", articleId);
      $.post("/submitNote", {
          noteData: noteData,
          articleId: articleId
        })
        .done(function(data) {
          console.log("data:",data);
          // console.log("article saved in db!");
          setTimeout(function(){
            location.reload();
          }, 10);
        });
      // 59b33489f5cd7f21881244b5
    } else if($(this).hasClass("delete_note")){
      console.log("Deleting this note now!")
      console.log($(this).data("ref"));
      var noteId = $(this).data("ref");
      $.post("/deleteNote", {
          noteId: noteId
        })
        .done(function(data) {
          console.log("data:",data.message);
          // console.log("article saved in db!");
          setTimeout(function(){
            location.reload();
          }, 10);
        });
    }




  })

});
