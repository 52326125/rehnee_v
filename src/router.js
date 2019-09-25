import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home-card'
import Login from './views/login'
import order from './components/home/patientList-card'
import dashboard from './views/dashboard'
import data from './views/data'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: order,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/data',
      name: 'data',
      component: data
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
})
