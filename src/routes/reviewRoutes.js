const express = require("express");

const reviewController = require("../controller/reviewController");
const validationSchema = require("../validationSchema/reviewValidation");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/createReview",
  validationMiddleware(validationSchema.createReviewSchema),
  reviewController.reviewController
);

router.get(
  "/getReviews",
  validationMiddleware(validationSchema.getReviewSchema),
  reviewController.getReviewsController
);

router.patch(
  "/updateReviews/:id",
  validationMiddleware(validationSchema.updateReviewSchema),
  reviewController.updateReviews
);

router.get(
  "/getReviews/:id",
  validationMiddleware(validationSchema.reviewIdSchema),
  reviewController.getReviewsById
);

router.delete(
  "/deleteReviews/:id",
  validationMiddleware(validationSchema.reviewIdSchema),
  reviewController.deleteReviews
);

router.patch(
  "/reviews/:id/approve",
  validationMiddleware(validationSchema.reviewIdSchema),
  reviewController.statusApprove
);

module.exports = router;