const jwt = require("jsonwebtoken");
const User = require("../db/models/userModel");
const httpError = require("../helpers/httpError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401, "Unauthorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(httpError(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(httpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
