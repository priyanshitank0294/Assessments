const mongoose = require("mongoose");
const reviewService = require("../service/reviewService");

const {
  badRequest,
  notFound,
  conflict,
} = require("../utils/apiError");

const createReviewController = async (req, res, next) => {
  try {
    const { title, comment, rating, reviewerName } = req.body;

    const   review  =
      await reviewService.createReviewService({
        title,
        comment,
        rating,
        reviewerName,
      });

    if (alreadyReviewed) {
      throw conflict("You already reviewed it");
    }

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

const getReviewsController = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviewsService(req.query);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

const getReviewsById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      throw badRequest("Invalid review id");
    }

    const review = await reviewService.getReviewId(id);

    if (!review) {
      throw notFound("Review not found");
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

const deleteReviews = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      throw badRequest("Invalid review id");
    }

    const { reviewExist, reviewDelete } =
      await reviewService.deleteReviews(id);

    if (!reviewExist) {
      throw notFound("Review not found");
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: reviewDelete,
    });
  } catch (err) {
    next(err);
  }
};

const updateReviews = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      throw badRequest("Invalid review id");
    }

    const { reviewExist, updateProduct } =
      await reviewService.updateReviews(req.body, id);

    if (!reviewExist) {
      throw notFound("Review not found");
    }

    res.status(200).json({
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    next(err);
  }
};

const statusApprove = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      throw badRequest("Invalid review id");
    }

    const review = await reviewService.statusApprove(id);

    if (!review) {
      throw notFound("Review not found");
    }

    res.status(200).json({
      success: true,
      message: "Status set to approved",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReviewController,
  getReviewsController,
  getReviewsById,
  deleteReviews,
  updateReviews,
  statusApprove,
};