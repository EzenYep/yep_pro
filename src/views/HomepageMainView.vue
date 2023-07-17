<template>
    <div class="container">
        <!-- 이미지 그룹 -->
        <iframe
                :src="`https://www.youtube-nocookie.com/embed/${urls.videoUrl}?autoplay=1`"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
        ></iframe>
         검색
        <div>
            <div class="wrap">
                <div class="search">
                    <input
                            type="text"
                            class="searchTerm"
                            placeholder="검색어를 입력하세요."
                            v-model="searchQuery"
                            @keyup.enter="searchmovie"
                    />
                    <button type="submit" class="searchButton"  @click="searchmovie">검색</button>
                </div>
            </div>
        </div>
        <!-- 무비차트 -->
        <div>
            <h3>무비차트</h3>
        </div>
        <div class="movie-chart">
            <div class="slider-container">
                <button
                        class="previous-button"
                        @click="previousMovieSlide"
                >
                    &lt;
                </button>
                <div class="slider" ref="sliderContainer">
                    <div class="slide" v-for="(poster, index) in currentMovies" :key="index">
                        <!-- 이미지 및 영화 정보 표시 -->
                        <div class="movie-info">
                            <img :src="poster" alt="Movie Poster" class="poster-image" @click="goMovieInfos(index)"/>
                            <h4>{{ movies.movieTitles[currentMovieOffset.value + index] }}</h4>
                            <!-- 추가적인 영화 정보 표시 -->
                        </div>
                    </div>

                </div>
                <button class="next-button" @click="nextMovieSlide">
                    &gt;
                </button>
            </div>
        </div>
        <br>


        <div>
            <h3>상영예정작</h3>
        </div>
        <!-- 상영 예정작-->
        <div class="movie-chart">
            <div class="slider-container">
                <button class="previous-button" @click="previousNonMovieSlide">
                    &lt;
                </button>
                <div class="slider" ref="sliderContainer">
                    <div class="slide" v-for="(non_poster, index) in currentNonMovies" :key="index">
                        <!-- 이미지 및 영화 정보 표시 -->
                        <div class="movie-info">
                            <img :src="non_poster" alt="Movie Poster" class="poster-image">
                            <h4>{{ movies.non_movieTitles[currentNonMovieOffset.value + index] }}</h4>
                            <!-- 추가적인 영화 정보 표시 -->
                        </div>
                    </div>
                </div>

                <button class="next-button" @click="nextNonMovieSlide">
                    &gt;
                </button>
            </div>
        </div>
        <!-- 가로 레이아웃 -->
        <div class="horizontal-layout">
            <div class="image">
                <!--<img src="../assets/photo1.jpg" alt="Photo 1">-->
                <div style="width: 35rem; height: 35rem; background-color: aqua;"></div>
            </div>
            <div class="buttons">
                <button class="button" @click="goReservationPage">빠른 예매</button>
                <button class="button" @click="goMyPage">예매 내역</button>
                <button class="button" @click="goEventPage">할인 안내</button>
            </div>
            <div class="image">
                <!--<img src="../assets/photo1.jpg" alt="Photo 1">-->
                <img :src="movies.selectedPoster">
            </div>
        </div>

        <!-- 하단 영역 -->
        <div class="last">
            <h6 class="teamname">
                Yep | 이용약관 | 개인정보처리방침 | 이현진 | 김영강 | 윤종혁 | 문정혜 |
                방우리 | 황 건
            </h6>
            <button class="topbutton" @click="scrollToTop">TOP</button>
        </div>

    </div>
</template>
<script setup>
import {ref, computed, onMounted, reactive, onBeforeUnmount} from "vue";
import router from "@/router";
import axios from "axios";

const goReservationPage = () => {
    router.push({
        name: "reservation",
    });
};
const goMyPage = () => {
    router.push({
        name: "mypage",
    });
};
const goEventPage = () => {
    router.push({
        name: "event",
    });
};

const slideSize = 4;
const sliderContainerRef = ref(null);
const currentMovieOffset = ref(0); // 무비차트 슬라이드의 오프셋
const currentNonMovieOffset = ref(0); // 상영 예정작 슬라이드의 오프셋

const currentMovies = computed(() => {
    const startIndex = currentMovieOffset.value;
    const endIndex = startIndex + slideSize;
    const posters = movies.posters.concat(movies.posters); // 무한 루프를 위해 슬라이드 배열을 복사하여 연결합니다.
    return posters.slice(startIndex, endIndex);
});

const currentNonMovies = computed(() => {
    const startIndex = currentNonMovieOffset.value;
    const endIndex = startIndex + slideSize;
    const posters = movies.non_posters.concat(movies.non_posters); // 무한 루프를 위해 슬라이드 배열을 복사하여 연결합니다.
    return posters.slice(startIndex, endIndex);
});

const previousMovieSlide = () => {
    currentMovieOffset.value -= 1;
    if (currentMovieOffset.value < 0) {
        currentMovieOffset.value = movies.posters.length - 1;
    }
};

