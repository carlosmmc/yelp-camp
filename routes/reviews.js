const express = require('express')
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')
const { reviewSchema } = require('../schemas.js')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const reviewControl = require('../controllers/reviews')

router.post('/', isLoggedIn, validateReview, catchAsync(reviewControl.createReview))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewControl.deleteReview))

module.exports = router