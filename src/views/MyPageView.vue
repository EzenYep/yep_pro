<template>
    <div>
        <div class="container">
            <br>
            <div class="row" style = "background-color :#FFFAF8">
                <div class="col1" align="right">
                    <br>
                    <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
          font-size: 1.3em; font-weight: bold">예매관리</button>
                     <div class="vr" style="color: #FF8551; opacity: 1;"></div>
                    <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
          font-size: 1.3em; font-weight: normal" @click="goMypageCrystal">회원관리</button>
                <!-- </div>
    
                <div class="col2" align="left" > -->
                    <div style="width:60px; height:25px; border:1px; float:left;">{{my_data.member_name}}</div>
                    <div style="width:120px; height:25px; border:1px; float:left;">님 안녕하세요</div>
               
                    <div style="width:30px; height:25px; border:1px; float:left;"></div>
                    <div style="width:80px; height:20px; border:1px; float:left;">예매 내역</div>
                        <div style="width: 80px; height: 15px; border: 1px; float: left;">{{ paymentCount }} 건</div>
                </div>
                <div>
                    <br>
                </div>
                <!-- <div class="row2" align="center">
                    <div class="con1"  style="width: 85%; height:155px; border:1px; float:center; background-color:#11DEFB">
                    </div>
                    <br>
                </div> -->
            </div>
    
            <div class="row" style="background-color : background-color:rgba(0,0,0,0);">
                <br><br>
            </div>
    <div class="row" style = "background-color :#FFFAF8">
            <div class="text1" align="left" style=" font-size:1.5em;">
              
                나의 예매 내역<button type="submit" class="small-button" @click="cancelSelectedReservations">예매취소</button>


            
            
    
                <div class="row6" align="center">
                    <br>
                    <div class="con7"  style="width:85%; height:180px; border:1px; float:center; background-color:#FFFAF8">
    
<table>
                            <thead>
                            <tr>
                                <th class="column column-small">구분</th>
                                <th class="column column-large">영화 이름</th>
                                <th class="column column-large">상영관</th>
                                <th class="column column-large">상영시간</th>
                                <th class="column column-large">좌석</th>
                                <th class="column column-large">예매상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(reservation, index) in reservationList" :key="index">
                            <td class="column column-small">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="reservation"
                                    v-model="selectedMovie"
                                />
                            </td>
                            <td>{{ reservation.movie_title }}</td>
                            <td>{{ reservation.theater_name }}</td>
                            <td>{{ reservation.screening_start_time }}</td>
                            <td>{{ reservation.seat_number }}</td>
                            <td>{{ reservation.pay_state }}</td>
                        </tr>
                        </tbody>

                        </table>
          
    
                      
                    </div>
                </div>
                </div>
                
                <br><br>
    
            </div>
              <nav aria-label="Page navigation example">
                    <div class="pagpag">
                <br>
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 0 }">
                        <a class="page-link" href="#" @click.prevent="gotoFirstPage" aria-label="First">
                            <span aria-hidden="true">&laquo;&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === 0 }">
                        <a class="page-link" href="#" @click.prevent="prevPage" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li
                        class="page-item"
                        v-for="page in visiblePages"
                        :key="page"
                        :class="{ active: page === currentPage + 1 }"
                    >
                        <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                        <a class="page-link" href="#" @click.prevent="nextPage" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                        <a class="page-link" href="#" @click.prevent="gotoLastPage" aria-label="Last">
                            <span aria-hidden="true">&raquo;&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
            </nav>
    
    
            
            <div class="row" style="background-color : background-color:rgba(0,0,0,0);">
                <br><br>
            </div>
    
            <div>
    
            </div>
    
            <div class="row" style="background-color :background-color:rgba(0,0,0,0);">
                <br><br>
            </div>
    
            <br><br>
            <div class="row" style = "background-color :#FFFAF8; height:250px;">
                <div class="row6" align="center">
                    <br>
                    <div class="con7"  style="width:85%; height:90%; border:1px; float:center; line-height:250%; background-color:rgba(0,0,0,0); ">
    
                    </div>
                </div>
    
            
            <MovieSlide></MovieSlide>
             <MyReview></MyReview>
            <div>
                </div>
            </div>
        </div></div>
    
