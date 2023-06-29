<template>
<div class="container">
<br><br>
      <div class="Reservation">
        <div class="top">
         <div class="top-in">
            <div class="local">
                <h4>지역 선택</h4>
            </div>
             <div class="theater">
                <h4>상영관 선택</h4>
             </div>
             <div class="movie">
                <h4>영화 선택</h4>
             </div>
             <div class="time">
                <h4>시간 선택</h4>
             </div>
         </div>
                  <div class="mid-in">
            <div class="local">
                <div style="width:25%; height:450px; border:1px; float:left;">
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 15-px; height:50px; text-align:center">서울</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">경기</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">인천</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">강원</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">경상</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">충청/대전</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">부산/울산</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">전라/광주</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">제주</button>
                  </div>

                <div style="width:25%; height:450px; border:1px; float:left;">
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 15-px; height:50px; text-align:center">G17관</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">H5관</button>

                  </div>
 
                <div style="width:26%; height:450px; border:1px; float:left;">
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 15-px; height:50px; text-align:center">범죄도시3</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">엘리멘탈 뭐시기</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">트랜스포머 뭐시기</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">귀공자</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">스파이더맨 왈가불가</button>

                  </div>


                <div style="width:24%; height:450px; border:1px; float:left;">
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 15-px; height:50px; text-align:center">09:10</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">11:40</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">14:20</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">16:50</button><br>
                  <button type="button" class="btn btn-light;" style="font-size:20px; width: 150px; height:50px; text-align:center">19:20</button>
                  </div>

             </div>
         </div> 
   
                

   <div class="con1"  style="width:100%; border:1px; float:center; font-size:30px; color:#000000;"> 인원 / 좌석 </div>
   <hr class='hr-solid' style="width:100%; border : 0px; border-top: 5px solid #000000;"/>
   <br>
 
   <!--<div class="vr"></div>-->

 <div class="con1"  style="width:5%; border:1px; float:left; font-size:30px;"> </div>
  <div class="con1"  style="width:35%; border:1px; float:left; font-size:20px; text-color:#000000; text-align:center; "> 좌석 정보 </div>
  <div class="con1"  style="width:30%; border:1px; float:left;"> &nbsp;</div>
 <div class="con1"  style="width:30%; border:1px; float:left; font-size:20px; text-color:#000000;text-align:center;">
   상영관&nbsp; <div class="vr"></div>&nbsp; 상영날짜 &nbsp;<div class="vr"></div>&nbsp; 남은좌석&nbsp; </div>


 <hr class='hr-solid' style="width:35%; border : 0px; border-top: 5px solid #000000; float:left;"/>
 <hr class='hr-solid' style="width:30%; border : 0px; border-top: 5px solid background-color:rgba(0,0,0,0);  float:left;">
 <hr class='hr-solid' style="width:35%; border : 0px; border-top: 5px solid #000000;  float:left;">


 <div class='jb-y' style="width:5%; border : 0px; border-top: 5px solid background-color:rgba(0,0,0,0); float:left;"/>
 <div class='jb-n1' style="width:35%; border : 0px; float:left;">좌석정보가 표시</div>
 <div class='jb-y' style="width:30%; border : 0px; border-top: 5px solid background-color:rgba(0,0,0,0); float:left;">&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
 <div class='jb-n2' style="width:10%; border : 0px; float:left;">상영관</div>
 <div class='jb-n2' style="width:10%; border : 0px; float:left;">날짜시간</div>
 <div class='jb-n2' style="width:10%; border : 0px; float:left;">남은좌석</div>


<br><br><br><br><br><br><br>
  </div>
  <div class="row6" align="center">
    <br>
  <div class="con7"  style="width:85%; height:800px; border:1px; float:center; background-color:#11DEFB">
  </div>

  <br><br><br><br>
  <div class="row6" align="center">
    <br>
  <button type="button" class="btn btn-outline-primary" style="font-size:40px; width: 200px; height:150px;" @click="goPaymentPage">결제선택</button>
  <br><br><br>
  </div>

  </div>
  </div>
</div>
</template>

<script setup>
import router from '@/router';

const goPaymentPage = () => {
  router.push({
    name: 'payment',
  });
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.top {
    text-align: center;
   
}
.top-in {
      display: flex;
    flex-direction: row; 
    justify-content: space-around;
    width: calc(100% / 20%);
    
}

.local {
    border: 1px;
}




</style>