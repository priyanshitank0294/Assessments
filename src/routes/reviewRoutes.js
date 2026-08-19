const express = require("express");

const reviewController = require("../controller/reviewController");

const validationSchema = require("../validationSchema/reviewValidation");

const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();


// CREATE REVIEW
router.post(
  "/createReview",
  validationMiddleware(
    validationSchema.createReviewSchema,
    "body"
  ),
  reviewController.createReviewController
);


// GET REVIEWS
router.get(
  "/getReviews",
  validationMiddleware(
    validationSchema.getReviewSchema,
    "query"
  ),
  reviewController.getReviewsController
);


// UPDATE REVIEW
router.patch(
  "/updateReviews/:id",
  validationMiddleware(
    validationSchema.reviewIdSchema,
    "params"
  ),
  validationMiddleware(
    validationSchema.updateReviewSchema,
    "body"
  ),
  reviewController.updateReviews
);


// GET SINGLE REVIEW
router.get(
  "/getReviews/:id",
  validationMiddleware(
    validationSchema.reviewIdSchema,
    "params"
  ),
  reviewController.getReviewsById
);


// DELETE REVIEW
router.delete(
  "/deleteReviews/:id",
  validationMiddleware(
    validationSchema.reviewIdSchema,
    "params"
  ),
  reviewController.deleteReviews
);


// APPROVE REVIEW
router.patch(
  "/reviews/:id/approve",
  validationMiddleware(
    validationSchema.reviewIdSchema,
    "params"
  ),
  reviewController.statusApprove
);


module.exports = router;