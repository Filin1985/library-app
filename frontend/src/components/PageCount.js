import React, { useContext } from "react";
import BookContext from "../context/BookContext";

const PageCount = () => {
  const { book } = useContext(BookContext);

  let totalPages = book.reduce((acc, cur) => {
    return acc + cur.pages;
  }, 0);

  return (
    <div className="page-stats">
      <h4>Всего прочитано книг {book.length}</h4>
      <h4>Общее количество страниц {isNaN(totalPages) ? 0 : totalPages}</h4>
    </div>
  );
};

export default PageCount;
