const express = require('express');
const movieController = require('../controllers/testMovieController');
const movieRouter = express.Router();

movieRouter.get('/search-movies', movieController.searchMovies);
movieRouter.get('/movie/category', movieController.category);

module.exports = movieRouter;