<template >
    <div class="container" style="background-color : #FFFAF8;">
        <div class="fullWidth">
            <div class="fullWidth">
                <nav class="navbar navbar-expand-lg" id="navbar2">
                    <button class="navbar-brand" @click="goHome"  style="background-color: transparent; border: none;">
                        <img src="../img/logo.jpg" alt="로고" class="image-button__image"  style="width: 100px; height: auto;"></button>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">

                                <button class="nav-link active"  v-if="isUserLoggedIn" @click="logout"  aria-current="page" style="font-size: 0.8rem;
                                background-color: transparent; border: none;font-weight: bolder;">로그아웃</button>
                                <button class="nav-link active" v-else aria-current="page" @click="goLoginPage" style="font-size: 0.8rem;font-weight: bolder;">로그인</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link active"  v-if="!isUserLoggedIn" aria-current="page"  @click="gosign_upPage" style="font-size: 0.8rem;
                                background-color: transparent; border: none;font-weight: bolder;">회원가입</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link active" aria-current="page"  @click="goComplainPage" style="font-size: 0.8rem;
                                background-color: transparent; border: none;font-weight: bolder;">고객센터</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <div class="container" id="navbar_parent" style="background-color : #FFFAF8;" >
        <div id="navbar" >
            <!-- <div id="navItems" /> -->
            <div id="navItems">
                <button class="divider" @click="goMovie" style="background-color: transparent; border: none;
                padding-left: 20px; padding-right: 20px;">영화</button>
                <span class="divider">ㅣ</span>
                <button class="divider" @click="goReservation" style="background-color: transparent; border: none;
                padding-left: 20px; padding-right: 20px;">예매</button>
                <span class="divider">ㅣ</span>
                <button class="divider" @click="goEvent" style="background-color: transparent; border: none;
                padding-left: 20px; padding-right: 20px;">이벤트</button>
            </div>
            <div  id="btns">
                <button v-if="isUserLoggedIn" @click="goMyPage" class="image-button1">
                    <img src="../img/Group273.png" alt="마이" class="image-button__image">
                </button>
                <button v-else @click="goLoginPage2"  class="image-button1">
                    <img src="../img/Group273.png" alt="마이" class="image-button__image"></button>
                <button v-if="isUserLoggedIn" @click="logout" class="image-button2"><img src="../img/Group271.png" alt="로그아웃" class="image-button__image"></button>
                <button v-else @click="goLoginPage" class="image-button2"><img src="../img/Group270.png" alt="로그인" class="image-button__image"></button>
            </div>
        </div>
        <br>
    </div>

</template>

<script setup>
import router from "@/router";
import store from "@/store/store";
import { computed } from 'vue';

// computed property를 정의합니다.
const isUserLoggedIn = computed(() => store.state.token !== '');

// logout 함수를 정의합니다.
const logout = () => {
    store.commit('CLEAR_TOKEN');
    router.push({ name: 'home' });
};
const goHome=()=>{
    router.push({
        name: 'home',
    });
}

const goLoginPage = () => {
    router.push({
        name: 'login',
    });
};

const gosign_upPage = () => {
    router.push({
        name: 'sign_up',
    });
};

const goLoginPage2 = () => {
    alert("가입되지 않은 회원입니다.")
    router.push({
        name: 'login',
    });
};
const goMyPage = () => {
    router.push({
        name: 'mypage',
    });
};
const goComplainPage = () => {
    router.push({
        name: 'complain',
    });
};
const goMovie=()=>{
    router.push(({
        name:'movieView'
    }))
}
const goReservation=()=>{
    router.push(({
        name : "reservation"
    }))
}
const goEvent=()=>{
    router.push(({
        name : "event"
    }))
}
const my=()=>{
    console.log(store.state.email)
    console.log(store.state.userState)
}
my()
</script>

<style scoped>
/*.line {
    color: #000000; !* 검정색 *!
    margin-top: 3%; !* 구분 기호의 좌우 여백 설정 *!
    border: 1px solid #000000; !* 외곽선 추가 *!
    padding: 5px; !* 내부 여백 설정 *!
}*/
#navbar{
    width: 100%;
    color: #000000; /* 검정색 */
    display: flex;
    justify-content: space-between;
    margin-top: 3%; /* 구분 기호의 좌우 여백 설정 */
    border: 2px solid #FF8551; /* 외곽선 추가 */
    padding: 0; /* 내부 여백 설정 */
    border-left: 2px solid #FFFAF8;
    border-right: 2px solid #FFFAF8;

}
.container #navbar_parent{
    width:100%;
    margin: auto;
    position: relative;
}
.container{
    display: flex;
    width:100vw;
}
.container #navItems{
    width:80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}
.container .div
#btns{
    width:33%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
#navbar2{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.fullWidth{
    width: 100%;
}

.image-button1 {
    background-color: transparent;
    border: none;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
}
.image-button2 {
    background-color: transparent;
    border: none;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
}

.image-button__image {
    display: block;
    width: 25px;
    height: 35px;
    object-fit: contain;
}

body{
    background-color: #FFFAF8;
}
</style>
