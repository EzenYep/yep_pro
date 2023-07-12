const express = require('express');
const adminReportRouter = express.Router();

const adminReportController = require("../controllers/adminReportController.js");

adminReportRouter.get('/getReportDetails', adminReportController.getReportDetails);
adminReportRouter.post('/deleteReport', adminReportController.deleteReportUsers);
adminReportRouter.post('/deleteComment', adminReportController.deleteComment);

module.exports = adminReportRouter;