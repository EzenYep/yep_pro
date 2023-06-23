import {createRouter, createWebHistory} from 'vue-router'
import HomepageMainView from "@/views/HomepageMainView.vue";
import MovieInputView from "@/views/MovieInputView.vue";
import MovieInfoView from "@/views/MovieInfoView.vue";
import LoginView from "@/views/LoginView.vue";
import ComplaintView from "@/views/ComplaintView.vue";
import MovieView from "@/views/MovieVIew.vue"
import MyPageView from "@/views/MyPageView.vue";
import ManagerUserView from "@/views/ManagerUserView.vue";
import ManagerReportView from "@/views/ManagerReportView.vue"
import MyPageCrystalView from "@/views/MyPageCrystalView.vue"
import PaymentView from "@/views/PaymentView.vue";
import EventView from "@/views/EventView.vue";
import ReservationView from "@/views/ReservationView.vue";
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
    },{
        path: "/mypage_view",
        name: 'mypage',
        component: MyPageView
    },{
        path: "/my_page_crystal",
        name: 'my_page_crystal',
        component: MyPageCrystalView
    },{
        path: "/manager_user",
        name: 'manager_user',
        component: ManagerUserView
    },{
        path: "/manager_report",
        name: 'manager_report',
        component: ManagerReportView
    },{
        path:  "/payment",
        name: "payment",
        component: PaymentView
    },{
        path:  "/event",
        name: "event",
        component: EventView
    },{
        path: "reservation", //예매
        name: "reservation",
        component: ReservationView
    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
