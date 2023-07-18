const express = require('express'); 
const adminCorrectionContoller = require("../controllers/adminCorrectionContoller.js");
const adminCorrectionRouter = express.Router();



adminCorrectionRouter.get("/getMovieList", adminCorrectionContoller.getMovieList);
adminCorrectionRouter.post('/manager_correction', adminCorrectionContoller.deleteMovies);
adminCorrectionRouter.post('/getUpdateMovie',adminCorrectionContoller.updateMovie)
adminCorrectionRouter.post('/getUpdateRouter',adminCorrectionContoller.updateComment)
module.exports = adminCorrectionRouter;