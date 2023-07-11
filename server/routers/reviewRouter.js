const express = require('express');
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router();

reviewRouter.post("/review/commentCreate",reviewController.commentCreate)
reviewRouter.post("/review/commentInfo",reviewController.comment_info)
reviewRouter.post("/report/report_comment",reviewController.report_comment)
module.exports = reviewRouter;