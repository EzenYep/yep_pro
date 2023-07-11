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


module.exports = {
    getMovieList,
    deleteMovies
   
};
