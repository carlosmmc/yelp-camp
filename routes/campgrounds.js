const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgroundsControl = require('../controllers/campgrounds')

const Campground = require('../models/campground')

router.route('/')
    .get(catchAsync(campgroundsControl.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgroundsControl.createCampground))

router.get('/new', isLoggedIn, campgroundsControl.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgroundsControl.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsControl.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundsControl.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsControl.renderEditForm))

module.exports = router
