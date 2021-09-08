const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const userControl = require('../controllers/users')

router.route('/register')
    .get(userControl.renderRegister)
    .post(catchAsync(userControl.register))

router.route('/login')
    .get(userControl.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userControl.login)

router.get('/logout', userControl.logout)

module.exports = router