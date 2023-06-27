const db = require("../models");
const Member = db.members;
const axios = require('axios');
const Category = db.categorys;
const searchMovies = async (req, res) => {
    const movieNm = req.query.movieNm;
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


module.exports={
    searchMovies,
    category
}
