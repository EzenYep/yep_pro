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
                            <button
                                type="button"
                                class="btn btn-light item"
                                v-for="theaterName in theater_names"
                                :key="theaterName"
                                @click="titles(theaterName)"
                                :class="{ smaselected: selectedTheater === theaterName }"
                            >
                                {{ theaterName }}
                            </button>
                        </div>
                    </td>
                    <td class="caption-col"> <!-- 영화 -->
                        <h4 class="caption">영화 선택</h4>
                        <div class="list">
                            <button
                                type="button"
                                class="btn btn-light item"
                                v-for="movie in movies"
                                :key="movie.movie_id"
                                @click="selectMovie(movie)"
                                :class="{ selected: selectedMovie === movie.movie_title }"
                            >
                                {{ movie.movie_title }}
                            </button>

                        </div>
                    </td>
                    <td class="caption-col"> <!-- 시간 -->
                        <h4 class="caption">시간 선택</h4>
                        <div class="list">
                            <button
                                type="button"
                                class="btn btn-light item"
                                v-for="time in times"
                                :key="time"
                                @click="selectTime(time)"
                                :class="{ selected: selectedTime === time }"
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
                    <!-- Table rows for seat selection -->
                </table>
                <div>
                    <input
                        type="checkbox"
                        id="one-seat"
                        v-model="selectedSeats.oneSeat"
                        class="checkbox-large"
                        @click="handleClick('oneSeat')"
                    >
                    <label for="one-seat" class="label-large">1인석</label>

                    <input
                        type="checkbox"
                        id="two-seat"
                        v-model="selectedSeats.twoSeat"
                        class="checkbox-large"
                        @click="handleClick('twoSeat')"
                    >
                    <label for="two-seat" class="label-large">2인석</label>

                    <input
                        type="checkbox"
                        id="four-seat"
                        v-model="selectedSeats.fourSeat"
                        class="checkbox-large"
                        @click="handleClick('fourSeat')"
                    >
                    <label for="four-seat" class="label-large">4인석</label>
                </div>
                <p v-if="isSeatNotSelected">좌석을 선택해주세요.</p>

            </div>
        </div>
        <div> <!-- 좌석표 -->
            <div>
                <table class="select-seat">
                    <!-- Table rows for seat selection -->
                    <template v-for="(seatLine, index) in numbergroup" :key="index">
                        <tr>
                            <td>{{ seatLine[0] }}</td>
                            <template v-for="(seat, index2) in seatLine.slice(1)" :key="index2">
                                <td>
                                    <button
                                        type="button"
                                        :class="[
                                  'btn',
                                  'btn-light',
                                  { 'reserved-seat': isSeatReserved(seat) },
                                  { 'selected-seat': isSelected(seat) },
                                ]"
                                        @click="selectSeat(seat)"
                                    >
                                        {{ seat.seat_number }}
                                    </button>
                                </td>
                            </template>
                        </tr>
                    </template>
                </table>
            </div>
            <div class="button-container">
                <button @click="makeReservation">예약하기</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import axios from "axios";
import { reactive, ref, watchEffect, computed, onMounted, watch } from 'vue'
import store from "@/store/store";
const isSeatNotSelected = computed(() => selectedSeatIds.value.length === 0);
const selectedSeatIds = ref([]); // Track selected seat IDs

const theater_names = ref([]);
const selectedTheater = ref('');
const selectedTime = ref('');
const movies = ref([]);
const times = ref([])
const selectedMovie = ref(null); // 선택한 영화 객체를 저장하는 변수
const theater = ref({});
let movieId = ref('');
const seatNumber = ref('');

const numbers = ref([]);
const numbergroup = ref([]);

const reservedSeats = ref([]);


//체크박스로 1인 예매인지 2인 예매인지 4인 예매인지 확인하기 위해 필요
const selectedSeats = reactive({
    oneSeat: true,
    twoSeat: false,
    fourSeat: false,
})

