<template>
  <div class="container">
    <div class="user-wrap">
      <h3>회원조회</h3>
      <div class="horizontal-line" ></div>
    </div>

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
            <th class="column column-small">이름</th>
            <th class="column column-large">이메일</th>
            <th class="column column-large">휴대폰번호</th>
            <th class="column column-large">생년월일</th>
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
            <td :style="{ color: 'black' }">{{ user.member_name }}</td>
            <td :style="{ color: 'black' }">{{ user.member_email }}</td>
            <td :style="{ color: 'black' }">{{ user.birthday }}</td>
            <td :style="{ color: 'black' }">{{ user.tel }}</td>
          </tr>
        </tbody>               
      </table>
    </div>

    <div class="twobtn">
      <div class="button-group">
        <table>
          <tr>
            <button type="button" class="btn btn-outline-secondary" @click="goBack">닫기</button>
            <button type="button" class="btn btn-outline-secondary" @click="deleteUsers">삭제</button>
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
import { ref, computed, onMounted, watchEffect } from 'vue';
import router from '@/router';
import axios from 'axios';

const userList = ref([]);
const selectedUsers = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const searchKeyword = ref('');

const filteredUserList = computed(() => {
  return userList.value.filter(user => user.state !== 1 && user.member_name.includes(searchKeyword.value));
});

const paginatedUserList = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredUserList.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredUserList.value.length / pageSize.value);
});

onMounted(getUserList);

async function getUserList() {
  try {
    const response = await axios.get('http://localhost:9212/api/getUserList');
    userList.value = response.data.userList.map(user => ({
      ...user,
      selected: false
    }));
  } catch (error) {
    console.error(error);
  }
}

function selectUser(user) {
  const index = selectedUsers.value.findIndex(u => u.member_id === user.member_id);

  if (index > -1) {
    selectedUsers.value.splice(index, 1);
  } else {
    selectedUsers.value.push(user);
  }
}

function deleteUsers() {
  const values = selectedUsers.value.map(user => user.member_id); // 선택된 유저의 member_id를 가져옵니다
  
  if (values.length === 0) {
    console.log("삭제할 컨텐츠가 없습니다");
    return;
  }

  if (window.confirm("정말로 선택된 회원을 삭제하시겠습니까?")) {
    axios
      .post("http://localhost:9212/api/manager_user", { values })
      .then((res) => {
        if (res.data.code === 200) {
          console.log("삭제 성공"); // 창을 새로고침합니다
          userList.value = userList.value.filter(user => !values.includes(user.member_id));
          selectedUsers.value = [];
        }
      })
      .catch((err) => {
        console.log(err);
      });
      location.reload();
  } else {
    console.log("삭제 취소");
  }
}

function changePage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
}

function goBack() {
  router.push({
    name: 'manager_main'
  });
}

const searchInput = ref('');
const isSearchDisabled = ref(true);


watchEffect(() => {
  isSearchDisabled.value = searchInput.value.length === 0;
});

  const handleSearch = () => {
    searchKeyword.value = searchInput.value; // 검색 키워드 업데이트

    // 검색 결과를 화면에 표시하거나 다른 작업을 수행합니다.

    searchInput.value = ''; // 검색 입력 초기화
    isSearchDisabled.value = true; // 검색 버튼 비활성화
  };


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
  margin-bottom: 5%;
}

/********************* 검색 버튼과 전체 스타일 *******************/
.user-wrap {
  margin-top: 5%;
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
    margin-top: 10px;
    margin-bottom: 50px;
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
  padding: 30px;
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

.twobtn {
  display: flex;
  align-items: center; 
}
.button-group {
  margin-left: auto;
  margin-top: 3%  ;
}

</style>


