const db = require("../models");
const Movie = db.movies;
const axios = require('axios');
const {QueryTypes} = require("sequelize");
const sequelize = require("sequelize");
const MovieCategory = db.movie_categorus
const File = db.files;
const ScreeningPeriod = db.screening_periods;
const Category = db.categorys
/*const NAVER_CLIENT_ID = 'A4rSDLRe1A8hSR2m7kYc'; // 네이버 API 클라이언트 ID
const NAVER_CLIENT_SECRET = 'xQh6ziwNgJ'; // 네이버 API 클라이언트 Secret*/
//const KOBIS_KEY = 'c7b8e13ad2c21601d786901a6dd853a1';//영화 진흥 위원회 api키

const tbms = 'e5207b9837ddd2e008cf31f09c468dda';

const searchMovies = async (req, res) => {
    const movieNm = req.body.movieNm; // 검색할 영화의 이름
    console.log(`영화 검색: ${movieNm}`);
    try {
        // 먼저, 영화의 이름으로 검색하여 영화 코드를 얻음
        const searchResponse = await axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                query: movieNm,
                api_key: tbms, // TMDB API 키
            },
        });

        // 검색 결과가 없으면 오류 반환
        if (searchResponse.data.results.length === 0) {
            return res.status(404).json({ error: "영화를 찾을 수 없음" });
        }

        const movieId = searchResponse.data.results[0].id; // 가정: 검색된 첫 번째 영화의 ID를 사용

        const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: tbms, // TMDB API 키
                append_to_response: "credits,videos", // 출연진, 제작진 정보와 동영상 정보를 포함
            },
        });

        const releaseDate = detailsResponse.data.release_date; // 상영일
        const directors = detailsResponse.data.credits.crew.filter((member) => member.job === "Director"); // 감독 이름만 분리
        const posterPath = detailsResponse.data.poster_path; // 포스터 경로
        const videoPath = detailsResponse.data.videos.results.length > 0 ? detailsResponse.data.videos.results[0].key : null; // 동영상 경로

        // poster_path와 video_path는 상대 경로이므로, 절대 경로로 변환
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const videoUrl = videoPath ? `https://www.youtube.com/watch?v=${videoPath}` : null; // YouTube 링크

        console.log(`Release date: ${releaseDate}`);
        console.log(`Directors: ${directors.map((director) => director.name).join(", ")}`);
        console.log(`Poster URL: ${posterUrl}`);
        console.log(`Video URL: ${videoUrl}`);

        res.send({
            releaseDate: releaseDate,
            directors: directors.map((director) => director.name),
            posterUrl: posterUrl,
            videoUrl: videoUrl,
        });
    } catch (error) {
        console.error("영화 검색 실패:", error);
        res.status(500).json({ error: "영화 검색 실패" });
    }
};

