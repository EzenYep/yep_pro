const db = require("../models");
const ScreeningPeriod = db.screening_periods;
const Movie = db.movies;

const { QueryTypes } = require("sequelize");
const sequelize = require("sequelize");

const getMovieList = async (req, res) => {
    try {
        const query = `
        SELECT m.movie_id, m.movie_title, m.movie_state, sp.start_date, sp.end_date
        FROM movie m
        JOIN screening_period sp ON m.movie_id = sp.movie_id;
      `;

        const movieList = await db.sequelize.query(query, {
            type: QueryTypes.SELECT
        });
          console.log(movieList)
          
        res.status(200).json(movieList);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "서버 오류" });
    

    }
};

const deleteMovies = async (req, res) => {
    const values = req.body.values;
    console.log(values);
    try {
        // 영화 삭제
        await Movie.destroy({ where: { movie_title: values } });


        console.log('영화 삭제 성공');
        return res.status(200).json({ message: '영화 삭제 성공' });
    } catch (error) {
        console.error('영화 삭제 실패:', error);
        return res.status(500).json({ message: '회원 삭제 실패' });
    }
};
const updateMovie = async (req, res) => {
    try {
        // 수정할 필드와 값을 요청에서 가져옵니다.
        const { movie_title, movie_state, start_date, end_date,movie_id } = req.body;

        // 데이터베이스에서 해당 영화를 조회합니다.
        const movie = await Movie.findOne({ where: { movie_id: movie_id } });
        if (!movie) {
            return res.status(404).json({ error: '영화를 찾을 수 없습니다.' });
        }

        // 필드를 수정합니다.
        movie.movie_title = movie_title;
        movie.movie_state = movie_state;

        // 영화와 연결된 screening_period도 수정합니다.
        const screeningPeriod = await ScreeningPeriod.findOne({ where: { movie_id: movie_id } });
        if (screeningPeriod) {
            screeningPeriod.start_date = start_date;
            screeningPeriod.end_date = end_date;
            await screeningPeriod.save();
        }

        // 수정된 영화 정보와 screening_period를 저장합니다.
        await Promise.all([movie.save(), screeningPeriod.save()]);

        return res.status(200).json({ message: '영화 정보가 수정되었습니다.' });
    } catch (error) {
        console.error('영화 정보 수정 실패:', error);
        return res.status(500).json({ error: '서버 오류' });
    }
};

const updateComment = async (req, res) => {
    try {
        // 수정할 필드와 값을 요청에서 가져옵니다.
        const { starkit, comment, review_id } = req.body;

        // 데이터베이스에서 해당 리뷰를 조회합니다.
        const review = await Review.findOne({ where: { review_id: req.body.review_id } }); // review_id를 기준으로 리뷰를 조회하도록 수정

        if (!review) {
            return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
        } else {
            // 필드를 수정합니다.
            review.comment = comment;
            review.starkit = starkit;
            review.review_id = review_id;

            // 수정된 리뷰 정보를 저장합니다.
            await review.save();

            return res.status(200).json({ message: '리뷰 정보가 수정되었습니다.' });
        }
    } catch (error) {
        console.error('리뷰 정보 수정 실패:', error);
        return res.status(500).json({ error: '서버 오류' });
    }
};

module.exports = {
    getMovieList,
    deleteMovies,
    updateMovie,
    updateComment
};
