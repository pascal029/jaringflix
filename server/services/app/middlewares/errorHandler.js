const errorHandler = (err, req, res, next) => {
  let error = `Internal Server Error`;
  let code = 500;
  if (err.name == "invalid_input") {
    error = `Email and password are required`;
    code = 400;
  } else if (err.name == "invalid_credential") {
    error = "Incorrect email or password";
    code = 400;
  } else if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    error = err.errors[0].message;
    code = 400;
  } else if (err.name == "SequelizeForeignKeyConstraintError") {
    error = "Genre is used by some movie";
    code = 401;
  } else if (err.name == "data_not_found") {
    error = `Movie not found`;
    code = 404;
  } else if (err.name == "fail_edit_movie") {
    error = `Fail to edit movie`;
  } else if (err.name == "fail_destroy_movie") {
    error = `Fail to delete movie`;
  }
  res.status(code).json({ msg: error });
};

module.exports = errorHandler;
