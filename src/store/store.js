import { createStore } from "vuex";
import VueCookie from 'vue-cookie';

export default createStore({
  state: {
    token: VueCookie.get('token') || '',
    email: VueCookie.get('email') || '',
    userState: VueCookie.get('userState') || 0,  // 사용자 상태를 저장하는 속성을 추가합니다. 초기값은 0입니다.
  },
  mutations: {
    SET_TOKEN(state, userInfo) {
      state.token = userInfo.accessToken;
      state.email = userInfo.email;
      state.userState = userInfo.state;  // 로그인 성공시 받은 userInfo에서 state 값을 가져옵니다.
      VueCookie.set('token', state.token, 1);
      VueCookie.set('email', state.email, 1);
      VueCookie.set('userState', state.userState, 1);  // 사용자 상태를 쿠키에도 저장합니다.
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      state.email = '';
      state.userState = 0;  // 로그아웃시 사용자 상태를 초기화합니다.
      VueCookie.delete('token');
      VueCookie.delete('email');
      VueCookie.delete('userState');  // 사용자 상태 쿠키도 삭제합니다.
    }
  },
  actions: {},
  modules: {}
});