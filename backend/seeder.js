const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookData = require("./data/BookData");
const users = require("./data/userData");
const User = require("./models/userModel");
const Book = require("./models/bookModel");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;

    const sampleBooks = bookData.map((book) => {
      return { ...book, user: adminUser };
    });

    await Book.insertMany(sampleBooks);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
