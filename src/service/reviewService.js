const ReviewModel = require("../model");

const {
  notFound,
  conflict,
} = require("../utils/apiError");

const createReviewService = async (data) => {
  const { title, comment, rating, reviewerName } = data;

  const alreadyReviewed = await ReviewModel.findOne({
    reviewerName,
    title,
  });

  if (alreadyReviewed) {
    throw conflict("You already reviewed it");
  }

  const review = await ReviewModel.create({
    title,
    comment,
    rating,
    reviewerName,
  });

  return review;
};

const getReviewsService = async (data) => {
  const {
    status,
    page = 1,
    limit = 10,
  } = data;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  const reviews = await ReviewModel.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return reviews;
};

const getReviewId = async (id) => {
  const review = await ReviewModel.findById(id);

  if (!review) {
    throw notFound("Review not found");
  }

  return review;
};

const deleteReviews = async (id) => {
  const reviewDelete = await ReviewModel.findByIdAndDelete(id);

  if (!reviewDelete) {
    throw notFound("Review not found");
  }

  return reviewDelete;
};

const updateReviews = async (data, id) => {
  const review = await ReviewModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!review) {
    throw notFound("Review not found");
  }

  return review;
};

const statusApprove = async (id) => {
  const review = await ReviewModel.findById(id);

  if (!review) {
    throw notFound("Review not found");
  }

  if (review.status === "approved") {
    throw conflict("Status is already approved");
  }

  review.status = "approved";

  await review.save();

  return review;
};

module.exports = {
  createReviewService,
  getReviewsService,
  getReviewId,
  deleteReviews,
  updateReviews,
  statusApprove,
};