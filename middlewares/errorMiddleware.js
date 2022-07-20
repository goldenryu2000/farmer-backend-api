const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // If there is a status code then that or 500(server error)
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  errorHandler,
};
