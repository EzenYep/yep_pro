const db = require("../models");
const Member = db.members;
const axios = require('axios');
const Category = db.categorys;
/*const NAVER_CLIENT_ID = 'A4rSDLRe1A8hSR2m7kYc'; // 네이버 API 클라이언트 ID
const NAVER_CLIENT_SECRET = 'xQh6ziwNgJ'; // 네이버 API 클라이언트 Secret*/
//const KOBIS_KEY = 'c7b8e13ad2c21601d786901a6dd853a1';//영화 진흥 위원회 api키

const searchMovies = async (req, res) => {
    const movieNm = req.body.movieNm; // 검색할 영화의 이름
    console.log(`영화 검색: ${movieNm}`);
    try {
        // 먼저, 영화의 이름으로 검색하여 영화 코드를 얻음
        const response = await axios.get('https://openapi.naver.com/v1/search/movie.json', {
            params: {
                query: movieNm
            },
            headers: {
                'X-Naver-Client-Id': 'A4rSDLRe1A8hSR2m7kYc',
                'X-Naver-Client-Secret': 'xQh6ziwNgJ',
            }
        });
        console.log(response.data)
        // 결과가 있는지 확인
        // if (response.data.items.length > 0) {
        //     // 검색어와 정확하게 일치하는 영화 찾기
        //     const movie = response.data.items.find(m => m.title === movieNm);
        //     if (movie) {
        //         const movieLink = movie.link;
        //         // 링크에서 영화 코드 추출. 링크 형식을 사용하기 전에 확인하시기 바랍니다.
        //         const movieCode = movieLink.split('=')[1];
        //         console.log(`영화 코드 찾음: ${movieCode}`);
        //
        //         // 이제, 영화 코드를 사용하여 KOBIS에서 상세 정보 얻기
        //         const detailResponse = await axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json', {
        //             params: {
        //                 key: KOBIS_KEY,
        //                 movieCd: movieCode
        //             }
        //         });
        //
        //         if (detailResponse.data.movieInfoResult.movieInfo.directors.length > 0) {
        //             const directorNm = detailResponse.data.movieInfoResult.movieInfo.directors[0].peopleNm;
        //             const opendt = detailResponse.data.movieInfoResult.movieInfo.openDt;
        //             console.log(`감독: ${directorNm}, 개봉일: ${opendt}`);
        //             res.json({ directorNm, opendt });
        //         } else {
        //             res.status(404).json({ error: '감독 정보를 찾을 수 없음' });
        //         }
        //
        //     } else {
        //         res.status(404).json({ error: '이름이 정확하게 일치하는 영화를 찾을 수 없음' });
        //     }
        // } else {
        //     res.status(404).json({ error: '영화를 찾을 수 없음' });
        // }
    } catch (error) {
        //console.error('영화 검색 실패:', error);
        console.log("에러")
        res.status(500).json({ error: '영화 검색 실패' });
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
