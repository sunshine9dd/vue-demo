import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Garden from '@/components/Garden/garden'
import AddGarden from '@/components/Garden/addGarden'
import Practice from '@/components/Practice/practice'
import AddPractice from '@/components/Practice/addPractice'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    }, {
      path: '/home',
      // name: 'home',
      component: Home,
      meta: {
        title: '主页',
        requireAuth: true
      },
      children: [
        {
          path: '/',
          name: 'garden',
          component: Garden,
          hidden: true,
          meta: {
            title: '园所管理',
            requireAuth: true,
            keepAlive: false
          }
        },
        {
          path: '/addGarden',
          name: 'addGarden',
          component: AddGarden,
          hidden: true,
          meta: {
            title: '添加园所',
            requireAuth: true,
            keepAlive: false
          }
        },
        {
          path: '/practice',
          name: 'practice',
          component: Practice,
          hidden: true,
          meta: {
            title: '练习管理',
            requireAuth: true,
            keepAlive: false
          }
        },
        {
          path: '/addPractice',
          name: 'addPractice',
          component: AddPractice,
          hidden: true,
          meta: {
            title: '新建练习',
            requireAuth: true,
            keepAlive: false
          }
        }
      ]
    }
  ]
})
