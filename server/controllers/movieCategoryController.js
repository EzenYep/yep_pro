const db = require("../models");
const Movie = db.movies;
const MovieCategory = db.movie_categorys;
const Category = db.categorys;
const File = db.files;
const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const axios = require("axios");

const getMoviePostersByCategory = async (req, res) => {
  const { category } = req.query; // req.params가 아니라 req.query로 변경

  try {
    const movies = await db.sequelize.query(
      'SELECT movie.movie_title,movie.movie_id, file.poster_url, category.category_name ' +
      'FROM movie ' +
      'INNER JOIN movie_category ON movie.movie_id = movie_category.movie_id ' +
      'INNER JOIN category ON category.category_id = movie_category.category_id ' +
      'INNER JOIN file ON file.movie_id = movie.movie_id ' +
      'WHERE category.category_id = :category',
      {
        type: QueryTypes.SELECT,
        replacements: { category },
      }
    );

    console.log(movies);

    // 객체 형태로 데이터를 구조화
    const getMoviePostersByCategory = {};
    movies.forEach((movie) => {
      const category = movie.category_name;
      if (!getMoviePostersByCategory[category]) {
        getMoviePostersByCategory[category] = [];
      }
      getMoviePostersByCategory[category].push({
        movie_title: movie.movie_title,
        poster_url: movie.poster_url,
        movie_id: movie.movie_id
      });
    });

    res.json(getMoviePostersByCategory);
  } catch (error) {
    console.error("Error retrieving movie posters by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
  
module.exports = { getMoviePostersByCategory };