const movie_input = async (req, res) => {
    try {
        let info = {
            movie_title: req.body.movieNm,
            director: req.body.director.join(", "),
            postUrl: req.body.postUrl,
            videoUrl: req.body.videoUrl,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            ageRating: parseInt(req.body.ageRating),
            movie_description: req.body.movieDescription,
            price: parseInt(req.body.price),
            selecteGenre1: req.body.selectedGenre1,
            selecteGenre2: req.body.selectedGenre2,
            selecteGenre3: req.body.selectedGenre3,
        };

        console.log("확인");
        console.log(info);

        const newMovie = await Movie.create({
            movie_title: info.movie_title,
            movie_state: info.startDate > new Date() ? 1 : 2,
            movie_description: info.movie_description,
            age_rating: info.ageRating,
            director: info.director,
            price: info.price
        });

        const movie_id = newMovie.movie_id;
        console.log("oo   " + movie_id + "dd");


        // 카테고리를 찾는 함수를 별도로 정의
        const findCategory = async (categoryName) => {
            const category = await Category.findOne({where: {category_name: categoryName}});
            if (!category) {
                console.log(`Category ${categoryName} not found`);
                return null;
            }
            return category;
        };

        // 각 장르가 있는지 확인하고 있으면 카테고리를 찾아 MovieCategory를 생성
        const genres = [info.selecteGenre1, info.selecteGenre2, info.selecteGenre3];
        for (let genre of genres) {
            if (genre) { // 장르가 존재하면
                const category = await findCategory(genre);
                if (category) { // 카테고리가 존재하면
                    await MovieCategory.create({
                        category_id: category.category_id,
                        movie_id: movie_id
                    });
                }
            }
        }

        if (newMovie) {
            await File.create({
                poster_url: info.postUrl,
                trailer_url: info.videoUrl,
                movie_id: movie_id
            });

            const startDate = new Date(info.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            const endDate = new Date(info.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));

            await ScreeningPeriod.create({
                period_id: null,
                start_date: startDate,
                end_date: endDate,
                movie_id: movie_id
            });

            res.send({code: 200});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({code: 500, message: error.message});
    }
};
const movie_url = async (req, res) => {
    try {
        const count = await File.count();
        const randomIndex = Math.floor(Math.random() * count);
        const movie_video = await File.findOne({ raw: true, offset: randomIndex });
        let trailer_url = movie_video.trailer_url;

        // trailer_url이 null인 경우 대체 URL로 설정합니다.
        if (!trailer_url) {
            trailer_url = 'https://www.youtube.com/watch?v=MvPaDziB-ac'; // 대체 URL을 여기에 입력합니다.
        }

        res.send({ trailer_url });
    } catch (error) {
        console.error(error);
        res.status(500).send({ code: 500, message: error.message });
    }
};
const getScreeningMoviePosters = async (req,res) => {
    try {
        const movies = await db.sequelize.query(
            'SELECT movie.movie_id, movie.movie_title, file.poster_url FROM movie ' +
            'INNER JOIN file ON movie.movie_id = file.movie_id ' +
            'WHERE movie.movie_state = 1',
            {
                type: QueryTypes.SELECT,
            }
        );

        const posters = movies.map((movie) => {
            return {
                movie_id: movie.movie_id,
                movie_title: movie.movie_title,
                poster_url:  movie.poster_url
            };
        });
        console.log(posters)
        res.send({posters});
    } catch (error) {
        console.error('Error retrieving screening movie posters:', error);
        throw error;
    }
};
const getNonScreeningMoviePosters = async (req,res) => {
    try {
        const non_movies = await db.sequelize.query(
            'SELECT movie.movie_id, movie.movie_title, file.poster_url FROM movie ' +
            'INNER JOIN file ON movie.movie_id = file.movie_id ' +
            'WHERE movie.movie_state = 2',
            {
                type: QueryTypes.SELECT,
            }
        );

        const non_posters = non_movies.map((movie) => {
            return {
                non_movie_id: movie.movie_id,
                non_movie_title: movie.movie_title,
                non_poster_url:  movie.poster_url
            };
        });
        console.log(non_posters);
        res.send({non_posters});
    } catch (error) {
        console.error('Error retrieving screening movie posters:', error);
        throw error;
    }
};
const category = async (req, res) => {
    const categories = await Category.findAll({raw: true})
    if (categories) {
        const categoryNames = categories.map(category => category.category_name);
        console.log(categoryNames)
        res.send(categoryNames);
    } else {
        res.status(404).send({message: 'No categories found.'});
    }
}
const movie_info = async (req, res) => {

    try {
        const query = `
            SELECT m.*, f.*, c.category_name, sp.start_date
            FROM movie AS m
                     INNER JOIN file AS f ON m.movie_id = f.movie_id
                     INNER JOIN movie_category AS mc ON m.movie_id = mc.movie_id
                     INNER JOIN category AS c ON mc.category_id = c.category_id
                     INNER JOIN screening_period AS sp ON m.movie_id = sp.movie_id
            WHERE m.movie_id = :movieId
        `;
        const replacements = { movieId: req.body.id };

        const [movie_info_data, _] = await db.sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT
        });

        // movie_info_data를 원하는 방식으로 처리하거나 응답으로 전송합니다.

        res.status(200).json(movie_info_data);
    } catch (error) {
        console.error("영화 정보를 가져오는 중에 오류가 발생했습니다:", error);
        res.status(500).json({ error: "영화 정보를 가져오는 중에 오류가 발생했습니다." });
    }
};




const searchmovie = async (req, res) => {
    const { movie_title } = req.body;
    // console.log(movie_title);
  
    try {
      const searchResults = await db.sequelize.query(
        `SELECT movie.movie_title, file.poster_url, movie.movie_id
         FROM movie
         INNER JOIN file ON movie.movie_id = file.movie_id
         WHERE movie.movie_title LIKE :movie_title AND movie.movie_state = 1`,
        {
          type: QueryTypes.SELECT,
          replacements: { movie_title: `%${movie_title}%` },
          raw:true
        }
      );

      const searchResults2 = await db.sequelize.query(
        `SELECT movie.movie_title, file.poster_url, movie.movie_id
         FROM movie
         INNER JOIN file ON movie.movie_id = file.movie_id
         WHERE movie.movie_title LIKE :movie_title AND (movie.movie_state = 0 OR movie.movie_state = 2)`,
        {
          type: QueryTypes.SELECT,
          replacements: { movie_title: `%${movie_title}%` },
          raw:true
        }
      );

      const movies = {
        searchResults,
        searchResults2,
      };
      console.log(movies);
  
      if (movies) {
        res.status(200).send(movies);
      } else {
        res.status(401).send({ code: 401, message: '입력하신 정보와 일치하는 영화가 없습니다.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  };

module.exports = {
    searchMovies,
    category,
    movie_input,
    movie_url,
    getScreeningMoviePosters,
    getNonScreeningMoviePosters,
    searchmovie,
    movie_info
}
