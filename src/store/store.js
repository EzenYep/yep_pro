import { createStore } from "vuex";
import VueCookie from 'vue-cookie';

export default createStore({
  state: {
    token: VueCookie.get('token') || '', // cookie 사용
    email: VueCookie.get('email') || ''
  },
  mutations: {
    SET_TOKEN(state, userInfo) {
      state.token = userInfo.accessToken;
      state.email = userInfo.email;
      VueCookie.set('token', state.token, 1);// cookie에 토큰을 저장합니다. 1일 동안 유지됩니다.
      VueCookie.set('email', state.email, 1);
      console.log(userInfo.email)
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      state.email = '';
      VueCookie.delete('token'); // cookie의 토큰을 제거합니다.
      VueCookie.delete('email');
    }
  },
  actions: {},
  modules: {}
});
