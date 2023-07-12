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
import testView from "@/components/TestView.vue";
import SearchMovieView from "@/views/SearchMovieView";
import EveryTestView from "@/views/EveryTestView";
import store from "@/store/store";
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
    },  {
        path: "/movie/:id",  // 동적 라우트 매개변수 추가
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
        name: "reservation",
        component: ReservationView
    },{
        path:  "/testSignup", //db연결 테스트 부분입니다.
        name: "eventTest",
        component: testView
    }, {
        path: "/searchmovie",
        name: "SearchMovieView",
        component: SearchMovieView
    }, {
        path: "/test",
        name: "EveryTestView",
        component: EveryTestView
    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const adminPages = ['/manager_user', '/manager_main', '/manager_report','/movie_input'];  // 관리자 페이지 경로를 추가합니다.

router.beforeEach((to, from, next) => {
    const adminRequired = adminPages.includes(to.path);  // 관리자 권한이 필요한 페이지인지 확인합니다.
    const loggedIn = store.state.token;
    const state = store.state.userState;  // store에서 userState 값을 가져옵니다.

    if (adminRequired && (!loggedIn || state !== 1)) {
        // 관리자 페이지에 접근하려는데 로그인되지 않았거나 state 값이 1이 아닌 경우 로그인 페이지로 리디렉션합니다.
        store.commit('CLEAR_TOKEN');
        return next('/main/login');
    }

    next();
});
export default router
