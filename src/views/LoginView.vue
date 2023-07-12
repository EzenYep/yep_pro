//LoginView

<template>

    <div class="login-box">
        <h2>LOGIN</h2>

        <hr class="center-hr"/>

        <form>
            <div class="user-box">
                <input type="text" name="" required="" v-model="body.email">
                <label>이메일</label>
            </div>
            <div class="user-box">
                <input type="password" name="" required="" v-model="body.password">
                <label>비밀번호</label>
            </div>
            <label class="checkbox"> <!--아이디 저장 기능은 보류-->
                <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> 아이디 저장
            </label>
            <a @click="LogInEvent" class="login">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                로그인
            </a>
            <a href="#" class="findid" @click="findid">아이디찾기</a>&nbsp;|
            <a href="#" class="findpw" @click="findpw">비밀번호찾기</a>

            <a href="#" class="createid" @click="createid">회원가입</a>


            <a href="#2" class="kakaologin">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                카카오 로그인
            </a>
            <a href="#3" class="naverlogin">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                네이버 로그인
            </a>
        </form>
    </div>
</template>

<script setup>
import {reactive} from "vue";
import axios from "axios";
import {useStore} from 'vuex'
import router from "@/router";

const findid = () => {
    router.push({
        name: 'find_id'
    })
}
const findpw = () => {
    router.push({
        name: 'find_pw'
    })
}
const createid = () => {
    router.push({
        name: 'sign_up'
    })
}


const store = useStore();
let body = reactive({});
const LogInEvent = async () => {
    body ={
        email: body.email,
        password: body.password,
    };

    const res =  await axios.post("http://localhost:9212/api/user/signInUser", body)

    console.log(res)
    const code = res.data.code;
    if(code === 200){
/*        const accessToken =  res.data.accessToken;
        const email = res.data.email;*/
        store.commit('SET_TOKEN', { accessToken: res.data.accessToken, email: res.data.email , state:res.data.state})
        console.log(res.data.email)
        if(res.data.state === 0){
            await router.push({
                name: "home"
            })
        }else if(res.data.state===1) {
            await router.push({
                name: "manager_main"
            })
        }
    } else {
        alert("로그인에 실패하셨습니다.")
        location.reload();
    }
}
</script>
<style scoped>



.login-box {
    position: relative;
    margin: auto;
    width: 500px;
    padding: 40px;
    background: rgba(95, 53, 53, 0.5);
    box-sizing: border-box;
    border-radius: 10px;
}

.login-box h2 {
    margin: 0 0 30px;
    /* padding: 0; */
    color: #000000;
    text-align: center;
    font-style:normal;
    font-weight: 500;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
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
.login-box .user-box label {    /*유저네임 패스워드*/
    position: absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #00090a;
    font-size: 12px;
}

.login {
    position: relative;
    display: inline-block;
    padding: 10px 180px;
    color: #000000;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 50px;
    letter-spacing: 4px;
    background: #90baff;

}
.findid{
    color: #000000;
    text-decoration: none;
    font-size: small;

}
.findpw{
    color: #000000;
    text-decoration: none;
    font-size: small;

}

.createid{
    color: #000000;
    text-decoration: none;
    font-size: small;
    margin-left:49%;
}
.kakaologin {
    position: relative;
    display: inline-block;
    padding: 10px 168px;
    color: #000000;
    font-size: 13px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 50px;
    letter-spacing: 0;
    background: #ffff00;


}

.naverlogin {
    position: relative;
    display: inline-block;
    padding: 10px 168px;
    color: #000000;
    font-size: 13px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 10px;
    letter-spacing: 0;
    background: #00ff4c;


}


.login-box a span {
    position: absolute;
    display: block;
}


</style>