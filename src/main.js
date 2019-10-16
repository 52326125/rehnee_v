import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import cookies from 'vue-cookies'
import Axios from 'axios'
import vCahrt from 'v-charts'
// import navigation from 'vue-navigation'

Vue.config.productionTip = false
Vue.use(cookies)
Vue.use(vCahrt)
// Vue.use(navigation,{router,store})
// login check
Axios.defaults.withCredentials = true
Axios.defaults.baseURL = 'http://49.158.32.227:3000/'
/* app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8081'); //先允許跨域請求才能進來
  res.header("Access-Control-Allow-Credentials", "true");//處理cookie資訊，如果有，並且不對每次請求都新開一個session
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
  res.header('Access-Control-Allow-Headers', 'x-requested-with,content-type');
  next();
}); */
router.beforeEach((to, from, next) => {
  const temp = store.state.isLogin
  console.log(temp)
  if (temp) {
    next()
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
  if (cookies.get('isLogin') == 'doctor') {
    next()
  } else if (cookies.get('isLogin') == 'case') {
    if (to.path !== '/dashboard' && to.path !== '/data') {
      next('/dashboard')
    }
  }

  if (to.path == '/order') {
    store.dispatch('setTitle', 'medical order system')
    next()
  } else if (to.path == '/dashboard' || to.path == '/data') {
    store.dispatch('setTitle', 'Rehnee system')
    next()
  } else {
    store.dispatch('setTitle', 'home')
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
