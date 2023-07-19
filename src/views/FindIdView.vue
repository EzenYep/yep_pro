<template>
  <div class="findUser-box">
      <h2>아이디 찾기</h2>

      <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>
      <div class="findbtn">
          <button class="findIDPW" type="button" style="border: 1px solid #000000;" >아이디찾기</button>
              <div class="IdPwline"></div>
          <button class="findIDPW" type="button" style="border: 1px solid #000000;" @click="findpw">비밀번호찾기</button>

      </div>
      <div class="a">
      <div class="user-box">
      <input type="text" name="" required="" v-model="body.member_name" @input="filterKoreanCharacters">
      <label>이름</label>
    </div>
    <div class="user-box">
      <input type="text" name="" required="" maxlength="11" v-model="body.tel" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
      <label>휴대폰 번호</label>
    </div>
    </div>
    <div class="d-flex justify-content-end" >
    <button id="next" type="button" style="border: 1px solid #000000;" @click="Findidresult"><label>다음</label></button>
  </div>
  </div>
</template>


<script setup>
import router from "@/router";
import { reactive } from "vue";
import axios from "axios";


const findpw=() => {
  router.push({
      name: 'find_pw'
  });    
}
// ------------------------------------------------------------------------------------

let body = reactive({
member_name: "",
tel: "",
memberEmail: "", // 추가: memberEmail 값을 저장할 변수
});
const Findidresult = async () => {
const requestData = {
  member_name: body.member_name,
  tel: body.tel,
};

try {
  const response = await axios.post("http://localhost:9212/api/user/searchUser",requestData);

  const { status, data } = response;
  if (status === 200) {
    body.memberEmail = data.memberEmail; // 응답에서 memberEmail 값을 가져와 저장

    router.push({
      name: "find_id_result",
      query: { memberEmail: body.memberEmail }, // memberEmail 값을 매개변수로 전달
    });
  } 

} catch (error) {
  console.error(error);
  alert('입력하신 정보와 일치하는 이메일이 없습니다.');
  // 처리할 에러 상황에 대한 로직 추가
}
};
// ------------------------------------------------------------------------------------

function filterKoreanCharacters(event) {    //이름 입력칸에 한글만 입력 가능
const input = event.target.value;
const filteredInput = input.replace(/[^가-힣]/g, '');
body.member_name = filteredInput;
}
// ------------------------------------------------------------------------------------


</script>


<style scoped>
.findUser-box {
  position: relative;
  margin: auto;
  width: 600px;
  height: 600px;
  padding: 100px;
  /* margin-top: 50px; */
  background: #FFFAF8;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 8%;
}
.findbtn{
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  
}

.findIDPW {
  top:30%;
  background-color:#FFE2C0;
  color: #000000;
  border:none; 
  border-radius:10%; 
  padding:3%;
  /* min-height:10%;  */
  /* min-width: 120px; */
  width: 100%;
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
.IdPwline{
  border-left :thin solid #FF8551;
  /* border: #000000; */
  margin-left: 5%;
  margin-right: 5%;
  height : 40px;
}
.a{
  margin-top: 20%;
  align: center;
}
.user-box{
  position: relative;
}
.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;                 /*입력창 깜빡이*/
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #FF8551;           /*유저네임 밑 줄*/
  outline: none;
  background: transparent;
}
.user-box label {    /*유저네임 패스워드*/
  position:absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  pointer-events: none;
  transition: .5s;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #000000;
  font-size: 12px;
}

#next{
  margin-top: 10%;
  top:30%;
  background-color:#FFE2C0;
  color: #000000;
  border:none; 
  border-radius:10px; 
  padding:10px;
  /* min-height:35px;  */
  /* min-width: 120px; */
  width: 40%;
}
#next label{
  font-size: large;
}

</style>