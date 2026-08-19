const express = require("express");
const router = express.Router();

const reviewController = require("../controller/reviewController");
const {
  createReviewSchema,
  updateReviewSchema,
} = require("../validationSchema/reviewValidation");
const validationMiddleware = require("../middleware/validationMiddleware");

// Create Review
router.post(
  "/createReview",
   validationMiddleware(createReviewSchema),
  reviewController.createReview
);

// Get All Reviews
router.get(
  "/getReviews",
  reviewController.getReviews
);

// Get Single Review
router.get(
  "/getSingleReview",
  reviewController.getSingleReview
);

// Update Review
router.patch(
  "/updateReview",
   validationMiddleware(updateReviewSchema),
  reviewController.updateReview
);

// Delete Review
router.delete(
  "/deleteReview/:id",
  reviewController.deleteReview
);

module.exports = router;