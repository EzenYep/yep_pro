<template>
<body style="min-height: 800px;background-color: #FFFAF8;">

    <div class="aaa"></div>
        <div class="login-box">
            <h2>LOGIN</h2>
    
            <div class="horizontal-line" style="height: 2px;  background-color: #FF8551;margin-bottom: 5%;"></div>
    
                <div class="user-box">
                    <input type="text" name="" required="" v-model="body.email" @keyup.enter="LogInEvent">
                    <label>이메일</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" v-model="body.password" @keyup.enter="LogInEvent">
                    <label>비밀번호</label>
                </div>
                <label class="checkbox"> <!--아이디 저장 기능은 보류-->
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> 아이디 저장
                </label>
                    <input type="submit" @click="LogInEvent" @keyup.enter="LogInEvent" class="login" value="로그인" >
    
                    <a href="#" class="findid" @click="findid">아이디찾기</a>&nbsp;<label class="sero" style="color: #FF8551; margin-right: 5px;">|</label>
                <a href="#" class="findpw" @click="findpw">비밀번호찾기</a>
    
                <a href="#" class="createid" @click="createid">회원가입</a>
    
        </div>
        <div class="abcd" style="height: 40%;width: 100%;background-color: #FF8551;"></div>
</body>
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
        try {
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
            } else if(code === 400) {
                alert("로그인에 실패하셨습니다.")
                location.reload();
            }
        }catch (e){
            alert("로그인이 실패했습니다")
            return;
        }
    }
    </script>
    
    <style scoped>
   
    .aaa{
        margin-bottom: 10%;
    }

    .login-box {
        position: relative;
        height: 100%;
        margin: auto;
        width: 500px;
        padding: 40px;
        background: #FFFAF8;
        /* box-sizing: border-box; */
        /* border-radius: 10px; */
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
        border-bottom: 1px solid #FF8551;           /*유저네임 밑 줄*/
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
        color: #000000;
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
        background: #ffebd4;
        width: 100%;
        border-radius: 10px;
        border-color: #FF8551;
        margin-bottom: 5%;
        
    }
    .findid{
        color: #000000;
        text-decoration: none;
        font-size: small;
        margin-right: -1px;
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
    /* .kakaologin {
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
    
    
    } */
    
    
    /* .login-box a span {
        position: absolute;
        display: block;
    } */
    
    
    </style>