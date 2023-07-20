<template>
    <div class="movie-chart">
        <div class="slider-container">
            <button class="previous-button" @click="previousSlide">
                &lt;
            </button>
            <div class="slider" ref="sliderContainer">
                <div v-for="(movie, index) in currentMovies" :key="index" class="slide">
                    <img :src="movie.poster" alt="Movie Poster"/>
                </div>
            </div>
            <button class="next-button" @click="nextSlide">
                &gt;
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import store from '@/store/store';
import axios from "axios";
import router from "@/router";



const recent_movies = ref({
    posters: []
});

const movies = computed(() => recent_movies.value.posters);


const slideSize = 4;
const currentOffset = ref(0);
const sliderContainerRef = ref(null);

const currentMovies = computed(() => {
    const startIndex = currentOffset.value;
    const endIndex = startIndex + slideSize;
    let slicedMovies = movies.value.slice(startIndex, endIndex);
    if (movies.value.length >= slideSize) {
        while (slicedMovies.length < slideSize) {
            slicedMovies = slicedMovies.concat(movies.value.slice(0, slideSize - slicedMovies.length));
        }
    }
    return slicedMovies;
});



// const isFirstSlide = computed(() => currentOffset.value === 0);
// const isLastSlide = computed(() => currentOffset.value + slideSize >= movies.length);

const previousSlide = () => {
    currentOffset.value -= 1;
    if (currentOffset.value < 0) {
        currentOffset.value = movies.value.length - 1;
    }
};

const nextSlide = () => {
    currentOffset.value += 1;
    if (currentOffset.value >= movies.value.length) {
        currentOffset.value = 0;
    }
};

onMounted(() => {
    adjustSliderContainerWidth();
});

function adjustSliderContainerWidth() {
    const sliderContainer = sliderContainerRef.value;
    if (sliderContainer) {
        const sliderWidth = sliderContainer.offsetWidth;
        const slideCount = Math.ceil(movies.value.length / slideSize);
        const sliderContainerWidth = slideCount * sliderWidth;
        sliderContainer.style.width = `${sliderContainerWidth}px`;
    }
}

const data = {
    email: store.state.email
};

const recentMoviePoster = async () => {
    try {
        const response = await axios.post(
            "http://localhost:9212/api/mypages/recent_movie",
            data
        );


        const posters = response.data.posters;

        // recent_movies.value.posters를 ref로 변경
        recent_movies.value.posters = posters.map((poster) => ({poster: poster.poster_url}));

        // Recent_movie_poster 함수가 실행될 때 영화 ID를 출력하여 확인
        console.log(response.data.posters);

    } catch (error) {
        console.error("Error retrieving movie posters:", error);
    }
};

recentMoviePoster();


</script>
<style scoped>

/* 여기서부터 무비차트*/
.movie-chart {
    width: 100%;
    overflow: hidden;
}

.slider-container {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center; /* 가운데 정렬 */
}

.slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
    overflow: hidden;
}

.slide {
    height: 20vw;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}

.slide img {
    width: 100%;
    height: auto;
    max-height: 100%;
}

.movie-info {
    margin-top: 5px;
    text-align: center;
}

.controls {
    margin-top: 10px;
}

/* 슬라이드 버튼 부분 수정함~!~! */
.previous-button,.next-button {
    flex-shrink: 0;
    margin: 0 10px; 
    /* 좌우 여백 추가 */
}

.previous-button {
    margin-right: auto; /* 이전 버튼을 왼쪽으로 정렬 */
    width: 40px;
    height: 300px;
    border-radius: 4px;
    background-color:#FFE2C0;
    border: solid #FFE2C0;

}

.next-button {
    margin-left: auto; /* 다음 버튼을 오른쪽으로 정렬 */
    width: 40px;
    height: 300px;
    border-radius: 4px;
    background-color:#FFE2C0;
    border: solid #FFE2C0;
}
</style>
