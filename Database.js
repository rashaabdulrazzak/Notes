const mongoose = require("mongoose");
const Note = require("./schemas/note");

class Database {
  constructor() {
    this.Url =
      process.env.MONGODB_URL ||
      "mongodb+srv://admin:admin123@cluster0.g2wij.mongodb.net/myNotes?retryWrites=true&w=majority"; //"mongodb://localhost:27017/notes";
  }
  connect() {
    mongoose
      .connect(this.Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Database Connected Correctly");
      })
      .catch((err) => {
        console.log("error in connection", err);
      });
  }
  addNote(note) {
    return new Promise((resolve, reject) => {
      note["createdDate"] = new Date();
      note["updateDate"] = new Date();

      let newNote = new Note(note);
      newNote
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getNotes() {
    return new Promise((resolve, reject) => {
      Note.find({})
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  getNoteById(id) {
    return new Promise((resolve, reject) => {
      Note.findById(id)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  updateNote(note) {
    return new Promise((resolve, reject) => {
      note["updateDate"] = new Date();
      Note.findByIdAndUpdate(note["_id"], note)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
  deleteNote(id) {
    return new Promise((resolve, reject) => {
      Note.findByIdAndDelete(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
  // find note by a word from its title at least
  getNotesByTitle(noteTitle) {
    return new Promise((resolve, reject) => {
      const query = { title: { $regex: new RegExp(noteTitle, "i") } }; // ignore title letter sensitivity
      Note.find(query)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
}
module.exports = Database;
