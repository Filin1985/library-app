import React, { useContext, useState, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";
import BookContext from "../context/BookContext";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    pages: 0,
    languages: "Русский",
    text: "",
  });
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addBook, bookEdit, updateBook } = useContext(BookContext);

  useEffect(() => {
    if (bookEdit.edit === true) {
      setBtnDisabled(false);
      setBook({
        title: bookEdit.item.title,
        pages: bookEdit.item.pages,
        languages: bookEdit.item.languages,
        text: bookEdit.item.text,
      });
    }
  }, [bookEdit]);

  const handleChange = (event) => {
    const isEmpty = Object.values(book).some(
      (item) => item === 0 || item === ""
    );

    if (isEmpty) {
      setMessage("Надо заполнить все данные");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    const { name, value } = event.target;
    setBook((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(book).some(
      (item) => item === 0 || item === ""
    );
    if (!isEmpty) {
      const newBook = {
        title: book.title,
        pages: +book.pages,
        languages: book.languages,
        text: book.text,
        rating,
      };

      if (bookEdit.edit === true) {
        updateBook(bookEdit.item._id, newBook);
      } else {
        addBook(newBook);
      }

      setBook({
        title: "",
        pages: 0,
        languages: "Русский",
        text: "",
      });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Оцени прочитанную тобой книгу</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="form-group">
          <div className="form-item">
            <label htmlFor="title">Какую книгу ты прочитал?</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={book.title}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="language">На каком языке ты читал книгу?</label>
            <select
              name="languages"
              id="languages"
              value={book.languages}
              onChange={handleChange}
              required
            >
              <option value="Русский">Русский</option>
              <option value="Английский">Английский</option>
              <option value="Испанский">Испанский</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="pages">Количесвто прочитанных страниц</label>
            <input
              type="number"
              name="pages"
              id="pages"
              value={book.pages}
              onChange={handleChange}
              min={0}
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="bookName">Напиши краткий отзыв о книге</label>
            <input
              type="text"
              name="text"
              id="text"
              onChange={handleChange}
              value={book.text}
              required
            />
          </div>
          <Button type="submit" version="secondary" isDisabled={btnDisabled}>
            Сохранить
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default BookForm;
