<template>
  <div class="container">
    <div class="menu">
        <div class="container-left">
        <h4>영화 관리</h4>
      <div class="horizontal-line" ></div>
      <h5 style="margin-left:1rem;" @click="movie_input">&gt; 영화 등록</h5>
      <h5 style="margin-left:1rem; margin-top:3rem;" @click="correction">&gt; 영화 수정</h5>
      <h4 style="margin-top:30%;">커뮤니티 관리</h4>
      <div class="horizontal-line"></div>
      <h5 style="margin-left:1rem;" @click="gomanager_report">&gt; 신고 관리</h5>
    </div>
    <div class="container-center"></div>
    <div class="container-right">
        <h4>회원 관리</h4>
      <div class="horizontal-line"></div>
      <h5 style="margin-left:1rem;" @click="gomanager_user">&gt; 회원 조회</h5>
    </div>
    </div>
    <div class="last">  
      <h6 class="teamname">Yep | 이용약관 | 개인정보처리방침 | 이현진 | 김영강 | 윤종혁 | 문정혜 | 방우리 | 황 건</h6>
    </div>
  </div>
    
</template>
<script setup>
import router from "@/router";

const gomanager_report =()=>{
    router.push({
        name: 'manager_report',
    });
}
const gomanager_user =()=>{
    router.push({
        name: 'manager_user',
    });
}
const movie_input =()=>{
    router.push({
        name: 'movie_input',
    });
}
const correction =()=>{
    router.push({
        name: 'correction',
    });
}


</script>
<style scoped>
.container {
    overflow: hidden;
    position: relative;
}
.menu {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

.container-left,
.container-right {
  flex-grow: 1;
}

.container-center {
  width: 50px; /* 가운데 여백 크기 조정 */
}

.horizontal-line {
  height: 1px;
  background-color: black;
  margin-bottom: 5%;
}

.container-center::before,
.container-center::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  background-color: black;
}

.last {
    display: flex;
    align-items: center;
    margin-top: 50%;
  }
  
.teamname {
    margin-right: auto;
  }
</style>
