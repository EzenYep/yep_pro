<template>
    <div class="signup-box">
        <h3>회원가입</h3>

        <h5>이용약관 동의</h5>
        <hr class="center-hr" style="font-weight: 900;"/>


        <label for="agree">
            <input type="checkbox" name="agree" value="1"> 이용약관 동의<strong>(필수)</strong></label>

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

            <label for="agree">
                <input type="checkbox" name="agree" value="2"> 개인정보수집 및 이용<strong>(필수)</strong></label>

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

            <label for="agree">
                <input type="checkbox" name="agree" value="3"> 이벤트 수신동의<strong>(선택)</strong></label>

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
                <input type="checkbox" name="agree_all" id="agree_all" @click="selectAll($event)">
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
            <div class="email">
                <input id="email" type="text" placeholder="이메일을 입력해 주세요.">
                <div id="emailError" class="error"></div>
                <div class="auth">

                    <button id="sendMessage">인증번호 전송</button>
                </div>
            </div>

            <div class="email">
                <input id="text" type="text" placeholder="인증번호를 입력해 주세요.">
                <div id="emailError" class="error"></div>
                <div class="auth">

                    <button id="sendMessage">인증</button>
                </div>
            </div>

            <div class="as">
                <input id="name"  type="text" placeholder="이름을 입력해 주세요.">
                <div id="nameError" class="error"></div>
            </div>
            <div class="as">
                <input id="password" type="password" placeholder="비밀번호를 입력해 주세요." v-model="password1">
                <div id="passwordError" class="error">{{ passwordErrorMessage }}</div>
            </div>
            <div class="as">
                <input id="passwordCheck" type="password" placeholder="비밀번호를 다시 입력해 주세요." v-model="password2">
                <div id="passwordCheckError" class="error">{{ passwordCheckErrorMessage }}</div>
            </div>
            <div class="phone">
                <input id="phone1" type="text" size="1" maxlength="3" placeholder="***"> -
                <input id="phone2" type="text" size="3" maxlength="4" placeholder="****"> -
                <input id="phone3" type="text" size="3" maxlength="4" placeholder="****">
                <label>*전화번호를 입력해 주세요.</label>
            </div>


            <!-- <div class="timer">
                <div id="timeLimit">03:00</div>
                <button disabled id="completion" onclick="checkCompletion()">인증확인</button>
            </div> -->


            <div class="line">
                <hr>
            </div>
            <div class="signUp">
                <button id="signUpButton" onclick="signUpCheck()">가입하기</button>
            </div>
        </div>
    </div>


</template>

<script setup>

const selectAll = (e) => {      //모두 동의 체크박스
    const agree_all = e.target;
    const checkboxes = document.querySelectorAll('input[name="agree"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = agree_all.checked;
    });
};



// window.onload = function () {       //비밀번호 확인
//       var password = document.getElementById("password")
//       , confirm_password = document.getElementById("passwordCheck");
//       var passwordCheckError = document.getElementById("passwordCheckError");

//       function validatePassword(){
//           if(password.value != confirm_password.value) {
//               passwordCheckError.textContent = "Passwords don't match.";
//           } else {
//               passwordCheckError.textContent = '';
//           }
//       }

//       password.onchange = validatePassword;
//       confirm_password.onkeyup = validatePassword;
//   };
</script>


<style scoped>


.signup-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    height: 150%;
    padding: 100px;
    margin-top: 40%;
    transform: translate(-50%, -50%);
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
    box-shadow: 1px 1px 1px rgba(0,0,0,.6)
}

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
    width: 70px;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;                 /*입력창 깜빡이*/
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #000000;           /*유저네임 밑 줄*/
    outline: none;
    background: transparent;
    margin-left: 0;
}
.phone label{
    margin-left: 3%;
    font-size: small;
    color: #ad9c9c;
}
</style>