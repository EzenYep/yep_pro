<template>
    <div class="top-container">
        <div class="video-wrap">
            <iframe
                :src="`https://www.youtube.com/embed/${urls.videoUrl}?autoplay=1`"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>

        <div class="search-wrap">
            <div class="search">
                <input type="text" class="searchTerm" placeholder="검색">
                <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>


        <div class="category-wrap">
            <ul>
                <li data-category="action"><a href="#" @click="showMoviesByCategory(1)">액션</a></li>
                <li data-category="sf"><a href="#" @click="showMoviesByCategory(2)">SF/판타지</a></li>
                <li data-category="romance"><a href="#" @click="showMoviesByCategory(3)">로맨스</a></li>
                <li data-category="horror"><a href="#" @click="showMoviesByCategory(4)">호러/스릴러</a></li>
                <li data-category="comedy"><a href="#" @click="showMoviesByCategory(5)">코미디</a></li>
                <li data-category="family"><a href="#" @click="showMoviesByCategory(6)">가족</a></li>
                <li data-category="animation"><a href="#" @click="showMoviesByCategory(7)">애니메이션</a></li>

            </ul>
            <ul>
                <li v-for="category in categories" :key="category" :data-category="category">
                    <a href="#" @click="showMoviesByCategory(category)">{{ category }}</a>
                </li>
            </ul>
        </div>




        <div class="bottom-container">
            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[0]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[0] }}</strong></div>
            </div>

            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[1]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[1] }}</strong></div>
            </div>

            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[2]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[2] }}</strong></div>
            </div>

            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[3]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[3] }}</strong></div>
            </div>
        </div>

        <div class="bottom-container2">
            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[4]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[4] }}</strong></div>
            </div>

            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[5]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[5] }}</strong></div>
            </div>

            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[6]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[6] }}</strong></div>
            </div>

            <div class="item">
                <a class="box-image" href="#">
                    <span class="color">
                        <img :src="state.posters[7]" alt="">
                    </span>
                </a>
                <div class="box-content"><strong class="title">{{ state.movieTitles[7] }}</strong></div>
            </div>
        </div>
    </div>


</template>

<script setup>
import axios from "axios"
import { reactive } from "vue";


const urls = reactive({
    videoUrl: "",
});

const movie_url = async () => {
    const res = await axios.get("http://localhost:9212/api/movie/trailer_url");
    const videoID = res.data.trailer_url;
    urls.videoUrl = videoID.split("watch?v=")[1];
    console.log(urls.videoUrl);
};
movie_url();

const state = reactive({
    posters: [],
    movieTitles: [],
    movieIds: [],
    non_posters: [],
    non_movieTitles: [],
    selectedPoster: [],
    categories: ['action', 'sf', 'romance', 'horror', 'comedy', 'family', 'animation'], //'action', 'sf', 'romance', 'horror', 'comedy', 'family', 'animation'
    activeCategory: 'action'
});

// const fetchImageUrls = async () => {
//   try {
//     const res = await axios.get("http://localhost:9212/api/movie/image_urls");
//     const imageUrls = res.data.imageUrls;
//     state.posters = imageUrls;
//   } catch (error) {
//     console.error("Error fetching image URLs:", error);
//   }
// };

// // 이미지 경로를 가져오는 로직 실행
// fetchImageUrls();

const movie_poster_url = async () => {
    try {
        const res = await axios.get(
            "http://localhost:9212/api/movie/screening_poster_url"
        );
        console.log(res.data.posters);

        const posters = res.data.posters;

        state.posters = posters.map((poster) => poster.poster_url);
        state.movieTitles = posters.map((poster) => poster.movie_title);
        state.movieIds = posters.map((poster) => poster.movie_id);
        console.log(state.movieIds)
        const randomIndex = Math.floor(Math.random() * posters.length);
        state.selectedPoster = state.posters[randomIndex];

        // movie_poster_url 함수가 실행될 때 영화 ID를 출력하여 확인
        console.log(state.movieIds);

    } catch (error) {
        console.error("Error retrieving movie posters:", error);
    }
};
movie_poster_url();


