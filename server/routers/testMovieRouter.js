const express = require('express');
const movieController = require('../controllers/testMovieController');
const movieRouter = express.Router();

movieRouter.post('/search-movies-api', movieController.searchMovies);//api를 통해 영화의 정보를 가져오는 라우터
movieRouter.post('/movie/movie_input',movieController.movie_input)//영화 추가 기능 라우터
movieRouter.get('/movie/category', movieController.category);//movieinputview의 카테고리를 가져오기 위한 라우터
movieRouter.get("/movie/trailer_url",movieController.movie_url);//메인페이지의 유튜브 영상의 링크를 띄우기 위한 정보를 가져오는 라우터
movieRouter.get("/movie/screening_poster_url",movieController.getScreeningMoviePosters);//메인페이지의 무비차트의 데이터를 가져오기 위한 라우터
movieRouter.get("/movie/non_screening_poster_url",movieController.getNonScreeningMoviePosters);//메인페이지의 상영 예정작을 가져오기 위해 넣은 라우터
movieRouter.post("/movie/movie_info_data",movieController.movie_info);//movieinfoview 페이지의 정보를 가져오기 위한 라우터


module.exports = movieRouter;