const nextMovieSlide = () => {
    currentMovieOffset.value += 1;
    if (currentMovieOffset.value >= movies.posters.length) {
        currentMovieOffset.value = 0;
    }
};

const previousNonMovieSlide = () => {
    currentNonMovieOffset.value -= 1;
    if (currentNonMovieOffset.value < 0) {
        currentNonMovieOffset.value = movies.non_posters.length - 1;
    }
};

const nextNonMovieSlide = () => {
    currentNonMovieOffset.value += 1;
    if (currentNonMovieOffset.value >= movies.non_posters.length) {
        currentNonMovieOffset.value = 0;
    }
}


onMounted(() => {
    adjustSliderContainerWidth();
    startAutoSlide(); // 자동 슬라이드 시작
});

onBeforeUnmount(() => {
    stopAutoSlide(); // 자동 슬라이드 정지
});

let autoSlideInterval = null;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextMovieSlide();
        nextNonMovieSlide();
    }, 3000); // 3초마다 자동으로 다음 슬라이드로 이동합니다.
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function adjustSliderContainerWidth() {
    const sliderContainer = sliderContainerRef.value;
    if (sliderContainer) {
        const sliderWidth = sliderContainer.offsetWidth;
        const slideCount = Math.ceil(movies.posters.length / slideSize);
        const sliderContainerWidth = slideCount * sliderWidth;
        sliderContainer.style.width = `${sliderContainerWidth}px`;
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // 부드러운 스크롤을 위해 behavior를 "smooth"로 설정
    });
};

router.afterEach(() => {
    window.scrollTo(0, 150);
});

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

const movies = reactive({
    posters: [],
    movieTitles: [],
    movieIds: [],
    non_posters: [],
    non_movieTitles: [],
    selectedPoster: []
});

const movie_poster_url = async () => {
    try {
        const res = await axios.get(
            "http://localhost:9212/api/movie/screening_poster_url"
        );
        console.log(res.data.posters);

        const posters = res.data.posters;

        movies.posters = posters.map((poster) => poster.poster_url);
        movies.movieTitles = posters.map((poster) => poster.movie_title);
        movies.movieIds = posters.map((poster) => poster.movie_id);
        console.log(movies.movieIds)
        const randomIndex = Math.floor(Math.random() * posters.length);
        movies.selectedPoster = movies.posters[randomIndex];

        // movie_poster_url 함수가 실행될 때 영화 ID를 출력하여 확인
        console.log(movies.movieIds);

    } catch (error) {
        console.error("Error retrieving movie posters:", error);
    }
};
movie_poster_url();

const non_movie_poster_url = async () => {
    try {
        const res = await axios.get(
            "http://localhost:9212/api/movie/non_screening_poster_url"
        );
        console.log(res.data.non_posters);

        const non_posters = res.data.non_posters;

        movies.non_posters = non_posters.map((non_poster) => non_poster.non_poster_url);
        movies.non_movieTitles = non_posters.map((non_poster) => non_poster.non_movie_title);
        console.log(movies.non_posters);
        console.log(movies.non_movieTitles);
    } catch (error) {
        console.error("Error retrieving movie posters:", error);
    }
};

non_movie_poster_url();

const searchQuery = ref('');


const searchmovie = async () => {
  try {
    if (!searchQuery.value) {
      return;
    }
    router.push({ name: "SearchMovieView",
  query: { searchQuery:searchQuery.value },
}) 
  } catch (error) {
    console.error('Error searching movies:', error);
  }
};


const goMovieInfos = (currentIndex) => {
    const index = currentMovieOffset.value + currentIndex;
    const selectedMovieId = movies.movieIds[index];
    router.push({
        name: "movie_info",
        params: {
            id: selectedMovieId,
        },
    });
};
</script>

<style scoped>
.container {
    /*width: 70%;
      height: 100%;*/
    overflow: hidden;
    position: relative;
}

.container > img {
    width: 70%;
    /* height: 100%; */
}

.container iframe {
    width: 100%;
    height: 500px;
}


.searchTerm {
    width: 30%;
}

.search {
    position: relative;
    margin-top: 10px;
    margin-bottom: 50px;
    /* left: 66.5%;  /* 야매로 왼쪽기준으로 만듬 */
    text-align: right;
}

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


.previous-button,
.next-button {
    flex-shrink: 0;
    margin: 0 10px; /* 좌우 여백 추가 */
}

.previous-button {
    margin-right: auto; /* 이전 버튼을 왼쪽으로 정렬 */
}

.next-button {
    margin-left: auto; /* 다음 버튼을 오른쪽으로 정렬 */
}

.horizontal-layout {
    display: flex;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 30%;
}

/* 밑에 광고 이미지 양옆으로 붙여야함*/
.image,
.buttons {
    margin: 0 10px;
}

.image img {
    width: 500px;
    height: 550px;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.button {
    display: block;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    background-color: #ccc;
    border: none;
    cursor: pointer;
}

.last {
    display: flex;
    align-items: center;
}

.teamname {
    margin-right: auto;
}

.topbutton {
    width: 5rem;
    height: 5rem;
    margin-left: auto;
}
</style>