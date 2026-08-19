const ReviewModel = require("../model/reviewModel");

const createReviewService = async (body) => {
  return await ReviewModel.create(body);
};

const getReviewsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const reviews = await ReviewModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await ReviewModel.countDocuments();

  return {
    total,
    page,
    limit,
    reviews
  };
};

const getSingleReviewService = async (id) => {
  return await ReviewModel.findById(id);
};

const updateReviewService = async (id, body) => {
  return await ReviewModel.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );
};

const deleteReviewService = async (id) => {
  return await ReviewModel.findByIdAndDelete(id);
};

module.exports = {
  createReviewService,
  getReviewsService,
  getSingleReviewService,
  updateReviewService,
  deleteReviewService
};