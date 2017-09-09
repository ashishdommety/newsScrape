// Require mongoose
const mongoose = require("mongoose");
// Creating a schema class
const Schema = mongoose.Schema;

// Creating the Note schema
const NoteSchema = new Schema({
  // _id:{
  //   type:String
  // },
  body: {
    type: String
  }
});

// Mongoose automatically saves the ObjectIds of the notes
// These ids are referred to in the Article model

// Creating the Note model with the NoteSchema
const Note = mongoose.model("Note", NoteSchema);

// Exporting the Note model
module.exports = Note;
