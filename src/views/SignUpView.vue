<template>
  <div class="signup-box container-lg" >
      <h3>회원가입</h3>

      <h5>이용약관 동의</h5>
      <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>



  <input type="checkbox" name="agree" v-model="mustchk">
  <label for="mustchk">이용약관 동의<strong>(필수)</strong></label>

      <div class="accordion" id="accordionExample">
          <div class="accordion-item">

              <h2 class="accordion-header" id="headingOne">

                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      <strong>이용약관 동의</strong>
                  </button>
              </h2>

              <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                      <strong>여러분을 환영합니다.</strong><br/>
                      YEP 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 YEP 서비스의 이용과 관련하여 YEP 서비스를 제공하는 YEP 주식회사(이하 ‘YEP’)와 이를 이용하는 YEP 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 YEP 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.

                      YEP 서비스를 이용하시거나 YEP 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.

                  </div>
              </div>
          </div>

          
  <input type="checkbox" name="agree" v-model="mustchk2">
  <label for="mustchk2">개인정보수집 및 이용<strong>(필수)</strong></label>
          <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <strong>개인정보수집 및 이용</strong>
                  </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                      <br/> 
                      개인정보보호법에 따라 YEP에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.</div>
              </div>
          </div>

          
  <input type="checkbox" name="agree" v-model="mustchk3" >
  <label for="mustchk3">이벤트 수신동의<strong>(선택)</strong></label>
          <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <strong>이벤트 수신동의</strong>
                  </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                      <br/>
                      YEP 서비스 및 제휴 이벤트・혜택 등의 정보를 휴대전화(YEP앱 알림 또는 문자), 이메일로 받을 수 있습니다. 일부 서비스(별개의 회원 체계 운영, YEP 가입 후 추가 가입하는 서비스 등)의 경우, 수신에 대해 별도로 안내드리며 동의를 구합니다.
                  </div>
              </div>
          </div>
          

  <input type="checkbox" name="agreeAll" v-model="allChecked"  @change="toggleAll">
  <label for="agreeAll">모두 동의합니다</label>

      </div>

      <div class="marketing">
          <h5>마케팅 수신동의</h5>
          <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>

          <label>
              <input type="checkbox" name="contact" value="email" />
              <span> E-Mail</span>
          </label>

          <label>
              <input type="checkbox" name="contact" value="SMS" />
              <span> SMS</span>
          </label>
          <h4>*정보 수신동의 시, 고객혜택 및 이벤트 등 다양한 정보를 받으실 수 있습니다.</h4>
      </div>


      <div class="userInfo">
          <h5>회원 정보 입력</h5>
          <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>
          <h6>*는 필수입력 항목입니다.</h6>

          <div class="a"></div>

      </div>


      <div class="wrapper">
          
        

          <div class="as">
              <input id="name"  type="text" placeholder="이름을 입력해 주세요." v-model="body.name" @input="filterKoreanCharacters">
              <div id="nameError" class="error"></div>
          </div>

          <div class="bday">
          <label>생년월일</label>
          <div>
              <input type="date" id="yr"  v-model="body.birthday" min="1900-01-01" :max="getCurrentDate()"  @input="onDateInput">                
              
          </div>
      </div>

          <div class="as">
              <input id="password" type="password" placeholder="비밀번호를 입력해 주세요." v-model="password1" >
              <div id="passwordError" class="error">{{ passwordErrorMessage }}</div>
          </div>
          <div class="as">
              <input id="passwordCheck" type="password" placeholder="비밀번호를 다시 입력해 주세요." v-model="password2">
          </div>
          <div class="checkerror">{{ passwordCheckErrorMessage }}</div>

          <div class="phone">
              <input id="phone1" type="text" size="1" maxlength="3" placeholder="***" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="tel1"> -    <!-- 숫자만 입력하는 텍스트-->
              <input id="phone2" type="text" size="3" maxlength="4" placeholder="****" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="tel2"> -
              <input id="phone3" type="text" size="3" maxlength="4" placeholder="****" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="tel3">
              <label>*전화번호를 입력해 주세요.</label>
          </div>
          <div class="email">
              <input id="email" type="email" placeholder="이메일을 입력해 주세요." v-model="body.email"  @input="restrictKorean" @blur="validEmail">
              <div id="emailError" class="error">{{  result }}</div>

              <div class="auth">
                  <button id="sendMessage" @click="sendEmail" :disabled="!isValidEmail(body.email)">인증번호 받기</button>
              </div>
          </div>
          <div class="email">
              <input id="text" type="text" placeholder="인증번호를 입력해 주세요." maxlength="6" v-model="verificationCodeInput">
              
              
              <div class="auth">
                  <button id="verifybtn" @click="verifyCode">인증</button>
              </div>
          </div>
          <div id="emailError" v-if="verificationResult1==='인증번호가 일치합니다.'" class="error2">{{ verificationResult1 }}</div>
          <div id="emailError" v-else-if="verificationResult2==='인증번호가 일치하지 않습니다.'" class="error3">{{ verificationResult2 }}</div>
          <div id="emailError" v-else class="error1"></div>

          <div class="line" id="line">
              <hr>
          </div>
          <div class="d-flex justify-content-center" id="signupBtnWrapper">
              <button id="signUpButton" @click="LogInEvent">가입하기</button>
          </div>
      </div>
  </div>


