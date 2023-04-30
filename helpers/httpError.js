const errorMessages = {
  400: "Bad request",
  409: "Conflict",
};
const httpError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = httpError;
