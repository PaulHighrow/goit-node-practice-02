const express = require("express");
const validateUser = require("../middlewares/userValidate");
const {
  signup,
  login,
  logout,
  current,
} = require("../controllers/usersControllers");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/signup", validateUser, signup);

router.post("/login", login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

module.exports = router;
