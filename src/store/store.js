import { createStore } from "vuex";
import VueCookie from 'vue-cookie';

export default createStore({
  state: {
    token: VueCookie.get('token') || '', // cookie 사용
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      VueCookie.set('token', token, 1); // cookie에 토큰을 저장합니다. 1일 동안 유지됩니다.
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      VueCookie.delete('token'); // cookie의 토큰을 제거합니다.
    }
  },
  actions: {},
  modules: {}
});
