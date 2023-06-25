<template>
    <div class="container">
        <br>
        <div class="row" style = "background-color :gray">
            <div class="col1" align="right">
                <br>
                <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
      font-size: 1.3em; font-weight: bold">예매관리</button>
                <div class="vr"></div>
                <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
      font-size: 1.3em; font-weight: normal" @click="goMypageCrystal">회원관리</button>
            </div>

            <div class="col2" align="left" >
                <div style="width:30px; height:25px; border:1px; float:left;"></div>
                <div style="width:120px; height:25px; border:1px; float:left;">님 안녕하세연</div>


            </div>

            <br><br><br>

            <div class="col2" align="left">
                <div style="width:30px; height:25px; border:1px; float:left;"></div>
                <div style="width:80px; height:25px; border:1px; float:left;">예매 내역</div>
                <div style="width:20px; height:25px; border:1px; float:left;"></div>
                <div style="width:80px; height:25px; border:1px; float:left;">건</div>
            </div>
            <div>
                <br>
            </div>
            <div class="row2" align="center">
                <div class="con1"  style="width: 85%; height:155px; border:1px; float:center; background-color:#11DEFB">
                </div>
                <br>
            </div>
        </div>

        <div class="row" style="background-color : #000000">/* 빈공간(보이기 쉽게 컬러적용) */
            <br><br>
        </div>

        <div class="text1" align="left" style=" font-size:1.5em;">
            나의 예매 내역
        </div>
        <div class="row" style = "background-color :gray">

            <div class="row6" align="center">
                <br>
                <div class="con7"  style="width:85%; height:80px; border:1px; float:center; background-color:#11DEFB">
                </div>
            </div>
            <br><br>
            <div class="row3" align="center">
                <br>
                <div class="con2"  style="width:85%; height:185px; border:1px; float:center; background-color:#11DEFB">
                </div>
                <br>
            </div>
        </div>
        <div class="row" style="background-color : #000000">/* 빈공간(보이기 쉽게 컬러적용) */
            <br><br>
        </div>

        <div>

        </div>
        <div class="text1" align="left" style=" font-size:1.5em;">
            예매 취소 내역
        </div>
        <div class="row" style = "background-color :gray">
            <div class="row6" align="center">
                <br>
                <div class="con7"  style="width:85%; height:80px; border:1px; float:center; background-color:#11DEFB">
                </div>
            </div>
            <br><br>
            <div class="row3" align="center">
                <br>
                <div class="con2"  style="width:85%; height:155px; border:1px; float:center; background-color:#11DEFB">
                </div>
                <br>
            </div>
        </div>
        <div class="row" style="background-color : #000000">/* 빈공간(보이기 쉽게 컬러적용) */
            <br><br>
        </div>

        <div class="text1" align="left" style=" font-size:1.5em;">
            최근 본 영화
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
        <div class="row" style = "background-color :gray; height:250px;">

            <div class="row6" align="center">
                <br>
                <div class="con7"  style="width:85%; height:90%; border:1px; float:center; line-height:250%; background-color:#11DEFB ">

                    <div class="grid text-center" style="padding: 5px 5px 5px 5px;">
                        <div style="width:2%; height:25px; border:1px; float:left; line-height:250%; "></div>
                        <div style="width:20%; height:40px; border:1px; float:left; line-height:250%; background-color :#A00000;">★★★★★</div>
                        <div style="width:2%; height:25px; border:1px; float:left; line-height:250%;"></div>
                        <div style="width:20%; height:40px; border:1px; float:left; line-height:250%; background-color :#A02000;">닉네임 표시</div>
                        <div style="width:2%; height:25px; border:1px; float:left; line-height:250%;"></div>
                        <div style="width:50%; height:40px; border:1px; float:left;  line-height:250%; background-color :#000000;
      text-align :left ">&nbsp;&nbsp;리뷰 내용 표시.</div>
                    </div>


                </div>
                <div class="v-line2" align="right">
                    <br>
                    <button type="button" class="btn btn-light" style="font-size:15px; padding:6px 25px 6px 25px;">수정</button><div class="hello">
                </div> <button type="button" class="btn btn-danger" style="font-size:15px; padding:6px 25px 6px 25px;  margin-right: 10px;">삭제</button>
                </div>
            </div>

            <nav aria-label="Page navigation example">
                <br>
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </div>
        <div class="row" style="background-color : #000000">/* 빈공간(보이기 쉽게 컬러적용) */
            <br><br>
        </div>

        <div>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import router from '@/router';

const goMypageCrystal = () => {
    router.push({
        name: 'my_page_crystal',
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}

.slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
    overflow: hidden;
}

.slide {
    flex: 0 0 calc(100% / 4);
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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

.hello{
    width: 20px;
    height: auto;
    display: inline-block;
}
</style>