<template>
<body style="min-height: 800px;background-color: #FFFAF8;">

  <div class="findUser-box">
    <h2>비밀번호 찾기 결과</h2>

    <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>
    
    <div class="message">
      새로운 비밀번호를 입력하세요.
    </div>

    <div class="user-box">
      <input type="password" name="" required="" v-model="password1">
      <label>새로운 비밀번호</label>
      <div id="passwordError" class="error">{{ passwordErrorMessage }}</div>
    </div>
    
    <div class="user-box">
      <input type="password" name="" required="" v-model="password2">
      <label>새로운 비밀번호 확인</label>
      <div class="checkerror">{{ passwordCheckErrorMessage }}</div>
    </div>

    <div class="d-flex justify-content-center">
      <button id="next" type="button" style="border: 1px solid #000000;" @click="updatePassword"><label>변경</label></button>
    </div>
  </div>
</body>
</template>

<script setup>
import { ref, watch } from 'vue';
import router from "@/router";
import axios from "axios";
import { useRoute } from 'vue-router';
const route = useRoute();

const password1 = ref('');
const password2 = ref('');
const passwordErrorMessage = ref('');
const passwordCheckErrorMessage = ref('');
const member_email = route.query.memberEmail
watch([password1, password2], () => {
  if (password1.value !== password2.value) {
    passwordCheckErrorMessage.value = "*비밀번호가 일치하지 않습니다.";
  } else {
    passwordCheckErrorMessage.value = '';
  }
});


const updatePassword = async () => {
    
const data = {
    member_email: member_email, // 이메일 값 받아오기
    newPassword: password1.value  };
    console.log(data);
    
if (password1.value !== password2.value) {
  alert('비밀번호가 일치하지 않습니다.'); 
} else {    
  try {
    const response = await axios.post("http://localhost:9212/api/user/updatePassword", data);
    const code = response.status;
    
    if (code === 200) {
      alert("비밀번호가 변경되었습니다.");
      router.push({ name: 'login' });
    } else {
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
    alert('비밀번호 변경 중 오류가 발생했습니다.');
}
}

}

</script>

<style scoped>
.findUser-box {
  position: relative;
  margin: auto;
  width: 600px;
  height: 600px;
  padding: 100px;
  margin-top: 50px;
  background: #FFFAF8;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 8%;
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

#next {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FFE2C0;
  color: #000000;
  border: none;
  border-radius: 10px;
  padding: 10px;
  /* min-height: 35px; */
  width: 40%;
}

#next label {
  font-size: large;
}

.message {
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;
}

.user-box {
  position: relative;
}

.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
  background: transparent;
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

.checkerror {
  margin-bottom: 10%;
  color: red;
  font-size: small;
}
</style>