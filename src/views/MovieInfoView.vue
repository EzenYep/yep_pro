<template>
    <div class="container">
        <div class="movie_poster">
                <img :src="movie_data.poster" style="height: auto;width: auto">
        </div>
        <div class="movie_info">
            <div style="margin-top: 30%;">

            </div>
            <div class="flex-container">
                <label class="title"><h2>{{movie_data.movie_title}}</h2></label>
            </div>
            <div class="horizontal-line" ></div>
            <div class="flex-container">
                <h6 class="flex-item">감독:</h6> <label class="flex-label">{{movie_data.director}}</label>
            </div>
            <br>
            <div class="flex-container">
                <h6 class="flex-item">장르:</h6> <label class="flex-label">{{movie_data.category_name}}</label>
            </div>
            <br>
            <div class="flex-container">
                <h6 class="flex-item">개봉일:</h6> <label class="flex-label">{{movie_data.start_date}}</label>
            </div>
            <br>
            <div class="flex-container">
                <h6 class="flex-item">줄거리:</h6> <span class="flex-label">{{movie_data.movie_description}}</span>
            </div>
        </div>
    </div>

    <CommentForm  :id="id"> </CommentForm>
    <ReviewInfoView :id="id"></ReviewInfoView>
</template>

<script setup>
import ReviewInfoView from "@/components/ReviewInfoView.vue";
import CommentForm from "@/components/CommentForm.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {reactive} from "vue";
const route = useRoute();
const id = route.params.id;

const body = reactive({
    id:id,
});

const movie_data = reactive({
    movie_title:'',
    director:'',
    category:'',
    startday:'',
    poster:'',
    movie_description:'',
    category_name:'',
    start_date:''
})
const movie_info_db = async () =>{
    const res = await axios.post("http://localhost:9212/api/movie/movie_info_data",body);
    movie_data.movie_title= res.data.movie_title
    movie_data.director= res.data.director
    movie_data.poster = res.data.poster_url
    movie_data.movie_description = res.data.movie_description
    movie_data.category_name = res.data.category_name
    movie_data.start_date = res.data.start_date
    const startDate = new Date(res.data.start_date);
    const formattedStartDate = startDate.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 변환

    movie_data.start_date = formattedStartDate;
}
movie_info_db();


</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 위로 정렬 */
  margin-bottom: 5%;
}


.movie_poster {
  display: flex;
  justify-content: flex-end;
}

.movie_info {
    flex: 2;
    margin-left: 5%;
    position: relative; /* 추가 */
    top: -5rem; /* 위로 이동할 픽셀 값 */
}

img {
    max-width: 90%;
    max-height: 90%;
}

.flex-container {
    display: flex;
    align-items: center;
}

.title {

}

.horizontal-line {
  height: 1px;
  background-color: black;
  margin-top: 5%;
  margin-bottom: 5%;
}

.flex-item {
    /* flex: 1; */
    margin-right: 10px;
}

.flex-label {
    flex: 4;
    margin-left: 10px;
}
.main_poster{
    background-color: #00720B;
    width: 80%;
    height: 100%;
}
</style>


