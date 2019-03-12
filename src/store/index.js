import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: sessionStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(sessionStorage.getItem('user' || '[]')).name,
      userImg: sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('user' || '[]')).userImg,
      username: sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('user' || '[]')).username,
      roles: sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('user' || '[]')).roles
    },
    path:sessionStorage.getItem('routerPath') == null ? '/login' : sessionStorage.getItem('routerPath')
  },
  mutations: {
    login(state, user){
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      sessionStorage.removeItem('user');
    },
    pathChange(state,path){
      state.path = path;
      sessionStorage.setItem('routerPath', path);
    }
  },
  actions: {

  },
  getters: {

  }
})
