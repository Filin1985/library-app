import { motion, AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import BookItem from "./BookItem";
import Spinner from "./shared/Spinner";
import BookContext from "../context/BookContext";

const BookItemList = () => {
  const { book, isLoading } = useContext(BookContext);

  if (!isLoading && (!book || book.length === 0)) {
    return <p>Данные загружаются...</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="book--list">
      <AnimatePresence>
        {book.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BookItem key={item._id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BookItemList;
