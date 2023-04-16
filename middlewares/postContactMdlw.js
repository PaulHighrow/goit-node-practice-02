const Joi = require("joi");
const httpError = require("../helpers/httpError");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  number: Joi.string().min(3).required(),
});

const validateAddContact = (req, __, next) => {
  const { error } = addContactSchema.validate(req.body);
  console.log(error);
  if (error) {
    return next(httpError(400, error.message));
  }
  next();
};

module.exports = validateAddContact;
