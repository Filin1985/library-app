import { CancelRounded, Edit } from "@material-ui/icons";
import React, { useState, useContext } from "react";
import Card from "./shared/Card";
import BookContext from "../context/BookContext";

const BookItem = ({ item, user }) => {
  const { deleteBook, editBook } = useContext(BookContext);
  return (
    <Card>
      <div className="card--num">{item.rating}</div>
      <button
        onClick={() => {
          deleteBook(item._id);
        }}
        className="close"
      >
        <CancelRounded />
      </button>
      <button onClick={() => editBook(item)} className="edit">
        <Edit />
      </button>
      <div className="card--title">
        <div className="card--name">{item.title}</div>
        <div className="card--page">Всего страниц: {item.pages}</div>
      </div>
      <hr />
      <div className="card--text">{item.text}</div>
    </Card>
  );
};

export default BookItem;