</template>

<script setup>
import router from "@/router";
import { ref, watch } from 'vue';
import axios from "axios";
import { reactive } from "vue";

// 체크박스 선택에 대한 부분

let body = reactive({});

function filterKoreanCharacters(event) {
const input = event.target.value;
const filteredInput = input.replace(/[^가-힣]/g, '');
body.name = filteredInput;
}


const mustchk = ref(false);
const mustchk2 = ref(false);
const mustchk3 = ref(false);
const allChecked = ref(false);

watch([mustchk, mustchk2, mustchk3], () => {
if (mustchk.value && mustchk2.value && mustchk3.value) {
  allChecked.value = true;
} else {
  allChecked.value = false;
}
});

function toggleAll() {
if (allChecked.value) {
  mustchk.value = true;
  mustchk2.value = true;
  mustchk3.value = true;
} else {
  mustchk.value = false;
  mustchk2.value = false;
  mustchk3.value = false;
}
}

function getCurrentDate() { //날짜 범위 현재시간
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function onDateInput() {    //날짜 입력범위 벗어날 시 초기화
const enteredDate = new Date(body.birthday);
const minDate = new Date("1900-01-01");
const maxDate = new Date(getCurrentDate());

if (enteredDate < minDate || enteredDate > maxDate) {
  body.birthday = ""; // 입력값 초기화
  alert("올바른 날짜를 입력해주세요.");
}
}

                                          //이메일 관련
const verificationResult1 = ref('');
const verificationResult2 = ref('');

const verificationCodeInput = ref('');
let verificationCode = '';

const sendEmail = async () => {             //이메일 인증번호 전송
    const data = {};
    body = {
      email: body.email,
      name: body.name,
      birthday: body.birthday,
    };
    console.log(body.email)
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
}



                                          //이메일 입력 조건
const email = ref('');
const emailErrorMessage = ref('');

function isValidEmail(email) {
const emailchk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
return emailchk.test(email);
}

function validEmail() {
if (email.value === '' || email.value === undefined) return;

if (!isValidEmail(email.value)) {
  emailErrorMessage.value = '올바른 이메일 형식으로 입력해주세요.';
} else {
  emailErrorMessage.value = '';
}
}


function restrictKorean(event) {          //이메일 입력칸 한글x
const input = event.target.value;
const regex = /^[^ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
if (!regex.test(input)) {
  event.target.value = input.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
}
}

const password1 = ref('');
const password2 = ref('');
const passwordErrorMessage = ref('');
const passwordCheckErrorMessage = ref('');
const tel1 = ref('');
const tel2 = ref('');
const tel3 = ref('');

watch([password1, password2], ([newPassword1, newPassword2]) => {
if (newPassword1 !== newPassword2) {
  passwordCheckErrorMessage.value = "* 비밀번호가 일치하지 않습니다.";
} else {
  passwordCheckErrorMessage.value = '';
}
});


const LogInEvent = async () => {
const tel = tel1.value + tel2.value + tel3.value; // 전화번호 db 합치기
  console.log(tel);
body = {
  name: body.name,
  email: body.email,
  password: password1.value,
  tel: tel,
  birthday: body.birthday
};
// ------------------------------------------------------------------------------------

if (!mustchk.value) {                 //필수 이용약관 체크시 페이지 전환
  alert('이용약관 동의에 체크하세요.');
} else if (!mustchk2.value) {
  alert('개인정보수집 및 이용에 체크하세요.');
} else if (password1.value !== password2.value) {  // 비밀번호 일치 여부 확인
  alert('비밀번호가 일치하지 않습니다.'); 
} else if (!body.name) {
  alert('이름을 입력하세요.');
} else if (!body.birthday) {
  alert('생년월일은 입력하세요.');
} else if (!tel) {
  alert('전화번호를 입력하세요.')
}else if (!body.email) {
  alert('이메일을 입력하세요.')
 }//else if (!) {
//   alert('인증번호를 입력하세요.')
// }
 else {
  await axios.post("http://localhost:9212/api/user/addUser", body).then((res) => {
    const code = res.data.code;
    if (code === 200) {
      alert("가입 완료. 로그인 해주세요.");
      router.push({ name: 'login' });
    } else if (code === 401) {
      alert('이미 존재하는 이메일입니다.')
    }
  });
}
};




</script>

<style scoped>

input[type="date"]{
    /* background-color: #ffd4c2; */
    padding: 8px;
    /* font-family: "Roboto Mono",monospace; */
    color: #000000;
    font-size: 15px;
    /* border: none; */
    border-radius: 10px;
}
.checkerror{
  margin-bottom: 10%;
  color: red;
  font-size: small;
}

.signup-box {
  position: relative;
  margin: auto;
  width: 700px;
  height: 190%;
  padding: 100px;
  background: #FFFAF8;
  box-sizing: border-box;
  /* box-shadow: 0 5px 5px rgba(0,0,0,.6); */
  border-radius: 10px;
}
.signup-box h3 {
  margin: 0 0 30px;
  padding: 0;
  color: #000000;
  text-align: center;
  margin-bottom: -5;

}


.accordion-item{
  margin-bottom: 5%;
  box-shadow: 1px 1px 1px rgba(157, 157, 157, 0.6);
}
.accordion-button{
  background-color: #FFE2C0;
}
.accordion-body{
background-color: #FAF0E4;
}

input[type="checkbox"] {
  zoom:1.3;
}


.signup-box h5 {
  font-size: 15px;
  margin-top: 20%;
}
.signup-box h4{
  font-size: 10px;
  text-align: center;
  margin-top: 5%;
}
.signup-box h6{
  font-size: 13px;
  right: auto;
  margin-top:7%;
  color: rgb(155, 155, 155);
}

.marketing label {
  margin-left: 10%;
}
.marketing span {
  font-size: large;
  font-weight: lighter;
}
.email{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.email input {
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
.email button{
  background-color: #FFE2C0;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  font-size: 13px;
  margin-left: 5%;
} 

#yr{
  margin-bottom: 5%;
  font-size: large;
}
.as {
  display: flex;
  align-items: center;
  justify-content: center;
}
.as input {
  width: 81%;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;                 /*입력창 깜빡이*/
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #FF8551;           /*유저네임 밑 줄*/
  outline: none;
  background: transparent;
  margin-left: -19%;
}

.phone input {
margin-top: -10px;
  width: 70px;
  padding: 10px 0;
  font-size: 16px;
  color: #000000;                 /*입력창 깜빡이*/
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #FF8551;           /*유저네임 밑 줄*/
  outline: none;
  background: transparent;
}
.phone label{
  margin-left: 3%;
  font-size: small;
  color: #ad9c9c;
}
#signUpButton{
  position: relative;
  margin-top: 10%;
  top:30%;
  background-color:#FFE2C0;
  color: #000000;
  border:none;
  border-radius:10px;
  padding:10px;
  min-height:35px;
  /* min-width: 120px; */
  width: 40%;
}
@media (max-width: 768px) {
  .signup-box {
      width: 90%;
      padding: 50px;
  }
}

@media (min-width: 1200px) {
  .signup-box {
      width: 700px;
      padding: 100px;
  }
}

.error2{
  color: blue;
}
.error3{
  color: red;
}


</style>
