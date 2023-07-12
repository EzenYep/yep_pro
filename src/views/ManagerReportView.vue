
<template>
  <div class="container">
    
    <div class="container-header">
      <div class="user-wrap">
      <h3>신고관리</h3>
      </div>

      <div class="twobtn">
      <div class="button-group">
        <table>
            <tr>
                <button type="button" class="btn btn-outline-secondary" @click="deleteReportUsers">유저 삭제</button>
                <button type="button" class="btn btn-outline-secondary" @click="deleteComment">신고글 삭제</button>
            </tr>
        </table>
      </div>
    </div>
    </div>


    <div class="horizontal-line" ></div>

    <div>
      <div class="wrap">
        <div class="search">
          <div>
            <input type="text" class="searchTerm" placeholder="검색어를 입력하세요." v-model="searchInput" />
            <button type="button" class="searchButton" @click="handleSearch" :disabled="isSearchDisabled">O</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-list">
      <div class="user-list">
      <table>
        <thead>
          <tr>
            <th class="column column-small">구분</th>
            <th class="column column-large">신고자 이메일</th>
            <th class="column column-large">리뷰 내용</th>
            <th class="column column-large">신고 대상</th>
            <th class="column column-large">신고 날짜/시각</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUserList" :key="user.id">

              <td>
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="user.id"
                  v-model="user.selected"
                  @change="selectUser(user)"
                />
              </td>
            <td :style="{ color: 'black' }">{{ user.reporter_email }}</td>
            <td :style="{ color: 'black' }">{{ user.comment }}</td>
            <td :style="{ color: 'black' }">{{ user.payment_member_email }}</td>
            <td :style="{ color: 'black' }">{{ user.reporttime }}</td>
          </tr>
        </tbody>            
      </table>
    </div>

    <div class="onebtn">
      <div class="button-group">
        <table>
            <tr>
                <button type="button" class="btn btn-outline-secondary" @click="goback">닫기</button>
            </tr>
        </table>
      </div>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }" >
            <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
          <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
            <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';

const paginatedUserList = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const totalUsers = ref(0);
const totalPages = ref(0);

async function fetchReportData() {
  try {
    const response = await axios.get('http://localhost:9212/api/getReportDetails');
    const reportData = response.data;
    totalUsers.value = reportData.length;
    totalPages.value = Math.ceil(totalUsers.value / pageSize);

    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    paginatedUserList.value = reportData.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Failed to fetch report data:', error);
  }
}
let a = ref('');
function selectUser(user) {
  a.value = user.payment_member_email
  // 유저 선택에 대한 동작을 수행하는 로직을 작성하세요
  console.log(a)
}

function changePage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
    fetchReportData();
  }
}


onMounted(fetchReportData);


function deleteReportUsers() {
  const values =a.value; 
  location.reload();
  
  if (values.length === 0) {
    console.log("삭제할 컨텐츠가 없습니다");
    return;
  }

  if (window.confirm("정말로 선택된 회원을 삭제하시겠습니까?")) {
    alert(values);
    axios
      .post("http://localhost:9212/api/deleteReport", { values })
      .then((res) => {
        if (res.data.code === 200) {
          console.log("삭제 성공"); // 창을 새로고침합니다
          paginatedUserList.value = paginatedUserList.value.filter(user => !user.selected);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("삭제 취소");
  }
}

function deleteComment() {
  const selectedReviews = paginatedUserList.value
    .filter(user => user.selected)
    .map(user => user.review_id);

  if (selectedReviews.length === 0) {
    console.log("삭제할 댓글이 선택되지 않았습니다.");
    return;
  }

  if (window.confirm("정말로 선택된 리뷰를 삭제하시겠습니까?")) {
    axios
      .post("http://localhost:9212/api/deleteComment", { reviewIds: selectedReviews })
      .then((res) => {
        if (res.status === 200) {
          console.log("리뷰 삭제 성공");
          paginatedUserList.value = paginatedUserList.value.filter(user => !user.selected);
        }
      })
      .catch((err) => {
        console.error("리뷰 삭제 실패:", err);
      });
  } else {
    console.log("삭제 취소");
  }
}

function goback() {
  router.push({
    name: 'manager_main'
  });
}

</script>


<style scoped>
/***********회원 조회**********/
.container{
  position: relative;
  overflow: hidden;;
}

.horizontal-line {
  height: 1px;
  background-color: black;
}

/********************* 검색 버튼과 전체 스타일 *******************/
.container-header {
  display: flex;
  align-items: center;
  margin-top: 5%;
}

.user-wrap {
  margin-right: auto;  
}

.twobtn {
  margin-left: auto; 
}

.searchTerm {
  width: 30%;
  height: 2rem;
  border: 3px solid #000000;
  border-right: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #000000;
}

.searchTerm:focus{
  color: #000000;
}

.search {
    position: relative;
    margin-top: 2%;
    margin-bottom: 2%;
    /* left: 66.5%;  /* 야매로 왼쪽기준으로 만듬 */
    text-align: right;
}

.searchButton {
  width: 40px;
  height: 35px;
  border: 1px solid white;
  background: #000000;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/************* 회원조회 칼럼 *************/
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

th{
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;

}

td {
  padding: 40px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th.column {
  background-color: #f2f2f2;
}

th.column-small {
  width: 80px;
}

th.column-large {
  width: 200px;
}

/*********** 페이지 표시하는 번호 탭 *************/
a {
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.nav-links a {
	margin: 1rem .6rem;
}
.nav-links a.page-numbers {
	color: #000000;
}
.nav-links a.page-numbers:hover {
	color: #000000;
}
.nav-links .page-numbers.current,
.nav-links .page-numbers.dots {
	color: #000000;
}
.nav-links a.next,
.nav-links a.prev {
	display: inline-block;
	padding: .2rem .8rem;
	background-color: #000000;
	color: #fff;
	border-radius: 2px;
}
.nav-links a.next:hover,
.nav-links a.prev:hover {
	color: #fff;
}

.nav-links a.prev::before,
.nav-links a.next::after {
	content: "";
	position: relative;
	display: inline-block;
	width: 10px;
	height: 10px;
	border-left: 2px solid #ffffff;
	border-bottom: 2px solid #ffffff;
	margin-right: 5px;
}

.nav-links a.prev::before {
	transform: rotate(45deg);
}

.nav-links a.next::after {
	transform: rotate(-135deg);
}

.row{
  position: relative;
  margin-left: 38%;
}

.onebtn {
  display: flex;
  align-items: center; 
}
.button-group {
  margin-left: auto;
  margin-top: 3%  ;
}

</style>
