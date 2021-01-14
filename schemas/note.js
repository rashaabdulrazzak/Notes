const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, required: true },
  updateDate: { type: Date, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
