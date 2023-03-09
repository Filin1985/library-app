const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Fetch all books
router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.user);
    const _id = req.user._id;

    const booksRaw = await Book.find({ user: _id });
    res.json(booksRaw);
  })
);

//  Save new Book
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { newBook } = req.body;

    const books = await Book.find({});
    if (
      books.find((book) => {
        book.title === newBook.title;
      })
    ) {
      return res.send("Такая книга уже есть");
    } else {
      const newItem = new Book({
        title: newBook.title,
        pages: newBook.pages,
        languages: newBook.languages,
        text: newBook.text,
        rating: newBook.rating,
      });
      newItem.set({ user: _id });
      await newItem.save();
    }

    return res.send(`Книга ${data.title} сохранена`);
  })
);

// Edit information about a book
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { title, pages, languages, text, rating } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id);

    if (book) {
      book.title = req.body.title || book.title;
      book.pages = req.body.pages || book.pages;
      book.languages = req.body.languages || book.languages;
      book.text = req.body.text || book.text;
      book.rating = req.body.rating || book.rating;

      const updateBook = await book.save();

      res.json({
        _id: updateBook._id,
        title: updateBook.title,
        pages: updateBook.pages,
        languages: updateBook.languages,
        text: updateBook.text,
        rating: updateBook.rating,
      });
    }
  })
);

// Delete a book
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.send("Book does not exist!");
    }

    return res.send(`Книга ${book.title} удалена`);
  })
);

module.exports = router;
