import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "@/store/store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = "//localhost:9212";
app.use(router).use(store).mount("#app");
