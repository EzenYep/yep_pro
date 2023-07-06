const express = require('express');
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router();

reviewRouter.post("/review/commentCreate",reviewController.commentCreate)

module.exports = reviewRouter;