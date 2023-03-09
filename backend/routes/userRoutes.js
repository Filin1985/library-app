const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const session = require("express-session");
const { generateToken } = require("../middleware/authMiddleware");

const User = require("../models/userModel");

// Register User
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists!");
    } else {
      const newUser = new User({
        name,
        email,
        password: hash,
      });
      await newUser.save();

      return res.json({
        result: true,
        token: await generateToken(newUser),
      });
    }
  })
);

// Get user profile
router.get(
  "/profile",
  asyncHandler(async (req, res) => {
    if (req.session.user._id) {
      res.send("You are allowd to view this");
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  })
);

// Auth user & get token
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401);
    }

    return res.json({
      result: true,
      token: await generateToken(user),
    });
  })
);

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;
