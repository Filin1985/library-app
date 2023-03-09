import { createContext, useState, useEffect } from "react";
import {
  requestGet,
  requestPost,
  requestPut,
  requestDelete,
} from "../utils/request";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState([]);
  const [bookEdit, setBookEdit] = useState({
    item: {},
    edit: false,
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await requestGet("/api/books");

    setBook(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addBook = async (newBook) => {
    await requestPost(`/api/books`, { newBook });
    setBook([...book, newBook]);
    fetchProducts();
  };

  const deleteBook = async (id) => {
    if (window.confirm("Вы точно хотите удалить книгу из списка?")) {
      await requestDelete(`/api/books/${id}`);
      setBook(book.filter((book) => book.id !== id));
    }
    fetchProducts();
  };

  const editBook = (item) => {
    setBookEdit({
      item,
      edit: true,
    });
  };

  const updateBook = async (id, updItem) => {
    await requestPut(`/api/books/${id}`, updItem);
    fetchProducts();
  };

  return (
    <BookContext.Provider
      value={{
        book,
        bookEdit,
        isLoading,
        deleteBook,
        addBook,
        editBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
