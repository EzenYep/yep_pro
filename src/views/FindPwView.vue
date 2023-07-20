<template>
<body style="min-height: 800px;background-color: #FFFAF8;">

  <div class="findUser-box">
    <h2>비밀번호 찾기</h2>
    <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>
    <div class="findbtn">
      <button class="findIDPW" style="border: 1px solid #000000;" type="button" @click="findid">아이디찾기</button>
      <div class="IdPwline" ></div>
      <button class="findIDPW" style="border: 1px solid #000000;" type="button">비밀번호찾기</button>
    </div>
    <div class="a">
      <div class="user-box">
        <input type="text" name="" required="" v-model="body.name" @input="filterKoreanCharacters">
        <label>이름</label>
      </div>
      
      <div class="user-box">
        <input type="email" name="aa" required="" v-model="body.email">
        <label>이메일</label>
        <button id="sendMessage" style="border: 1px solid #000000;" value="" @click="sendEmail">인증번호 전송</button>
      </div>
  
      <div class="user-box">
        <input type="text" name="bb" required="" v-model="verificationCodeInput">
        <label>인증번호</label>
        <div id="emailError" class="error" style="white-space: pre-wrap;"></div>
        <button id="sendMessage" style="border: 1px solid #000000;" @click="verifyCode">인증</button>
      </div>
      
      <div  v-if="verificationResult1==='인증번호가 일치합니다.'" class="varif">{{ verificationResult1 }}</div>
      <div v-else-if="verificationResult2==='인증번호가 일치하지 않습니다.'" class="varif2">{{ verificationResult2 }}</div>
      <div  v-else class="varif"></div>
      
      <div class="d-flex justify-content-end">
        <button id="next" type="button" @click="findpwresult"><label>다음</label></button>
      </div>
    </div>
  </div>
</body>
</template>


<script setup>
import router from "@/router";
import { ref, reactive } from 'vue';
import axios from "axios";


const findid=() => {
  router.push({
      name: 'find_id'
  });
}
// ------------------------------------------------------------------------------------

function filterKoreanCharacters(event) {    //이름 입력칸에 한글만 입력 가능
  const input = event.target.value;
  const filteredInput = input.replace(/[^가-힣]/g, '');
  body.name = filteredInput;
}
// ------------------------------------------------------------------------------------

let body = reactive({});

const verificationResult1 = ref('');
const verificationResult2 = ref('');

const verificationCodeInput = ref('');
let verificationCode = '';


const sendEmail = async () => {             //이메일 인증번호 전송

      if (!body.name) {
        alert('이름을 입력해주세요.');
        return;
      }
      if (!body.email) {
       alert('이메일을 입력해주세요.');
        return;
      }    
      const data = {};
      body = {
        name: body.name,
        email: body.email,
      };
      console.log(body.email)
      console.log(body.name)
      try {
        const response = await axios.post('http://localhost:9212/api/user/sendEmail', body);
        
        if (response.status === 200) {
          alert("전송되었습니다.");
          verificationCode = response.data.verificationCode; // 받은 verificationCode 저장
          } else {
          alert("전송에 실패했습니다.");
        } 
       
        
      } catch (error) {
        console.error('이메일 전송 중 오류가 발생했습니다:', error);
        data.result = '이메일 전송 중 오류가 발생했습니다.';
      }
    };

   const verifyCode= () => {               //이메일+인증번호 입력칸 인증번호 확인
    if (!verificationCodeInput.value) {
    alert('인증번호를 입력해주세요.');
    return;
     }
    if (verificationCodeInput.value === verificationCode) {
      verificationResult1.value = '인증번호가 일치합니다.';
    } else {
      verificationResult2.value = '인증번호가 일치하지 않습니다.';
    }
    console.log(verificationCodeInput.value);
  }

 
  // ------------------------------------------------------------------------------------

  const findpwresult = async () => {
  const data = {
    member_name: body.name,
    email: body.email,
  };

  if (!body.name) {
    alert('이름을 입력해주세요.');
  } else if (!body.email) {
    alert('이메일을 입력해주세요.');
  } else {
    try {
      const response = await axios.post('http://localhost:9212/api/user/findpwresult', data);
      const code = response.status;
      if (code === 200) {
        router.push({ 
          name: 'find_pw_result',
          query: { memberEmail: body.email }, // memberEmail 값을 매개변수로 전달
});

      } else if (code === 401) {
        alert('일치하는 계정이 없습니다.');
      } else {
        alert('비밀번호 찾기 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('비밀번호 찾기 중 오류가 발생했습니다:', error);
      alert('비밀번호 찾기 중 오류가 발생했습니다.');
    }
  }
};
</script>
 
 
 <style scoped>
  .findUser-box {
    position: relative;
    margin: auto;
    width: 600px;
    height: 100%;
    padding: 100px;
    margin-top: 0;
    background: #FFFAF8;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 8%;
  }
  
  .findbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
  
  .findIDPW {
    top: 30%;
    background-color: #FFE2C0;
    color: #000000;
    border: none;
    border-radius: 10px;
    padding: 3%;
    min-height: 10%;
    width: 100%;
  }
  
  .findUser-box h2 {
    margin: -10% 0 30px;
    padding: 0;
    color: #000000;
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: larger;
  }
  
  .IdPwline {
    border-left: thin solid #FF8551;
    margin-left: 5%;
    margin-right: 5%;
    height: 40px;
  }
  
  .a {
    margin-top: 20%;
    align: center;
  }
  
  .user-box {
    position: relative;
  }
  
  .user-box input {
    width: 70%;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #FF8551;
    outline: none;
    background: transparent;
    margin-left: -30%;
  }
  

  
  .user-box label {
    position: absolute;
    top: 0;
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
  
  #sendMessage {
    margin-left: 10px;
    font-size: 9pt;
    background: #FAF0E4;
    color: #000000;
  }
  
  #next {
    margin-top: 10%;
    top: 30%;
    background-color: #FFE2C0;
    color: #000000;
    border: none;
    border-radius: 10px;
    padding: 10px;
    min-height: 35px;
    width: 40%;
  }
  
  #next label {
    font-size: large;
  }
  
  .user-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-box button{
    background-color: #FFE2C0;
  color: black;
  border: none;
  text-align: right;
  padding: 8px 13px;
  border-radius: 10px;
  }
  .user-box [name="aa"]{
    margin-left: -1.5%;
  }
  .user-box [name="bb"]{
    margin-left: -15.5%;
  }
  
  .varif{
    color: blue;
  }
  .varif2{
    color: red;
  }
  </style>