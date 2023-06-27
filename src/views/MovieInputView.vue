<template>
    <div class="container">
        <div class="movie_poster">
            <!-- Movie posters go here -->
            <div class="main_poster">

            </div>
            <div class="input-group">
                <button style="margin-right: 15px">파일첨부</button>
                <input type="text" placeholder="post url">
            </div>
            <div class="input-group">
                <button>동영상첨부</button>
                <input type="text" placeholder="YUTUBE url">
            </div>
        </div>
        <div class="add-movie">
            <div class="header">
                <h5>영화 정보 입력</h5>
            </div>
            <form>
                <div class="input-group"><!-- div안에 태그들을 일렬로 정렬하기 위해 input그룹 태그 생성후 style로 묶어줌-->
                    <label for="title" >영화 이름</label><span>:</span><br>
                    <input type="text" id="title"  v-model="searchQuery"/><br>
                    <button @click="searchMovies">검색</button>
                </div>
                <div class="input-group">
                <label for="category" style="margin-left: 35px">장르</label><span>:</span><br>
                <select id="category" v-model="selectedGenre">
                    <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                </select>
                <select id="category2" v-model="selectedGenre">
                    <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                </select>
                <select id="category3" v-model="selectedGenre">
                    <option v-for="(genre, index) in genres" :key="index">{{ genre }}</option>
                </select>
                </div>
                <div class="input-group">
                <label for="directer"  style="margin-left: 35px">감독</label><span>:</span><br>
                <input type="text" id="directer" ><br>
                </div>
                <div class="input-group">
                <label for="movie_description">영화 줄거리:</label>
                </div>
                <div class="input-group">
                    <textarea readonly placeholder="영화 줄거리"></textarea>
                </div>
                <div class="input-group-date">
                    <label for="start_day" style="margin-right: 30px">시작일</label><span style="margin-right: 30px">:</span>
                    <input type="text" id="start_day" v-model="start_day"><span>년</span>
                    <input type="text" id="start_day" v-model="start_day"><span>월</span>
                    <input type="text" id="start_day" v-model="start_day"><span>일</span>
                </div>
                <div class="input-group-date">
                    <label for="start_day" style="margin-right: 30px">종영일</label><span style="margin-right: 30px">:</span>
                    <input type="text" id="start_day" v-model="start_day"><span>년</span> <br>
                    <input type="text" id="start_day" v-model="start_day"><span>월</span><br>
                    <input type="text" id="start_day" v-model="start_day"><span>일</span><br>
                </div>
                <div class="buttons">
                    <div>
                        <button class="endButton" @click="goBack">닫기</button>
                        <button class="submitButton">등록</button>
                    </div>

                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Initialize genres as a reactive reference to an empty array
const genres = ref([]);

// Define a function to fetch genres
const fetchGenres = async () => {
    const response = await axios.get('http://localhost:9212/api/movie/category');
    if (response && response.data) {
        // Assign the fetched categories to genres
        genres.value = response.data;
    }
}

// Call the function when the component is mounted
onMounted(fetchGenres);

const searchQuery = ref('');

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
    align-items: center;  /* 내용물 가운데 정렬*/
    gap: 5%;  /* Optional: add some space between the label and the input */
    margin: 3%;
}
.input-group input {
    width: 50%;  /* Adjust as needed */
}
.input-group-date {
    display: flex;
    align-items: center;  /* 내용물 가운데 정렬*/
    margin: 3%;
}
.input-group-date input {
    width: 10%;  /* Adjust as needed */
}
textarea {
    width: 100%;  /* Adjust as needed */
    height: 100%;  /* Adjust as needed */
}
.main_poster{
    background-color: #000000;
    height: 70%;
    width: 80%;
}
.endButton{
    width: 80px;
    height: 35px;
    margin-right: 20px;
}

.submitButton{
    width: 80px;
    height: 35px;
}
</style>
