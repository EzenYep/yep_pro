const express = require('express');
const myPageController = require('../controllers/myPageController.js');
const myPageRouter = express.Router();

myPageRouter.post('/get-review-list', myPageController.getReviewList);
myPageRouter.post('/deleteComment', myPageController.deleteComment);
myPageRouter.post('/getReservationStatus', myPageController.getReservationStatus);
myPageRouter.post('/cancelReservations', myPageController.cancelReservations);
myPageRouter.post("/mypages/recent_movie", myPageController.getRecentMovie);
myPageRouter.post('/updateComment', myPageController.updateComment);

module.exports = myPageRouter;