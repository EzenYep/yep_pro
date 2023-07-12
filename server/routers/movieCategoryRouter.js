const CategoryController = require("../controllers/movieCategoryController");

const CategoryRouter = require("express").Router();


// 카테고리별 영화 포스터와 영화 제목 출력
CategoryRouter.get("/movies/movie_category", CategoryController.getMoviePostersByCategory);

module.exports = CategoryRouter;