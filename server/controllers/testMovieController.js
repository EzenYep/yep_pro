const db = require("../models");
const Member = db.members;
const axios = require('axios');

const searchMovies = async (req, res) => {
    const movieNm = req.query.movieNm;
    // aaaaaaasadasd
    try {
        const response = await axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json', {
            params: {
                key: 'c7b8e13ad2c21601d786901a6dd853a1',
                movieNm: movieNm
            }
        });
        res.data(response.data);
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

module.exports={
    searchMovies
}