const showMoviesByCategory = (category) => {
  state.posters = [];
  state.movieTitles = [];
  state.movieIds = [];
  console.log("aaaaaaa");
  // `http://localhost:9212/api/movies/movie_category?category=${category}`
  axios.get(`http://localhost:9212/api/movies/movie_category?category=${category}`)
    .then((response) => {
      const getMoviePostersByCategory = response.data;
      const movieArray = Object.values(getMoviePostersByCategory);
      console.log(movieArray);

      movieArray.forEach((posters) => {
        const categoryPosters = posters.map((poster) => {
          return {
            poster_url: poster.poster_url,
            movie_title: poster.movie_title,
            movie_id: poster.movie_id
          };
        });

        state.posters.push(...categoryPosters.map((poster) => poster.poster_url));
        state.movieTitles.push(...categoryPosters.map((poster) => poster.movie_title));
        state.movieIds.push(...categoryPosters.map((poster) => poster.movie_id));
      });

      const randomIndex = Math.floor(Math.random() * state.posters.length);
      state.selectedPoster = state.posters[randomIndex];

      console.log(state.movieIds);
    })
    .catch((error) => {
      console.error('Error fetching movies by category:', error);
    });
};










const searchMovies = () => {
  // 검색어를 이용하여 영화를 검색하는 로직을 추가하세요.
};



/*
export default {
  data() {
    return {
      categories: ['action', 'sf', 'romance', 'horror', 'comedy', 'family', 'animation'],
      activeCategory: 'action',
      searchTerm: '',
    };
  },
  methods: {
    showMoviesByCategory(category) {
      this.activeCategory = category;
      // 해당 카테고리에 해당하는 영화를 표시하는 로직을 추가하세요.
    },
    searchMovies() {
      // 검색어를 이용하여 영화를 검색하는 로직을 추가하세요.
    },
  },
};
*/

</script>


<style scoped>
/********************* 검색 버튼과 전체 스타일 *******************/
.top-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.top-container iframe {
    width: 100%;
    height: 500px;
}

.video-wrap {
  margin-bottom: 20px;
}

.video-wrap img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
}


body{
    background: #f2f2f2;
    font-family: 'Open Sans', sans-serif;
}

.search {
    width: 100%;
    position: relative;
    display: flex;
}

.searchTerm {
    width: 100%;
    border: 3px solid #000000;
    border-right: none;
    padding: 5px;
    height: 35px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #000000;
}

.searchTerm:focus{
    color: #ffffff;
}

.searchButton {
    width: 40px;
    height: 35px;
    border: 1px solid white;
    background: #000000;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
}

.search-wrap{
    width: 30%;
    position: relative;
    margin-top: 10%;
    margin-left: 70%;
    text-align: right;
}


/*************************영화 카테고리 탭 버튼 **********************/
ul {
    margin: 150px auto 0;
    padding: 0;
    list-style: none;
    display: table;
    width: 120%;
    text-align: center;
}
li {
    display: table-cell;
    position: relative;
    padding: 2rem 0;
    width: 5%;
}
a {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;
    display: inline-block;
    padding: 15px 20px;
    position: relative;
}

a:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: black;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
}

a:not(.box-image):not(.box-content):hover::after {
    width: 100%;
    left: 0;
}

a:hover {
    cursor: pointer;
    transform: scale(1.2);
}


.category-wrap{
    position: relative;
    top: -150px;
    margin-right: 19%;
}


/**************** 영화 이미지 넣는 부분 - 카테고리 별로 나와야함 ******************/
.top-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}


.bottom-container {
    display: flex;
    justify-content: center;
    position: relative;
    /* animation: 1.5s up; */
    top: -300px;
}

.bottom-container2 {
    display: flex;
    justify-content: center;
    position: relative;
    /* animation: 1.5s up; */
    top: -300px;
    margin-top: 3%;
}
.item {
  position: relative;
  float: left;
  overflow: hidden;
  margin: 10px 3%;
  min-width: 0px;
  max-width: 300px;
  min-height: 0px;
  max-height: 380px;
  width: 100%;
  border-radius: 0.5rem;
}

.box-image {
  position: relative;
}

.box-image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
}

.box-content {
  margin-left: 10%;
  margin-top: 5%;
}

.title {
    display: block;
    color: #333333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.3rem;
    font-weight: bold;
}
strong {
    font-weight: 500;
}


.screen-reader-text {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
}
.screen-reader-text:hover,
.screen-reader-text:active,
.screen-reader-text:focus {
    background-color: #f1f1f1;
    border-radius: 3px;
    clip: auto !important;
    color: #000000;
    display: block;
    font-size: 14px;
    font-size: 0.875rem;
    font-weight: bold;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
    display: none;
}

</style>