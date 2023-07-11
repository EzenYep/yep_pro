<template>
    <div>
        <!-- 지역,상영관,영화,시간 선택 -->
        <div>
            <table class="movie-option">
                <tr>
                    <td class="caption-col"> <!-- 지역 -->
                        <h4 class="caption">지역 선택</h4>
                        <div class="list">
                            <button type="button" class="btn btn-light;" @click="theater_seat(1)">서울</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(2)">인천</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(3)">경기</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(4)">강원</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(5)">경상</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(6)">충청/대전</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(7)">부산/울산</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(8)">전라/광주</button>
                            <button type="button" class="btn btn-light;" @click="theater_seat(9)">제주</button>
                        </div>
                    </td>
                    <td class="caption-col"> <!-- 상영관 -->
                        <h4 class="caption">상영관 선택</h4>
                        <div class="list">
                            <button type="button" class="btn btn-light; item;" v-for="theaterName in theater_names" :key="theaterName" @click="titles(theaterName)">
                                {{ theaterName }}
                            </button>
                        </div>
                    </td>
                    <td class="caption-col"> <!-- 영화 -->
                        <h4 class="caption">영화 선택</h4>
                        <div class="list">
                            <button
                                type="button"
                                class="btn btn-light; item;"
                                v-for="movie in movies"
                                :key="movie"
                                @click="selectMovie(movie)"
                            >
                                {{ movie.movie_title}}
                            </button>
                        </div>
                    </td>
                    <td class="caption-col"> <!-- 시간 -->
                        <h4 class="caption">시간 선택</h4>
                        <div class="list">
                            <button
                                type="button"
                                class="btn btn-light; item;"
                                v-for="time in times"
                                :key="time"
                                @click="selectTime(time)"
                            >
                                {{ time }}
                            </button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- 좌석 선택 -->
        <div>
            <div>
                <table class="select-seat">
                    <tr>
                        <td class="select-seat-title" colspan='5'><h4>인원 좌석</h4></td>
                    </tr>
                    <tr class="blank-row"></tr>
                    <tr> <!-- 좌석 정보 -->
                        <td class="info-left">
                            <h4>좌석정보</h4>
                        </td>
                        <td class="blank"></td>
                        <td class="info-right"> <!-- 상영관 -->
                            <h4>상영관</h4>
                        </td>
                        <td class="info-right"> <!-- 상영시간 및 시간 -->
                            <h4>상영시간 및 시간</h4>
                        </td>
                        <td class="info-right"> <!-- 남은좌석 -->
                            <h4>남은 좌석</h4>
                        </td>
                    </tr>
                    <tr>
                        <td class="info-left-detail">
                            <h4>좌석 정보 뜨는 곳</h4>
                        </td>
                        <td class="blank"></td>
                        <td class="info-right-detail">
                            <h4>{{ selectedTheater }}</h4>

                        </td>
                        <td class="info-right-detail">
                            <h4>{{ selectedTime }}</h4>
                        </td>
                        <td class="info-right-detail">
                            <h4>남은 좌석 뜨는 곳</h4>
                        </td>
                    </tr>
                </table>
                <div>
                    <input type="checkbox" id="one-seat" v-model="selectedSeats.oneSeat" class="checkbox-large" @click="handleClick('oneSeat')">
                    <label for="one-seat" class="label-large">1인석</label>

                    <input type="checkbox" id="two-seat" v-model="selectedSeats.twoSeat" class="checkbox-large" @click="handleClick('twoSeat')">
                    <label for="two-seat" class="label-large">2인석</label>

                    <input type="checkbox" id="four-seat" v-model="selectedSeats.fourSeat" class="checkbox-large" @click="handleClick('fourSeat')">
                    <label for="four-seat" class="label-large">4인석</label>
                </div>
            </div>
        </div>
      <div> <!-- 좌석표 -->
            <div>
            <table>
                <template v-for="(seatLine, index) in numbergroup" :key="index">
                    <tr>
                        <td>{{ seatLine[0] }}</td> <!-- Display seat line -->
                        <template v-for="(seatNumber, index2) in seatLine.slice(1)" :key="index2"> <!-- Iterate over seat numbers -->
                            <td>
                                <button type="button" class="btn btn-light;" @click="selectSeat(seatNumber)">
                                    {{ seatNumber }}
                                </button>
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
        </div>
    </div>
</template>


<script setup>
import axios from "axios";
import { reactive, ref, watchEffect, computed } from 'vue'


const theater_names = ref([]);
const selectedTheater = ref('');
const selectedTime = ref('');
const movies = ref([]);
const times = ref([])
const selectedMovie = ref(null); // 선택한 영화 객체를 저장하는 변수
const theater = ref({});
let movieId = ref('');
const seatNumber = ref('');
const numbers = ref ([]);
const numbergroup = ref ([]);




//체크박스로 1인 예매인지 2인 예매인지 4인 예매인지 확인하기 위해 필요
const selectedSeats = reactive({
    oneSeat: false,
    twoSeat: false,
    fourSeat: false,
});

