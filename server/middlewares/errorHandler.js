const errorResponseHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const invalidPathHandler = (req, res, next) => {
  const error = new Error("Invalid Path");
  error.statusCode = 404;
  next(error);
};

export { errorResponseHandler, invalidPathHandler };
