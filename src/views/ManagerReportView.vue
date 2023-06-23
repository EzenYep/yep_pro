<template>
    <div class="container">
        
        <div class="search-wrap">
            <div class="search">
                <input type="text" class="searchTerm" placeholder="검색">
                <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
                </button>
            </div>
        </div>

        <div class="user-wrap">
            <h1>신고관리</h1>
            <hr>
        </div>

        <div class="button-group">
            <table>
                <tr>
                    <button type="button" class="btn btn-outline-secondary">유저 삭제</button>
                    <button type="button" class="btn btn-outline-secondary">신고글 삭제</button>
                </tr>
            </table>
        </div>
        
    <div class="user-list">
      <table>
        <thead>
          <tr>
            <th class="column column-small">구분</th>
            <th class="column column-large">신고자 이메일</th>
            <th class="column column-large">신고 내용</th>
            <th class="column column-large">신고 대상</th>
            <th class="column column-large">신고 날짜</th>
            <th class="column column-small">신고 시각</th>
            <th class="column column-small">선택</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.reportEmail }}</td>
            <td>{{ user.detail }}</td>
            <td>{{ user.target }}</td>
            <td>{{ user.date }}</td>
            <td>{{ user.time }}</td>
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="user.id"
                v-model="selectedUsers"
              >
            </td>

          </tr>
        </tbody>   
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr> 
            <tr>
                <td colspan="7">
                    <input class="form-check-input me-1" type="checkbox" value="" id="checkbox1">
                    <label class="form-check-label" for="checkbox1"></label>
                </td>
            </tr>               
      </table>
    </div>

    <div class="button-group2">
        <tr>
            <button type="button" class="btn btn-outline-secondary">닫기</button>
        </tr>
    </div>


    <div class="row">
		<div class="col-sm-12 text-xs-center">
			<nav class="navigation pagination" role="navigation">
				<div class="nav-links">
					<a class="prev page-numbers" href="#"><i class="ion-ios-arrow-back"></i></a>
					<a class='page-numbers' href='#'>1</a>
                    <a class='page-numbers' href='#'>2</a>
					<a class='page-numbers' href='#'>3</a>
					<a class='page-numbers' href='#'>4</a>
                    <a class='page-numbers' href='#'>5</a>
					<span class="page-numbers dots">&hellip;</span>
					<a class='page-numbers' href='#'>8</a>
					<a class="next page-numbers" href="#"><i class="ion-ios-arrow-forward"></i></a>
				</div>
			</nav>
		</div>
	</div>
    
    </div>
</template>

<script>
/*
export default {
  data() {
    return {
      userList: [], // 유저 리스트
      selectedUsers: [] // 선택된 유저 ID를 저장할 배열
    };
  },
  methods: {
    deleteUsers() {
      // 선택된 유저 삭제 기능 구현
      for (const userId of this.selectedUsers) {
        // userId를 이용하여 유저 삭제 로직 작성
      }
    },
    deleteReports() {
      // 선택된 신고글 삭제 기능 구현
      // 선택된 유저 ID를 이용하여 해당 유저의 신고글 삭제 로직 작성
    }
  }
};
*/
</script>



<style scoped>
/***********신고 관리**********/
.container{
  position: relative;
  margin-left: 80px;
  margin-right: 100px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

hr {
  height: 3px;
  background-color: #000000;
  border: none;
  margin-bottom: 20px;
}

/********************* 검색 버튼과 전체 스타일 *******************/
body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #000000;
  border-right: none;
  padding: 5px;
  height: 35px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #000000;
}

.searchTerm:focus{
  color: #000000;
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

.search-wrap{
  width: 250px;
  position: relative;
  margin-left: 1050px;
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
  margin-left: 500px;
  margin-top: 120px;
}

/************회원 삭제, 신고글 삭제,닫기 버튼**********/
.button-group {
  position: relative;
  align-items: center;
  margin-left: 1000px;
  margin-top: 10px;
}

.button-group button {
  margin-right: 10px;
  width: 130px;
  height: 40px;
}

.button-group2 {
  position: relative;
  align-items: center;
  margin-left: 1200px;
  margin-top: 10px;
}


</style>
