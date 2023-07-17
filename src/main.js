import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "@/store/store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueCookie from 'vue-cookie';

const app = createApp(App);


// 로그인 상태와 사용자 상태 복원
const token = VueCookie.get('token');
const email = VueCookie.get('email');
const userState = VueCookie.get('userState');

if (token && email && userState) {
    store.commit('SET_TOKEN', { accessToken: token, email, state: parseInt(userState) });
}

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = "//localhost:9212";
app.use(router).use(store).mount("#app");
