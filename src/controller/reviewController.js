const reviewService = require("../service/reviewService");

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReviewService(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsService(req.query);

    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const review = await reviewService.getSingleReviewService(req.query.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReviewService(
      req.query.id,
      req.body
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await reviewService.deleteReviewService(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview
};