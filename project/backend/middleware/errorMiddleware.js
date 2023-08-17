const notFound = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
};

const errorHandler = (err, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   const message = err.message;

   if (err.name === "CastError" && err.kind === "ObjectId") {
      message = "Invalid product id";
      statusCode = 404;
   }
   res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
   });
};

export { notFound, errorHandler };
