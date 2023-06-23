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
import ManagerMainView from "@/views/ManagerMainView.vue";
import SignUpView from "@/views/SignUpView.vue";
import FindIdResultView from "@/views/FindIdResultView.vue";
import FindIdView from "@/views/FindIdView.vue";
import FindPwResultView from "@/views/FindPwResultView.vue";
import FindPwView from "@/views/FindPwView.vue";
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomepageMainView
    },{
        path: "/main/login",
        name: 'login',
        component: LoginView
    },
    {
        path: "/main/sign_up",
        name: 'sign_up',
        component: SignUpView
    },{
        path: "/findId",
        name: 'find_id',
        component: FindIdView
    },{
        path: "/findId/find_id_result",
        name: 'find_id_result',
        component: FindIdResultView
    },{
        path: "/findPw",
        name: 'find_pw',
        component: FindPwView
    },{
        path: "/findPw/find_pw_result",
        name: 'find_pw_result',
        component: FindPwResultView
    },
    {
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
        path: "/manager_main",
        name: 'manager_main',
        component: ManagerMainView
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
        path: "/reservation", //예매
        name: "reservatio" +
            "n",
        component: ReservationView
    },{

    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router