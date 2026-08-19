const joi = require("joi");

const createReviewSchema = joi.object({
  title: joi.string().trim().min(3).max(80).required(),

  comment: joi.string().trim().min(10).max(500).required(),

  rating: joi.number().min(1).max(5).required(),

  reviewerName: joi.string().trim().min(2).max(50).required(),
  
});

const getReviewSchema = joi.object({
  status: joi.string()
    .valid("pending", "approved", "rejected")
    .optional(),

  minRating: joi.number()
    .min(1)
    .max(5)
    .optional(),

  maxRating: joi.number()
    .min(1)
    .max(5)
    .when("minRating", {
      is: joi.exist(),
      then: joi.number().greater(joi.ref("minRating")),
    })
    .optional(),

  page: joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: joi.number()
    .integer()
    .min(1)
    .max(20)
    .default(10),
});

const reviewIdSchema = joi.object({
  id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "Review ID is required",
      "string.length": "Review ID must be 24 characters",
      "string.hex": "Review ID must be a valid MongoDB ObjectId",
      "any.required": "Review ID is required",
    }),
});

const updateReviewSchema = joi.object({
  title: joi.string()
    .trim()
    .min(3)
    .max(80)
    .optional(),

  comment: joi.string()
    .trim()
    .min(1)
    .max(500)
    .optional(),

  rating: joi.number()
    .integer()
    .min(1)
    .max(5)
    .optional(),

  status: joi.string()
    .valid("pending", "approved", "rejected")
    .optional(),
})
.min(1)
.messages({
  "object.min": "At least one field is required for update",
});

module.exports = {
  createReviewSchema,
  getReviewSchema,
  reviewIdSchema,
  updateReviewSchema,
};