//지역 선택시 극장 가져옴
const theater_seat = async (theaterId) => {
    theater_names.value = [];
    movies.value = [];
    times.value = [];
    selectedTheater.value = null;
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

        console.log("영화 데이터 받아오기");
        console.log(response);

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

// seat 함수 수정
const seat = async () => {
    const theater_name = selectedTheater.value;
    const response = await axios.post("http://localhost:9212/api/getSeat", { theater_name });

    if (response && response.data) {
        const movieSeat = response.data;
        const seats = movieSeat.map((seat) => ({
            seat_id: seat.seat_id,
            seat_number: seat.seat_number,
            seat_line: seat.seat_line
        }));

        const seatLines = [...new Set(seats.map((seat) => seat.seat_line))];

        const groupedSeats = seatLines.reduce((acc, seatLine) => {
            acc[seatLine] = seats.filter((seat) => seat.seat_line === seatLine);
            return acc;
        }, {});

        const sortedSeatLines = seatLines.sort();

        numbergroup.value = sortedSeatLines.map((seatLine) => {
            return [seatLine, ...groupedSeats[seatLine]];
        });
    }
};
const updateSeatStatus = () => {
    const selectedTheaterName = selectedTheater.value;
    const selectedMovieId = selectedMovie.value;
    const screeningTime = selectedTime.value;

    if (!selectedMovieId || !selectedTheaterName || !screeningTime) {
        return;
    }
    // 선택된 영화, 상영관, 시간에 따라 예약된 좌석을 가져오는 비동기 함수
    const fetchReservedSeats = async () => {
        try {
            const response = await axios.post("http://localhost:9212/api/getReserved", {
                movie_id: selectedMovieId,
                theater_name: selectedTheaterName,
                screening_time: screeningTime,
            });

            if (response && response.data) {
                reservedSeats.value = response.data;
            } else {
                reservedSeats.value = []; // 예약된 좌석이 없는 경우 빈 배열로 초기화
            }
        } catch (error) {
            console.error("예약된 좌석 정보를 가져오는 중에 오류가 발생했습니다:", error);
        }
    };

    // 예약된 좌석 정보 업데이트
    fetchReservedSeats();

    // 좌석 상태 업데이트 로직 작성
    // 예약된 좌석은 비활성화 처리
    const reservedSeatIds = reservedSeats.value.map((seat) => seat.seat_id);

    numbergroup.value.forEach((seatLine) => {
        seatLine.slice(1).forEach((seat) => {
            seat.disabled = reservedSeatIds.includes(seat.seat_id);
        });
    });
};

//영화에 대한 예약된 좌석 정보 가져오기
const reservedSeat = async () => {
    try {
        const movieId = selectedMovie.value;
        const theaterName = selectedTheater.value;
        const screeningTime = selectedTime.value;

        const response = await axios.post("http://localhost:9212/api/getReserved", {
            movie_id: movieId,
            theater_name: theaterName,
            screening_time: screeningTime,
        });

        if (response && response.data) {
            reservedSeats.value = response.data;
        } else {
            reservedSeats.value = []; // 예약된 좌석이 없는 경우 빈 배열로 초기화
        }
    } catch (error) {
        console.error("예약된 좌석 정보를 가져오는 중에 오류가 발생했습니다:", error);
    }
};
const isSeatReserved = (seat) => {
    return reservedSeats.value.some((reservedSeat) => reservedSeat.seat_id === seat.seat_id);
};

watchEffect(() => {
    if (selectedMovie.value && selectedTheater.value && selectedTime.value && theater_names.value) {
        seat();
        reservedSeat();
    }
});
const selectSeat = (seat) => {
    // 선택 유형에 따른 좌석 수를 결정합니다.
    const seatCount = selectedSeats.oneSeat ? 1 :
        selectedSeats.twoSeat ? 2 :
            selectedSeats.fourSeat ? 4 : 0;

    const currentSeatNumber = parseInt(seat.seat_number);  // 선택하려는 좌석의 번호입니다.
    const currentSeatLine = numbergroup.value.find(seatLine => seatLine[0] === seat.seat_line);

    // 현재 행의 마지막 좌석 번호를 찾습니다.
    const lastSeatNumberInCurrentLine = Math.max(...currentSeatLine.slice(1).map(s => parseInt(s.seat_number)));

    // 선택하려는 마지막 좌석의 번호는 현재 행의 마지막 번호와 `currentSeatNumber`에 `seatCount`를 더한 값 중 작은 값입니다.
    const endSeatNumber = Math.min(lastSeatNumberInCurrentLine, currentSeatNumber + seatCount - 1);

    // 선택하려는 모든 좌석들이 이미 예약되어 있지 않은지 확인합니다.
    for (let seatNumber = currentSeatNumber; seatNumber <= endSeatNumber; seatNumber++) {
        const targetSeat = currentSeatLine.slice(1).find(s => parseInt(s.seat_number) === seatNumber);
        if (!targetSeat || isSeatReserved(targetSeat)) {
            console.error(`선택하려는 좌석(${seat.seat_line}, ${seatNumber})은 이미 예약되어 있습니다.`);
            return;
        }
    }

    // 현재 행에 충분한 좌석이 남아있는지 확인합니다.
    const remainingSeatsInCurrentLine = lastSeatNumberInCurrentLine - currentSeatNumber + 1;
    if (remainingSeatsInCurrentLine < seatCount) {
        console.error(`선택하려는 좌석(${seat.seat_line}, ${currentSeatNumber} ~ ${endSeatNumber})은 충분하지 않습니다.`);
        return;
    }

    // 모든 좌석들이 선택 가능하다면 선택합니다.
    for (let seatNumber = currentSeatNumber; seatNumber <= endSeatNumber; seatNumber++) {
        const targetSeat = currentSeatLine.slice(1).find(s => parseInt(s.seat_number) === seatNumber);

        console.log('Selected Seat:', targetSeat);
        toggleSeatSelection(targetSeat);
    }
};




const toggleSeatSelection = (seat) => {
    const seatIndex = selectedSeatIds.value.indexOf(seat.seat_id);
    if (seatIndex === -1) {
        // 좌석이 선택되지 않은 경우, 선택 처리
        selectedSeatIds.value = [...selectedSeatIds.value, seat.seat_id];
    } else {
        // 좌석이 이미 선택된 경우, 선택 해제
        selectedSeatIds.value = [
            ...selectedSeatIds.value.slice(0, seatIndex),
            ...selectedSeatIds.value.slice(seatIndex + 1),
        ];
    }
};
const isSelected = (seat) => {
    return selectedSeatIds.value.includes(seat.seat_id);
};
const handleClick = (seatType) => {
    selectedSeatIds.value = [];
    if (seatType === 'oneSeat') {
        selectedSeats.oneSeat = true
        selectedSeats.twoSeat = false
        selectedSeats.fourSeat = false
    } else if (seatType === 'twoSeat') {
        selectedSeats.oneSeat = false
        selectedSeats.twoSeat = true
        selectedSeats.fourSeat = false
    } else if (seatType === 'fourSeat') {
        selectedSeats.oneSeat = false
        selectedSeats.twoSeat = false
        selectedSeats.fourSeat = true
    }
}

onMounted(() => {
    selectedSeats.oneSeat = true
    updateSeatStatus()
})


watch(selectedSeats, () => {
    console.log("ss")
    updateSeatStatus()
})
watch([selectedMovie, selectedTheater, selectedTime], () => {
    // 좌석 정보 초기화 로직을 여기에 작성하세요.
    selectedSeatIds.value = []; // 예약된 좌석 정보 초기화
    reservedSeats.value = []; // 예약된 좌석 정보 초기화
    updateSeatStatus(); // 좌석 상태 업데이트
});



<style scoped src="../assets/css/Reservation.css">
.checkbox-large {
    width: 25px;
    height: 25px;
}

.label-large {
    font-size: 20px;
    margin: 10px;
}

const makeReservation = async () => {
    const movieId = selectedMovie.value;
    const theaterName = selectedTheater.value;
    const screeningTime = selectedTime.value;
    const IMP = window.IMP;
    IMP.init("imp23252800")
    if (isSeatNotSelected.value) {
        // 좌석이 선택되지 않았을 때의 처리
        alert("좌석을 선택해주세요.");
        console.log("좌석을 선택해주세요.");
        return;
    } else if (store.state.email === '') {
        alert("로그인 해주세요.");
    } else {
        // 아임포트 결제 처리
        IMP.request_pay({
            pg: 'kcp',
            pay_method: 'card',
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: '영화 예매',
            amount: 1000,  // 결제할 금액을 입력하세요.
            buyer_email: store.state.email,
            buyer_name: '테스트 사용자',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시 강남구 신사동',
            buyer_postcode: '01181'
        }, (rsp) => {
            if (rsp.success) {
                // 결제 성공 시 처리
                console.log('결제 성공:', rsp);
                var msg = '결제가 완료되었습니다.';
                alert(msg);

                // 예약 처리
                reserveSeats(movieId, theaterName, screeningTime, selectedSeatIds.value, store.state.email);
            } else {
                // 결제 실패 시 처리
                console.log('결제 실패:', rsp.error_msg);
                var errorMsg = '결제에 실패하였습니다.';
                errorMsg += '에러내용: ' + rsp.error_msg;
                alert(errorMsg);
            }
       });
        // 예약 처리
        //reserveSeats(movieId, theaterName, screeningTime, selectedSeatIds.value, store.state.email);
    }
};

const reserveSeats = async (movieId, theaterName, screeningTime, seatIds, memberId) => {
    try {
        const response = await axios.post("http://localhost:9212/api/makeReservation", {
            movie_id: movieId,
            theater_name: theaterName,
            screening_time: screeningTime,
            seat_ids: seatIds,
            member_id: memberId
        });

        if (response && response.data) {
            console.log("예약 성공:", response.data);
        }
    } catch (error) {
        console.error("예약 중에 오류가 발생했습니다:", error);
    }
};

</script>

<style scoped src="../assets/css/Reservation.css">

</style>