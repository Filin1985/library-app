const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  languages: {
    type: String,
    enum: ["Русский", "Английский", "Испанский"],
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
