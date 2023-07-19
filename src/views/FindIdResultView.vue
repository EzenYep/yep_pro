<template>
  
  <div class="findUser-box">
      <h2>아이디 찾기 결과</h2>

      <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>

      <div class="message">
          입력 하신 정보의 아이디(이메일) 입니다.
      </div>

      <div class="result">
          <h1>{{ $route.query.memberEmail }}</h1>
      </div>

    <div class="d-flex justify-content-center" >
    <button id="next" type="button" style="border: 1px solid #000000;" @click="login"><label>로그인 창으로</label></button>
  </div>
  </div>

</template>

<script setup>
import router from "@/router";




// ------------------------------------------------------------------------------------


const login=() => {
  router.push({
      name: 'login'
  });
}
// ------------------------------------------------------------------------------------

</script>

<style scoped>

.findUser-box {
  position: relative;
  margin: auto;
  width: 600px;
  height: 500px;
  padding: 100px;
  /* margin-top: 30px; */
  background: #FFFAF8;
  box-sizing: border-box;
  /* box-shadow: 0 5px 5px rgba(0,0,0,.6); */
  border-radius: 10px;
  margin-top: 8%;
}

.findUser-box h2 {
  margin: -10% 0 30px;
  padding: 0;
  color: #000000;
  text-align: center;
  font-style:normal;
  font-weight: 500;
  font-size: larger;
}

#next{
  margin: auto;
  margin-top: 15%;
  /* top:30%; */
  background-color:#FFE2C0;
  color: #000000;
  border:none; 
  border-radius:10px; 
  padding:10px;
  min-height:35px; 
  /* min-width: 120px; */
  width: 40%;
}
#next label{
  font-size: large;
}
.message{
  margin-top: 10%;
  text-align: center;
}
.result{
  margin-top: 15%;
  text-align: center;
}
</style>