</template>
    
    <script setup>
    import router from '@/router';
    import axios from "axios";
    import {reactive, ref, onMounted, computed} from "vue";
    import MyReview from "@/components/myReview.vue";
    import store from "@/store/store";
    const selectedMovie = ref([]);
    const email = store.state.email;
    const reservationList = ref([]);
    import MovieSlide from "@/components/MovieSlide.vue";
    
    // 유저 정보 불러오기 
    const my_data = reactive({
      member_name: "",
    });
    
    const myPage = async () => {
      const email = store.state.email;
      const body = { email };
      const res = await axios.post("http://localhost:9212/api/crystars", body);
      const code = res.data.code;
      if (code === 200) {
        my_data.member_name = res.data.member_name;
      } else if (code === 400) {
        alert("사용자 조회에 실패하셨습니다.");
      }
    };
    
    onMounted(myPage);
    
    
    // 결제 카운트
    const paymentCount = ref(0);
    
    async function fetchPaymentCount(email) {
      try {
        const response = await axios.post('http://localhost:9212/api/get-payment-count', { member_email: email });
        return response.data.count;
      } catch (error) {
        console.error('결제 개수 조회 실패', error);
        return 0;
      }
    }
    
    // 예매내역
    
    
    const getReservationStatus = async () => {
        try {
            const email = store.state.email;
            const response = await axios.post('http://localhost:9212/api/getReservationStatus', { email });
            reservationList.value = response.data; // Directly assign the data to reservationList
        } catch (error) {
            console.error('예매 정보를 가져오는데 실패하였습니다:', error);
            // 오류 처리 로직 추가
        }
    };
    
    onMounted(getReservationStatus);
    
    // 예매취소
    const cancelSelectedReservations = async () => {
        const selectedReservations = selectedMovie.value.map((reservation) => reservation.payment_id);
        console.log(selectedMovie.value.map(reservation => Object.keys(reservation)));
        console.log(selectedReservations)
        console.log(selectedMovie)
        if (selectedReservations.length === 0) {
            console.log("취소할 예매가 선택되지 않았습니다.");
            return;
        }
    
        if (window.confirm("정말로 선택된 예매를 취소하시겠습니까?")) {
            try {
                if (!reservationList.value || reservationList.value.length === 0) {
                    console.log("예매 정보가 없습니다.");
                    return;
                }
    
                // 데이터베이스 업데이트
                const response = await axios.post('http://localhost:9212/api/cancelReservations', {
                     selectedReservations,
                });
    
                if (response.data) { // Check if the update was successful
                    reservationList.value = reservationList.value.map((reservation) => {
                        if (selectedReservations.includes(reservation.payment_id)) {
                            return {
                                ...reservation,
                                pay_state: 0,
                            };
                        }
                        return reservation;
                    });
                } else {
                    console.error('예매 취소 실패:', response.data.error);
                }
    
                console.log(response.data);
            } catch (error) {
                console.error('예매 취소 실패:', error);
            }
        } else {
            console.log("취소 취소");
        }
    };
    
    
    
    
    // ------------------------------------------------------------------------------------------------
    
    
    
    const goMypageCrystal = () => {
        router.push({
            name: 'my_page_crystal',
        });
    };
    

    
// 페이징 처리
let currentPage = ref(0);
let reservationsPerPage = ref(3);

const currentPageReservations = computed(() => {
    const start = currentPage.value * reservationsPerPage.value;
    const end = start + reservationsPerPage.value;
    return reservationList.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(reservationList.value.length / reservationsPerPage.value));

const pageRange = computed(() => {
    const start = Math.max(currentPage.value - 2, 0);
    const end = Math.min(start + 5, totalPages.value);
    return { start, end };
});

const visiblePages = computed(() => {
    const { start, end } = pageRange.value;
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
    }
};

const gotoPage = (page) => {
    currentPage.value = page - 1;
};

const gotoFirstPage = () => {
    currentPage.value = 0;
};

const gotoLastPage = () => {
    currentPage.value = totalPages.value - 1;
};

    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    
    /* 여기서부터 무비차트*/

    .pagpag{
        display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-grow: 1;
    }

    /* .movie-chart {
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
    */
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
    
    
    /* .horizontal-layout {
        display: flex;
        align-items: center;
        margin-top: 10%;
        margin-bottom: 30%;
    }
    
    .hello{
        width: 20px;
        height: auto;
        display: inline-block;
    } */
    
    /************* 회원조회 칼럼 *************/
   table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #FF8551;
  text-align: center;
  font-size: 15px; /* 원하는 폰트 크기로 수정하세요 */
}

td {
  padding: 40px;
  text-align: left;
  border-bottom: 1px solid #FF8551;
  text-align: center;
  font-size: 15px; /* 원하는 폰트 크기로 수정하세요 */
}

th.column {
  background-color: #FFFAF8;
  text-align: center;
}

th.column-small {
  width: 80px;
}

th.column-large {
  width: 200px;
}

.btn-danger {
  font-size: 15px;
  padding: 6px 25px 6px 25px;
  margin-right: 10px;
}

.btn-light {
  font-size: 15px;
  padding: 6px 25px 6px 25px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-grow: 1;
}

.button-container {
  text-align: right;
  flex-shrink: 0;
}

.content-container {
  height: 45px;
  overflow-y: auto;
}

.small-button {
  float: right;
  background-color: #FFE2C0;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 16px;
  padding: 6px 20px; /* 버튼의 패딩을 조정하여 크기 유지 */
  border: 1px solid black;
}
    
    </style>