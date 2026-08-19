const Joi = require("joi");

const createReviewSchema = Joi.object({
  reviewerName: Joi.string().trim().required()
    ,

  rating: Joi.number().min(1).max(5).required()
  ,

  comment: Joi.string().trim().required()
  
});

const updateReviewSchema = Joi.object({
  reviewerName: Joi.string().trim(),

  rating: Joi.number().min(1).max(5),

  comment: Joi.string().trim()
});

module.exports = {
  createReviewSchema,
  updateReviewSchema
};