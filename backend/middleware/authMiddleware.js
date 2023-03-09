const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET = "kjsdsioeufgqiwuefiqwuh";

function verifyToken(token) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, SECRET, (err, res) => (err ? reject(err) : resolve(res)))
  );
}

function generateToken(user) {
  return new Promise((resolve, reject) =>
    jwt.sign(
      { userId: user._id },
      SECRET,
      { expiresIn: "60 days" },
      (err, res) => (err ? reject(err) : resolve(res))
    )
  );
}

async function authMiddleware(req, res, next) {
  req.user = null;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return next();
  }

  try {
    // result.userId = 'id'
    const result = await verifyToken(token);

    req.user = await User.findById(result.userId);
  } catch (error) {
    return next();
  }

  return next();
}

module.exports = {
  generateToken,
  authMiddleware,
};
