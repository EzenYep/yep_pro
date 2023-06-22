import {createRouter, createWebHistory} from 'vue-router'
import HomepageMainView from "@/views/HomepageMainView.vue";
import MovieInputView from "@/views/MovieInputView.vue";
import MovieInfoView from "@/views/MovieInfoView.vue";
import LoginView from "@/views/LoginView.vue";
import ComplaintView from "@/views/ComplaintView.vue";
import MovieView from "@/views/MovieVIew.vue"
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomepageMainView
    },{
        path: "/main/login",
        name: 'login',
        component: LoginView
    },{
        path: "/main/complain",
        name: 'complain',
        component: ComplaintView
    },{
        path: "/movie_input",
        name: 'movie_input',
        component: MovieInputView
    },{
        path: "/movie_info",
        name: 'movie_info',
        component: MovieInfoView
    },{
        path: "/movie_view",
        name: 'movieView',
        component: MovieView
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