//지역 선택시 극장 가져옴
const theater_seat = async (theaterId) => {
    // 지역 선택시 모든 정보 초기화
    theater_names.value = [];
    movies.value = [];
    times.value = [];
    selectedTheater.value = null
    selectedMovie.value = null;
    console.log("함수 실행", theaterId);
    const response = await axios.post("http://localhost:9212/api/getTheaterId", { theaterId: theaterId });

    console.log("값 받아오기");
    console.log(response);
    console.log("값 확인 후 이벤트 실행");


    if (response && response.data) {
        theater_names.value = [response.data.theater_name];
    }
};

//극장 선택시 영화제목 가져옴
const titles = async (theaterName) => {
    try {
        console.log(theaterName);
        movies.value = [];
        times.value = [];
        selectedMovie.value = null;
        selectedTheater.value = null;
        const response = await axios.post("http://localhost:9212/api/getTitleID", {
            theaterName
        });

        if (response && response.data) {
            const movieList = response.data;
            const moviesWithId = movieList.map((movie) => ({
                movie_id: movie.movie_id,
                movie_title: movie.movie_title
            }));
            movies.value = moviesWithId;
            selectedTheater.value = theaterName;


        }
    } catch (error) {
        console.error("영화 정보를 가져오는 중에 오류가 발생했습니다:", error);
    }
};

const selectMovie = async (movie) => {
    try {
        console.log(movie.movie_id);
        selectedTime.value = null;
        const response = await axios.post("http://localhost:9212/api/getScreenTime", { movieId: movie.movie_id });
        console.log(response.data);

        // 상영 시작 시간을 배열로 변환  
        selectedMovie.value = movie.movie_title;
        times.value = response.data.map((screening) => screening.screening_start_time);
        console.log(times)
    } catch (error) {
        console.error("상영 시간을 가져오는 중에 오류가 발생했습니다:", error);
    }
};
const selectTime = (time) => {
    // 선택한 시간에 대한 처리 로직 작성
   
    selectedTime.value = time;
};


const seat = async () => {
    console.log(selectedTheater);
    console.log("살려줘");
    const theater_name = selectedTheater.value;
    const response = await axios.post("http://localhost:9212/api/getSeat", { theater_name });
    console.log(response.data);

    if (response && response.data) {
        const movieSeat = response.data;

        const seatNumbers = movieSeat.map((seat) => seat.seat_number);
        const seatLines = movieSeat.map((seat) => seat.seat_line);

        // Group seat numbers by seat lines
        const groupedSeats = seatNumbers.reduce((acc, seatNumber, index) => {
            const seatLine = seatLines[index];
            if (!acc[seatLine]) {
                acc[seatLine] = [];
            }
            acc[seatLine].push(seatNumber);
            return acc;
        }, {});

        // Sort seat lines alphabetically
        const sortedSeatLines = Object.keys(groupedSeats).sort();

        // Populate numbergroup with seat lines and corresponding seat numbers
        numbergroup.value = sortedSeatLines.map((seatLine) => {
            const seatNumbers = groupedSeats[seatLine];
            return [seatLine, ...seatNumbers];
        });
    }
};
//영화에 대한 예약된 좌석 정보 가져오기
const reservedSeat = async () => {
    try {
        // 선택한 영화의 아이디와 극장 이름, 상영 시간
        const movieId = selectedMovie.value;
        const theaterName = selectedTheater.value;
        const screeningTime = selectedTime.value;

        // 백엔드에 요청을 보내고, 응답을 받아옵니다.
        const response = await axios.post("http://localhost:9212/api/getReserved", { movie_id: movieId, theater_name: theaterName, screening_time: screeningTime });

        // 받아온 응답을 화면에 표시하거나 필요한 작업을 수행합니다.
        // 예약된 좌석 정보를 화면에 표시하는 로직은 구현하셔야 합니다.
        console.log("예약된 좌석 정보");
        console.log(response.data);
    } catch (error) {
        console.error("예약된 좌석 정보를 가져오는 중에 오류가 발생했습니다:", error);
    }
};


watchEffect(() => {
    console.log(selectedMovie.value);
    console.log(selectedTheater.value);
    console.log(selectedTime.value);
    console.log("55"+selectedMovie.value+selectedTheater.value+selectedTime.value);
    // 모두 null이 아닐 때만 함수를 실행합니다.
    if (selectedMovie.value && selectedTheater.value && selectedTime.value) {
        seat(); // 실행할 함수
    }
});

const handleClick = (seatType) => {
    if(seatType !== 'oneSeat'){
        selectedSeats.oneSeat = false;
    }
    if(seatType !== 'twoSeat'){
        selectedSeats.twoSeat = false;
    }
    if(seatType !== 'fourSeat'){
        selectedSeats.fourSeat = false;
    }
}

</script>


<style scoped src="../assets/css/Reservation.css">
.checkbox-large {
    width: 25px;
    height: 25px;
}

.label-large {
    font-size: 20px;
    margin: 10px;
}


</style>