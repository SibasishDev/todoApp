const errorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    if (err.name === 'ValidationError') {
      // const message = Object.values(err.errors).map(val => val.message);
      const message = `${err.message}`;
      error = new errorResponse(message, 400);
    }
    // JWT Token Expired Error
    if (err.name === 'TokenExpiredError') {
      const message = `${err.message}`;
      error = new errorResponse(message, 403);
    }
    // JWT Token Authorization Error
    if (err.name === 'AuthorizationError') {
      const message = `${err.message}`;
      error = new errorResponse(message, 401);
    }
    // MySQL Parse error
    // if (err.code === 'ER_PARSE_ERROR') {
    //     const message = `${err.name}: ${err.message}`;
    //     error = new ErrorResponse(message, 500);
    // }
  
    res.status(error.code || 500).json({
      code: error.code || 500,
      error: err.name || 'Server Error',
      message: error.message
    });
  };

  module.exports = errorHandler;
  