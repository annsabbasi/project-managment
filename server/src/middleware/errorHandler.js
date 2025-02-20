/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    const stack = process.env.NODE_ENV === "development" ? err.stack : null;

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
        stack,
    });
    next();
};

export default errorHandler;
