const Joi = require("joi");
const httpError = require("../helpers/httpError");

const addUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
  avatar: Joi.string(),
});

const validateUser = (req, __, next) => {
  const { error } = addUserSchema.validate(req.body);
  if (error) {
    return next(httpError(400, error.message));
  }
  next();
};

module.exports = validateUser;
