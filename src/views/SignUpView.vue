<!-- 체크 박스 작업 + 노드 이메일러 작업 -->
<template>
    <div class="signup-box container-lg" >
        <h3>회원가입</h3>

        <h5>이용약관 동의</h5>
        <hr class="center-hr" style="font-weight: 900;"/>



        <input type="checkbox" name="agree" value="1" id="mustchk" @click="checkAgreeAll()" v-model="mustchk"> 이용약관 동의<strong>(필수)</strong>

        <div class="accordion" id="accordionExample">
            <div class="accordion-item">

                <h2 class="accordion-header" id="headingOne">

                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <strong>이용약관 동의</strong>
                    </button>
                </h2>

                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>얌마.</strong><br/> 뭘봐?
                    </div>
                </div>
            </div>


            <input type="checkbox" name="agree" value="2" id="mustchk" @click="checkAgreeAll()" v-model="mustchk2"> 개인정보수집 및 이용<strong>(필수)</strong>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <strong>개인정보수집 및 이용</strong>
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>어쭈?</strong><br/> 계속보네?
                    </div>
                </div>
            </div>


            <input type="checkbox" name="agree" value="3" @click="checkAgreeAll()"> 이벤트 수신동의<strong>(선택)</strong>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <strong>이벤트 수신동의</strong>
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>알겠어...</strong><br/> 그만좀봐.
                    </div>
                </div>
            </div>

            <label for="agree_all" class="agree_all">
                <input type="checkbox" name="agreeAll" id="agreeAll" @click="agreeAll(this)">
                <span>모두 동의합니다</span>
            </label>
        </div>

        <div class="marketing">
            <h5>마케팅 수신동의</h5>
            <hr class="center-hr" style="font-weight: 900;"/>

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
            <hr class="center-hr" style="font-weight: 900;"/>
            <h6>*는 필수입력 항목입니다.</h6>

            <div class="a"></div>

        </div>


        <div class="wrapper">



            <div class="as">
                <input id="name"  type="text" placeholder="이름을 입력해 주세요." v-model="body.name">
                <div id="nameError" class="error"></div>
            </div>

            <div class="bday">
                <label>생년월일</label>
                <div>
                    <input type="date" id="yr"  v-model="body.birthday">

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
                <input id="email" type="email" placeholder="이메일을 입력해 주세요." v-model="body.email" @blur="validEmail">
                <div id="emailError" class="error">{{  result }}</div>
                <div class="auth">

                    <button id="sendMessage" @click="sendEmail">인증번호 받기</button>
                </div>
            </div>
            <div class="email">
                <input id="text" type="text" placeholder="인증번호를 입력해 주세요." maxlength="6">
                <div id="emailError" class="error"></div>
                <div class="auth">

                    <button id="sendMessage">인증</button>
                </div>
            </div>


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
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// const selectAll = (e) => {      // 모두 동의 체크박스
//   const agree_all = e.target;
//   const checkboxes = document.querySelectorAll('input[name="agree"]');

//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = agree_all.checked;
//   });
//  };
let body = reactive({});




function checkAgreeAll()  {

    const checkboxes
        = document.querySelectorAll('input[name="agree"]');

    const checked
        = document.querySelectorAll('input[name="agree"]:checked');

    const agreeAll
        = document.querySelector('input[name="agreeAll"]');

    if(checkboxes.length === checked.length)  {
        agreeAll.checked = true;
    }else {
        agreeAll.checked = false;
    }

}

function agreeAll(agreeAll)  {
    const checkboxes
        = document.getElementsByName('agree');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = agreeAll.checked
    })
}

// ------------------------------------------------------------------------------------


//★노드메일러 확인후 이용★


// dotenv.config();

// const { email_service, user, pass } = process.env;

// const transporter = nodemailer.createTransport({
//   service: email_service,
//   auth: {
//     user: user,
//     pass: pass
//   }
// });

// const mailOptions = {
//   from : user,
//   to: '@',
//   subject: 'Nodemailer Test',
//   text: '노드 패키지 nodemailer를 이용해 보낸 이메일임'
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Email Sent : ', info);
//   }
// })
//  const mailSand = async ({to, subject, text, html}) => {
//     try {
//       //메일 클래스 인스턴스 생성
//       const mail = new Mail();

//       //받는 사람 속성 없으면 에러 발생, 있으면 세팅
//       if (!to) throw new Error('Need "to" Propertie.');
//       mail.setTo(to);

//       //제목 있으면 세팅
//       if (subject) mail.setSubject(subject);

//       /**
//        * text나 html은 둘 중 하나가 꼭 있어야함
//        * 둘다 있을 경우 text는 안들어가고 html이 이메일 내용으로 들어가짐
//        */
//       if (!text && !html) throw new Error('Need "text" or "html" Propertie.')
//       if (text) mail.setText(text);
//       if (html) mail.setHtml(html);

//       //메일 보내기 실행
//       const result = await mail.sendMail();

//       return result.response;
//     } catch (err) {
//       throw new Error(err);
//     }
// }


const sendEmail = async () => {
    const data ={};
    body = {
        email: body.email,
    };
    console.log(body.email)
    try {
        await axios.post('http://localhost:9212/api/user/sendEmail', body);
    } catch (error) {
        console.error('이메일 전송 중 오류가 발생했습니다:', error);
        data.result = '이메일 전송 중 오류가 발생했습니다.';
    }
};

// ------------------------------------------------------------------------------------

const password1 = ref('');
const password2 = ref('');
const passwordErrorMessage = ref('');
const passwordCheckErrorMessage = ref('');
const tel1 = ref('');
const tel2 = ref('');
const tel3 = ref('');
// ------------------------------------------------------------------------------------

watch([password1, password2], () => {  // 비밀번호 불일치 문구
    if (password1.value !== password2.value) {
        passwordCheckErrorMessage.value = "* 비밀번호가 일치하지 않습니다.";
    } else {
        passwordCheckErrorMessage.value = '';
    }
});
// ------------------------------------------------------------------------------------


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
    }
    else {
        await axios.post("http://localhost:9212/api/user/addUser", body).then((res) => {
            const code = res.data.code;
            if (code === 200) {
                alert("가입 완료. 로그인 해주세요.");
                router.push({ name: 'login' });
            }
        });
    }
};

const mustchk = ref(false);
const mustchk2 = ref(false);
// ------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------

</script>

<style scoped>
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
    background: rgba(227, 187, 187, 0.402);
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

.center-hr {
    color: black;
    margin-bottom: 10%;
}

.accordion-item{
    margin-bottom: 5%;
    box-shadow: 1px 1px 1px rgba(157, 157, 157, 0.6);
}
.accordion-button{
    background-color: #bcbcbc;
}
/* .accordion-body{
  background-color: #bcbcbc;
} */

input[type="checkbox"] {
    zoom:1.3;
}

.agree_all {
    margin-left: 72%;
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
    margin-top:-7%;
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
    border-bottom: 1px solid #000000;           /*유저네임 밑 줄*/
    outline: none;
    background: transparent;
}
.email button{
    background-color: rgb(113, 113, 113);
    color: white;
    border: none;

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
    border-bottom: 1px solid #000000;           /*유저네임 밑 줄*/
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
    border-bottom: 1px solid #000000;           /*유저네임 밑 줄*/
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
    background-color:#343495;
    color: #fff;
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
</style>
