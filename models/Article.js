// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type:String,
    required:true
  },
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
    //the note key is an array so multiple notes can be added
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]

});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
