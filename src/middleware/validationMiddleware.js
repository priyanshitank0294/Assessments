const { badRequest } = require("../utils/apiError");

const validationMiddleware = (schema, source = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(
        badRequest(
          "Validation failed",
          error.details.map((e) => e.message)
        )
      );
    }

    req[source] = value;

    next();
  };
};

module.exports = validationMiddleware;