<template>
    <div class="container">
        <div class="fullWidth">
            <div class="fullWidth">
                <nav class="navbar navbar-expand-lg" id="navbar2">
                    <a class="navbar-brand" @click="goHome">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">

                                <a class="nav-link active"  v-if="isUserLoggedIn" @click="logout"  aria-current="page" style="font-size: 0.5rem;">로그아웃</a>
                                <a class="nav-link active" v-else aria-current="page" @click="goLoginPage" style="font-size: 0.5rem;">로그인</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"  @click="goLoginPage" style="font-size: 0.5rem;">회원가입</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"  @click="goComplainPage" style="font-size: 0.5rem;">고객센터</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <div class="container" id="navbar_parent" >
        <div id="navbar">
            <div id="navItems" />
            <div id="navItems">
                <span class="divider" @click="goMovie">영화</span>
                <span class="divider">ㅣ</span>
                <span class="divider" @click="goReservation">예매</span>
                <span class="divider">ㅣ</span>
                <span class="divider" @click="goEvent">이벤트</span>
            </div>
            <div  id="btns">
                <button @click="goMyPage">마이</button>
                <button v-if="isUserLoggedIn" @click="logout">로그아웃</button>
                <button v-else @click="goLoginPage">로그인</button>
            </div>
        </div>
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
const tokencheck = ()=>{
    console.log(store.state.token)
}
tokencheck();
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
/*
* <script>안에 넣을려면 아롷개 쓰시면 됩니다.
    methods: {
        goHome() {
            this.$router.push({
                name: 'home',
            });
        },
        goLoginPage() {
            this.$router.push({
                name: 'login',
            });
        },
        goComplainPage() {
            this.$router.push({
                name: 'complain',
            });
        },
        goMovie() {
            this.$router.push({
                name: 'movieView',
            });
        },
    },
* */
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
    border: 1px solid #000000; /* 외곽선 추가 */
    padding: 0; /* 내부 여백 설정 */
}
#navbar_parent{
    width:100%;
}
.container{
    display: flex;
    width:100vw;
}
#navItems{
    width:33%;
    display: flex;
    justify-content: center;
    align-items: center;
}
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

</style>
