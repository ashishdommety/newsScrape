const Article = require("../models/Article.js");
const Note = require("../models/Note.js");

module.exports = function(app) {
  app.post("/submitNote", (req, res) => {

    console.log(`note data: ${req.body.noteData}
      article id: ${req.body.articleId}`);

    var newNote = new Note({
      body: req.body.noteData
    });
    console.log(`new note: ${newNote}`);

    newNote.save(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
        console.log(`error saving note: ${error}`);
      }
      // Otherwise
      else {
        console.log(`no error, new note saved successfully`);
        console.log(`doc: ${doc}`);
        // Find our article and push the new note id into the article's notes array
        Article.findOneAndUpdate(req.body.articleId, {
            $push: {
              note: doc._id
            }
          }, {
            new: true
          },
          function(err, newdoc) {
            // Send any errors to the browser
            if (err) {
              console.log(`couldn't push into notes Array error: ${err}`);
              res.send(err);
            }
            // Or send the newdoc to the browser
            else {
              // newdoc.note
              console.log(`************************************************************

              newdoc: ${newdoc}`)
              // res.send(newdoc);
            }
          });
      }
    });
  });

  app.get("/allNotes", (req, res) => {
    Note.find({}, function(error, data) {
      if (error) {
        res.send(error);
      }
      // Or send the data to the browser
      else {
        res.json(data);
      }
    })
  })

  app.get("/allArticles", (req, res) => {
    Article.find({}, function(error, data) {
      if (error) {
        res.send(error);
      }
      // Or send the data to the browser
      else {
        res.json(data);
      }
    })
  })

  // Route to see what user looks like WITH populating
  app.get("/populatedArticles", function(req, res) {
  //find all users
    Article.find({})
    // populate the notes (replace the objectIds in the notes array with bona-fide notes)
      .populate("notes")
      // Now, execute that query
      .exec(function(error, doc) {
        // Send any errors to the browser
        if (error) {
          res.send(error);
        }
        // Or, send our results to the browser, which will now include the books stored in the library
        else {
          res.json(doc);
        }
      });
  });
}
