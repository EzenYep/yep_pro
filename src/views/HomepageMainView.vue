<template>
  <div class="container">
    <div class="img-group">
      <img class="main-movie" src="../assets/test.jpg">
    </div>
    <div>
      <div class="wrap">
        <div class="search">
          <input type="text" class="searchTerm" placeholder="검색어를 입력하세요.">
          <button type="submit" class="searchButton">검색</button>
        </div>
      </div>
    </div>
    <div>
      <h3>무비차트</h3>
    </div>
    <div class="movie-chart">
      <div class="slider-container">
        <button class="previous-button" @click="previousSlide" :disabled="isFirstSlide">
          &lt;
        </button>
        <div class="slider" ref="sliderContainer">
          <div class="slide" v-for="(movie, index) in currentMovies" :key="index">
            <img :src="movie.poster" alt="Movie Poster">
            <div class="movie-info">
              <h4>{{ movie.title }}</h4>
              <!-- 추가적인 영화 정보 표시 -->
            </div>
          </div>
        </div>
        <button class="next-button" @click="nextSlide" :disabled="isLastSlide">
          &gt;
        </button>
      </div>
    </div>
    <div>
      <h3 style="margin-top:10%;">상영예정작</h3>
    </div>
    <div class="movie-chart">
      <div class="slider-container">
        <button class="previous-button" @click="previousSlide" :disabled="isFirstSlide">
          &lt;
        </button>
        <div class="slider" ref="sliderContainer">
          <div class="slide" v-for="(movie, index) in currentMovies" :key="index">
            <img :src="movie.poster" alt="Movie Poster">
            <div class="movie-info">
              <h4>{{ movie.title }}</h4>
              <!-- 추가적인 영화 정보 표시 -->
            </div>
          </div>
        </div>
        <button class="next-button" @click="nextSlide" :disabled="isLastSlide">
          &gt;
        </button>
      </div>
    </div>
    <div class="horizontal-layout">
      <div class="image">
        <!--<img src="../assets/photo1.jpg" alt="Photo 1">-->
        <div style="width:35rem;height:35rem;background-color: aqua;"></div>
      </div>
      <div class="buttons">
        <button class="button" @click="goReservationPage">빠른 예매</button>
        <button class="button" @click="goMyPage">예매 내역</button>
        <button class="button" @click="goEventPage">할인 안내</button>
      </div>
      <div class="image">
        <!--<img src="../assets/photo1.jpg" alt="Photo 1">-->
        <div style="width:35rem;height:35rem;background-color: aqua;"></div>
      </div>
    </div>
    <div class="last">  
      <h6 class="teamname">Yep | 이용약관 | 개인정보처리방침 | 이현진 | 김영강 | 윤종혁 | 문정혜 | 방우리 | 황 건</h6>
      <button class="topbutton" @click="scrollToTop">TOP</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import router from '@/router';

const goReservationPage = () => {
  router.push({
    name: 'reservation',
  });
};
const goMyPage = () => {
  router.push({
    name: 'mypage',
  });
};
const goEventPage = () => {
  router.push({
    name: 'event',
  });
};

const movies = [
  {
    title: '영화 제목 1',
    poster: '../assets/movie1.jpg'
  },
  {
    title: '영화 제목 2',
    poster: '../assets/movie2.jpg'
  },
  {
    title: '영화 제목 3',
    poster: '../assets/movie3.jpg'
  },
  {
    title: '영화 제목 4',
    poster: '../assets/movie4.jpg'
  }
  // 추가적인 영화 데이터
];

const slideSize = 4;
const currentOffset = ref(0);
const sliderContainerRef = ref(null);

const currentMovies = computed(() => {
  const startIndex = currentOffset.value;
  const endIndex = startIndex + slideSize;
  return movies.slice(startIndex, endIndex);
});

const isFirstSlide = computed(() => currentOffset.value === 0);
const isLastSlide = computed(() => currentOffset.value + slideSize >= movies.length);

const previousSlide = () => {
  currentOffset.value -= slideSize;
  if (currentOffset.value < 0) {
    currentOffset.value = 0;
  }
};

const nextSlide = () => {
  const maxOffset = movies.length - slideSize;
  currentOffset.value += slideSize;
  if (currentOffset.value > maxOffset) {
    currentOffset.value = maxOffset;
  }
};

onMounted(() => {
  adjustSliderContainerWidth();
});

function adjustSliderContainerWidth() {
  const sliderContainer = sliderContainerRef.value;
  if (sliderContainer) {
    const sliderWidth = sliderContainer.offsetWidth;
    const slideCount = Math.ceil(movies.length / slideSize);
    const sliderContainerWidth = slideCount * sliderWidth;
    sliderContainer.style.width = `${sliderContainerWidth}px`;
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 부드러운 스크롤을 위해 behavior를 "smooth"로 설정
  });
};

router.afterEach(() => {
  window.scrollTo(0, 150);
});
</script>

<style scoped src="../assets/css/mainpage.css"></style>
