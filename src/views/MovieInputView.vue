<template>
    <div class="container">
        <div class="movie_poster">
            <div class="main_poster">
                <img v-if="movieDetails.postUrl" :src="movieDetails.postUrl" alt="Movie Poster" class="poster-image">
            </div>
            <div class="input-group">
                <button style="margin-right: 15px">파일첨부</button>
                <input type="text" placeholder="post url" v-model="movieDetails.postUrl">
            </div>
            <div class="input-group">
                <button>동영상첨부</button>
                <input type="text" placeholder="YUTUBE url" v-model="movieDetails.videoUrl">
            </div>
        </div>
        <div class="add-movie">
            <div class="header">
                <h5>영화 정보 입력</h5>
            </div>
            <form @submit.prevent="searchMovies">
                <div class="input-group">
                    <label for="title">영화 이름</label><span>:</span><br>
                    <input type="text" id="title" v-model="searchMovie"/><br>
                    <button>검색</button>
                </div>
                <div class="input-group">
                    <label for="category" style="margin-left: 35px">장르</label><span>:</span><br>
                    <select id="category" v-model="movieDetails.selectedGenre1">
                        <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                    </select>
                    <select id="category2" v-model="movieDetails.selectedGenre2">
                        <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                    </select>
                    <select id="category3" v-model="movieDetails.selectedGenre3">
                        <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="director" style="margin-left: 35px">감독</label><span>:</span><br>
                    <input type="text" id="director" v-model="movieDetails.directorNm"><br>
                </div>
                <div class="input-group">
                    <label for="ageRating" style="margin-left: 35px">나이</label><span>:</span><br>
                    <input type="number" id="ageRating" v-model.number="movieDetails.ageRating"><br>
                </div>
                <div class="input-group">
                    <label for="price" style="margin-left: 35px">가격</label><span>:</span><br>
                    <input type="number" id="price" v-model.number="movieDetails.price"><br>
                </div>
                <div class="input-group">
                    <label for="movie_description">영화 줄거리:</label>
                </div>
                <div class="input-group">
                    <textarea placeholder="영화 줄거리" v-model="movieDetails.movieDescription"></textarea>
                </div>
                <div class="input-group-date">
                    <label for="start_date" style="margin-right: 30px">시작일</label><span style="margin-right: 30px">:</span>
                    <input type="date" id="start_date" v-model="movieDetails.startDate"><br>
                </div>
                <div class="input-group-date">
                    <label for="end_date" style="margin-right: 30px">종영일</label><span style="margin-right: 30px">:</span>
                    <input type="date" id="end_date" v-model="movieDetails.endDate" :min="movieDetails.startDate"><br>
                </div>
                <div class="buttons">
                    <div>
                        <button class="endButton" @click="goBack">닫기</button>
                        <button class="submitButton" @click="movie_input">등록</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import {ref, onMounted, reactive, watch} from 'vue';
import axios from 'axios';
import store from "@/store/store";

// Initialize genres as a reactive reference to an empty array

const movieDetails = reactive({
    directorNm: '',
    startDate: '',
    endDate: '',
    postUrl: '',
    videoUrl: '',
    ageRating: '',
    movieDescription: '',
    price: '',
    selectedGenre1: '',
    selectedGenre2: '',
    selectedGenre3: ''
});

const genres = ref([]);
// Define a function to fetch genres
const fetchGenres = async () => {
    const response = await axios.get('http://localhost:9212/api/movie/category');
    if (response && response.data) {
        // Assign the fetched categories to genres
        genres.value = response.data;
    }
}

const validateDate = () => {
    const startDate = new Date(movieDetails.startDate);
    const endDate = new Date(movieDetails.endDate);

    // 만약 종영일이 시작일보다 이전이라면, 경고 메시지를 표시하고 함수를 종료합니다.
    if (endDate <= startDate) {
        alert('종영일은 시작일보다 이후여야 합니다.');
        return false;
    }

    return true;
}

// Call the function when the component is mounted
onMounted(fetchGenres);

const searchMovie = ref('');

const searchMovies = async () => {
    const body = {movieNm: searchMovie.value};
    const response = await axios.post("http://localhost:9212/api/search-movies-api", body)

    // if the response is successful, populate the movieDetails reactive object
    if (response && response.data) {
        movieDetails.directorNm = response.data.directors;
        movieDetails.startDate = response.data.releaseDate;
        movieDetails.postUrl = response.data.posterUrl;
        movieDetails.videoUrl = response.data.videoUrl;
    }
}
let body = reactive({});
const movie_input = () => {
    if (!validateDate()) {
        return;
    }
    body = {
        movieNm: searchMovie.value,
        director: movieDetails.directorNm,
        postUrl: movieDetails.postUrl,
        videoUrl: movieDetails.videoUrl,
        startDate: movieDetails.startDate,
        endDate: movieDetails.endDate,
        ageRating: movieDetails.ageRating,
        movieDescription: movieDetails.movieDescription,
        price: movieDetails.price,
        selectedGenre1: movieDetails.selectedGenre1,
        selectedGenre2: movieDetails.selectedGenre2,
        selectedGenre3: movieDetails.selectedGenre3
    }
    console.log(body)
    axios.post("http://localhost:9212/api/movie/movie_input", body).then((res) => {
        const code = res.data.code;
        if (code === 200) {
            router.push({
                name: "manager_main",
            });
        }
    })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                // 토큰이 없거나 만료된 경우 처리하는 로직을 추가하세요.
                // 예를 들어 사용자를 로그인 페이지로 리디렉션할 수 있습니다.
                router.push({name: "login"})
                console.error('Unauthorized');
            } else {
                console.error(error);
            }
        });

}
const goBack = () => {
    router.push({
        name: 'manager_main'
    });
}
</script>


<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.poster-image {
    width: 100%; /* or any other size */
    height: 100%; /* maintains aspect ratio */
}

.movie_poster {
    flex: 1;
}

.add-movie {
    flex: 1;
    margin-bottom: 3%;
}

.header {
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 40%;
}

.input-group {
    display: flex;
    align-items: center; /* 내용물 가운데 정렬*/
    gap: 5%; /* Optional: add some space between the label and the input */
    margin: 3%;
}

.input-group input {
    width: 50%; /* Adjust as needed */
}

.input-group-date {
    display: flex;
    align-items: center; /* 내용물 가운데 정렬*/
    margin: 3%;
}

.input-group-date input {
    width: 50%; /* Adjust as needed */
}

textarea {
    width: 100%; /* Adjust as needed */
    height: 100%; /* Adjust as needed */
}

.main_poster {
    background-color: #000000;
    height: 70%;
    width: 80%;
}

.endButton {
    width: 80px;
    height: 35px;
    margin-right: 20px;
}

.submitButton {
    width: 80px;
    height: 35px;
}
</style>
