// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import './static/common.css'
import './static/common.js'
import './utils/filter_utils'



Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

