<template>
  <div class="container">
    <div class="search">
      <input type="text" class="searchTerm" @keyup.enter="searchMovie" v-model="searchQuery" />
      <button type="submit" class="searchButton" @click="searchMovie">검색</button>
    </div>

    <h3>검색결과</h3>
    <hr class="center-hr" style="font-weight: 900;" />

    <div class="searchresultnum">검색결과 {{ totalResults }}건</div>
    <h5>현재 상영중</h5>

    <div class="movielist">
      <div class="item" v-for="movie in searchResults" :key="movie.movie_id" id="onmovie">
        <!-- <div class="movieposter"  @click="showMovieDetail(movie.movie_id)"> -->
          <img :src="movie.poster_url" alt="포스터" @click="showMovieDetail(movie.movie_id)"/>
        <h4>{{ movie.movie_title  }}</h4> <!--영화 제목-->
      </div>
    </div>

    <hr class="center-hr" style="font-weight: 900;" />

    <h5>상영종료</h5>

    <div class="movielist" >
      <div class="item" v-for="movie in searchResults2" :key="movie.movie_id" id="offmovie">
        <!-- <div class="movieposter" @click="showMovieDetail(movie.movie_id)"> -->
          <!-- 포스터 {{ movie.poster_url }} -->
          <img :src="movie.poster_url" alt="포스터" @click="showMovieDetail(movie.movie_id)"/>
        <h4>{{ movie.movie_title  }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';


const route = useRoute();
const searchQuery = ref(route.query.searchQuery || ''); // 검색창에 표시
const searchResults = ref([]);
const searchResults2 = ref([]);

const searchMovie = async () => {           //검색결과 페이지 내에 검색후 결과 출력
  try {

    if (!searchQuery.value) {
    searchResults.value = [];
    searchResults2.value = [];
    console.log(searchQuery.value);
    return;
    }

    router.replace({
      name: 'SearchMovieView',
      query: { searchQuery: searchQuery.value },
    });

    const response = await axios.post('http://localhost:9212/api/movie/searchmovie', {
      movie_title: searchQuery.value,
    });

    const data = response.data;
    searchResults.value = data.searchResults;
    searchResults2.value = data.searchResults2;  

  } catch (error) {
    console.error('Error searching movies:', error);
  }
};


const searchMovie2 = async () => {      //(메인페이지)페이지 로딩이 되면서 출력
  try {
    searchResults.value = [];
    searchResults2.value = [];
    console.log(searchQuery.value);

    router.replace({
      name: 'SearchMovieView',
      query: { searchQuery: searchQuery.value },
    });

    const response = await axios.post('http://localhost:9212/api/movie/searchmovie', {
      movie_title: searchQuery.value,
    });

    const data = response.data;
    searchResults.value = data.searchResults;
    console.log(searchResults.value)
    searchResults2.value = data.searchResults2;  

  } catch (error) {
    console.error('Error searching movies:', error);
  }
};
searchMovie2()

const totalResults = computed(() => {           //영화 검색 건수 합치기
  return searchResults.value.length + searchResults2.value.length;
});

const showMovieDetail = async (movieId) => {
  console.log(movieId)
  router.push({
    name: 'movie_info', 
    params: { id: movieId } 
  });
};


</script>

<style scoped>
.container {
    position: relative;
    margin: auto;
    width: 100%;
    height: 100%;
    padding: 50px;
    background: rgba(227, 187, 187, 0.402);
    box-sizing: border-box;
    /* box-shadow: 0 5px 5px rgba(0,0,0,.6); */
    border-radius: 10px;
}
.container h3{
    margin: 0 0 30px;
    padding: 0;
    color: #000000;
    text-align: center;
    margin-bottom: -5;
    letter-spacing: 10px;
}
.search {
    position: relative;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 40px;
    text-align: right;
}
.searchresultnum{
  margin-bottom: 10%;
  margin-top: 5%;
  font-weight: bold ;
}
.item {
    background-color: rgb(114, 114, 114);
  font-size: 30px;
  color: aliceblue;
  padding: 30px;
  margin: 10px;
  margin-top: 5%;
  width: 250px;
  height: 400px;
  margin: auto;
}
.item img{
width: 100%;
height: 95%;
margin: auto;

}
.item h4{
  margin: auto;
  color: #000000;
  text-align: left;
}

.movielist hr{
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>