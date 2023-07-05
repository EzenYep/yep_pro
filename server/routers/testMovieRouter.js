const express = require('express');
const movieController = require('../controllers/testMovieController');
const movieRouter = express.Router();

movieRouter.post('/search-movies-api', movieController.searchMovies);
movieRouter.post('/movie/movie_input',movieController.movie_input)
movieRouter.get('/movie/category', movieController.category);
movieRouter.get("/movie/trailer_url",movieController.movie_url);
movieRouter.get("/movie/screening_poster_url",movieController.getScreeningMoviePosters);
movieRouter.get("/movie/non_screening_poster_url",movieController.getNonScreeningMoviePosters);


module.exports = movieRouter;