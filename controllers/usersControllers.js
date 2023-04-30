const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../db/models/userModel");
const httpError = require("../helpers/httpError");
require("dotenv").config();

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    next(httpError(409, "Conflict"));
    return;
  }

  const avatar = gravatar.url(email);

  const newUser = new User({ ...req.body, avatar });

  await newUser.hashPassword(password);

  const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
  newUser.token = token;

  newUser.save();
  res.status(201).json({ user: newUser, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    next(httpError(401, "Unathorized"));
    return;
  }

  const result = await existingUser.comparePassword(password);

  if (!result) {
    next(httpError(401, "Email or password is wrong"));
    return;
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);

  const user = await User.findOneAndUpdate(
    { _id: existingUser._id },
    { token },
    { new: true }
  );

  res.status(201).json({ user, token: user.token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const current = async (req, res) => {
  const { name, email, password } = req.user;
  res.status(200).json({ name, email, password });
};

module.exports = {
  signup,
  login,
  logout,
  current,
};
