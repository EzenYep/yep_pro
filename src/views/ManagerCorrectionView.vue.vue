<template>
  <div class="container">
    <div class="movie-wrap">
      <h3>영화조회</h3>
      <div class="horizontal-line" ></div>
    </div>


    <div>
      <div class="wrap">
        <div class="search">
  <div>
    <input type="text" class="searchTerm" placeholder="검색어를 입력하세요." v-model="searchInput" />
    <button type="button" class="searchButton" @click="handleSearch" :disabled="isSearchDisabled">O</button>
  </div>
        </div>
      </div>
    </div>

    <div class="container-list">
      <div class="movie-list">
      <table>
        <thead>
          <tr>
            <th class="column column-small">구분</th>
            <th class="column column-small">영화 이름</th>
            <th class="column column-large">개봉일</th>
            <th class="column column-large">개봉종료일</th>
            <th class="column column-large">영화 상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in paginatedMovieList" :key="movie.movie_title">
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="movie.id"
                v-model="movie.selected"
                @change="selectMovies(movie)"
              />
            </td>
            <td :style="{ color: 'black' }">{{ movie.movie_title }}</td>
            <td :style="{ color: 'black' }">{{ movie.start_date }}</td>
            <td :style="{ color: 'black' }">{{ movie.end_date }}</td>
            <td :style="{ color: 'black' }">{{ movie.movie_state }}</td>
          </tr>
        </tbody>               
      </table>
    </div>

    <div class="twobtn">
      <div class="button-group">
        <table>
          <tr>
            <button type="button" class="btn btn-outline-secondary" @click="goBack">수정</button>
            <button type="button" class="btn btn-outline-secondary" @click="deleteMovies">삭제</button>
          </tr>
        </table>
      </div>
    </div>

    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }" >
            <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
          <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
            <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import router from '@/router';
import axios from 'axios';

const movieList = ref([]);

const selectedMovies = ref([]); 
const currentPage = ref(1);
const pageSize = ref(10);
const searchKeyword = ref('');

const filteredMovieList = computed(() => {
  return movieList.value.filter(movie => movie.state !== 1 && movie.movie_title.includes(searchKeyword.value));
});


const paginatedMovieList = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredMovieList.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredMovieList.value.length / pageSize.value);
});

const getMovieList = async () => {
  try {
    const response = await axios.get("http://localhost:9212/api/getMovieList");

    if (response && response.data) {
      const movies = response.data.map(movie => ({
        movie_title: movie.movie_title,
        movie_state: movie.movie_state,
        start_date: movie.start_date,
        end_date: movie.end_date
      }));
      movieList.value = movies;

      console.log(movieList.value); // 영화 목록 출력
    }
  } catch (error) {
    console.error("영화 정보를 가져오는 중에 오류가 발생했습니다.", error);
  }
}

onMounted(() => {
  getMovieList(); // 컴포넌트가 마운트되면 getMovieList 함수를 호출합니다.
});




function selectMovies(movie) {
  const index = selectedMovies.value.findIndex(m => m.id === movie.id);

  if (index > -1) {
    selectedMovies.value.splice(index, 1);
  } else {
    const selectedMovie = { ...movie };
    selectedMovie.selected = true;
    selectedMovies.value.push(selectedMovie);
  }

  console.log(selectedMovies.value); // selectedMovies 배열 출력
}


function deleteMovies() {
  const values = selectedMovies.value
    .map(movie => movie.movie_title)
    .filter(title => title !== undefined);

  console.log(values);

  if (values.length === 0) {
    console.log("삭제할 컨텐츠가 없습니다");
    return;
  }

  if (window.confirm("정말로 선택된 영화을 삭제하시겠습니까?")) {
    axios
      .post("http://localhost:9212/api/manager_correction", { values })
      .then((res) => {
        if (res.data.code === 200) {
          console.log("삭제 성공");
          movieList.value = movieList.value.filter(
            movie => !values.includes(movie.movie_title)
          );
          selectedMovies.value = []; // selectedMovies 배열 비우기
          location.reload(); // 창을 새로고침합니다
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("삭제 취소");
  }
}




function changePage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
}

function goBack() {
  router.push({
    name: 'manager_main'
  });
}


const searchInput = ref('');
const isSearchDisabled = ref(true);


watchEffect(() => {
  isSearchDisabled.value = searchInput.value.length === 0;
});

  const handleSearch = () => {
    searchKeyword.value = searchInput.value; // 검색 키워드 업데이트

    // 검색 결과를 화면에 표시하거나 다른 작업을 수행합니다.

    searchInput.value = ''; // 검색 입력 초기화
    isSearchDisabled.value = true; // 검색 버튼 비활성화
  };
</script>



<style scoped>
/***********회원 조회**********/
.container{
  position: relative;
  overflow: hidden;;
}

.horizontal-line {
  height: 1px;
  background-color: black;
  margin-bottom: 5%;
}

/********************* 검색 버튼과 전체 스타일 *******************/
.user-wrap {
  margin-top: 5%;
}

.searchTerm {
  width: 30%;
  height: 2rem;
  border: 3px solid #000000;
  border-right: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #000000;
}

.searchTerm:focus{
  color: #000000;
}

.search {
    position: relative;
    margin-top: 10px;
    margin-bottom: 50px;
    /* left: 66.5%;  /* 야매로 왼쪽기준으로 만듬 */
    text-align: right;
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

/************* 회원조회 칼럼 *************/
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

th{
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;

}

td {
  padding: 30px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th.column {
  background-color: #f2f2f2;
}

th.column-small {
  width: 80px;
}

th.column-large {
  width: 200px;
}

/*********** 페이지 표시하는 번호 탭 *************/
a {
   -webkit-transition: all 0.3s ease;
   transition: all 0.3s ease;
}

.nav-links a {
   margin: 1rem .6rem;
}
.nav-links a.page-numbers {
   color: #000000;
}
.nav-links a.page-numbers:hover {
   color: #000000;
}
.nav-links .page-numbers.current,
.nav-links .page-numbers.dots {
   color: #000000;
}
.nav-links a.next,
.nav-links a.prev {
   display: inline-block;
   padding: .2rem .8rem;
   background-color: #000000;
   color: #fff;
   border-radius: 2px;
}
.nav-links a.next:hover,
.nav-links a.prev:hover {
   color: #fff;
}

.nav-links a.prev::before,
.nav-links a.next::after {
   content: "";
   position: relative;
   display: inline-block;
   width: 10px;
   height: 10px;
   border-left: 2px solid #ffffff;
   border-bottom: 2px solid #ffffff;
   margin-right: 5px;
}

.nav-links a.prev::before {
   transform: rotate(45deg);
}

.nav-links a.next::after {
   transform: rotate(-135deg);
}

.row{
  position: relative;
  margin-left: 38%;
}

.twobtn {
  display: flex;
  align-items: center; 
}
.button-group {
  margin-left: auto;
  margin-top: 3%  ;
}

</style>
