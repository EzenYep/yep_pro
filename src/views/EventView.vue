<template>
    <div class="container">
        <div class="caption">
            <h3 style="margin-left:1rem;">Event</h3>
            <div class="horizontal-line" style="background-color:#FF8551" ></div>
        </div>
        <div class="caption-event">
            <h5 style="margin-left:1rem;">회원가입 대박 이벤트</h5>
            <div class="horizontal-line-event" style="background-color:#FF8551" ></div>
        </div>
        <div class="event-img">
            <img class="event-img-detail" src="../img/event.png">
            
            
        </div>
        <div class="event-img2">
            <img class="event-img-datail" src="../img/red.png">
        </div>
        <div class="back-btn">
            <!--<button class="back-btn-detail" style=" background-color: #FFE2C0;  border-radius: 10px;  border:1px solid black;" @click="goBack">뒤로 가기</button>-->
        </div>
        <div class="last">  
            <h6 class="teamname">Yep | 이용약관 | 개인정보처리방침 | 이현진 | 김영강 | 윤종혁 | 문정혜 | 방우리 | 황 건</h6>
            <button class="topbutton" style="  opacity:0.5;  border:1px solid black;" @click="scrollToTop">TOP</button>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';

const goBack = () => {
    router.go(-1);
}

const scrollToTop = () => {
   window.scrollTo({
   top: 0,
   behavior: 'smooth' // 부드러운 스크롤을 위해 behavior를 "smooth"로 설정
 });
};
</script>


<style scoped>
.container {
    overflow: hidden;
    position: relative;
}
.horizontal-line {
  height: 2px;
  background-color: black;
  margin-bottom: 5%;
}

.horizontal-line-event {
  height: 1px;
  background-color: black;
  margin-bottom: 5%;
}

.caption {
    margin-top: 5%;
}
.caption-event {
    margin-top: 10%;
}

.event-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.back-btn {
    margin-top: 10%;
    display: flex;
    align-items: center;
    margin-bottom: 30%;
}

.back-btn-detail {
    margin-left: auto;
    width: 7rem;
    height: 3rem;
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
    margin-bottom: 3%;
  }

</style>