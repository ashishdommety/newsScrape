// Require mongoose
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const ArticleSchema = new Schema({
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
  saved:{
    type:Boolean,
    default:false
  },
  // This only saves one note's ObjectId, ref refers to the Note model
    //the note key is an array so multiple notes can be added
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]

});

// Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
