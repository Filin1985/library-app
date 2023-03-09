import React from "react";
import { useParams } from "react-router-dom";

const BookInfo = () => {
  const params = useParams;

  return <div>Book {params.id}</div>;
};

export default BookInfo;
