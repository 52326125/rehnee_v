import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import cookies from 'vue-cookies'
import Axios from 'axios'
import vCahrt from 'v-charts-v2'

Vue.config.productionTip = false
Vue.use(cookies)
Vue.use(vCahrt)
//login check
Axios.defaults.withCredentials=true
/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8081'); //先允許跨域請求才能進來
  res.header("Access-Control-Allow-Credentials", "true");//處理cookie資訊，如果有，並且不對每次請求都新開一個session
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
  res.header('Access-Control-Allow-Headers', 'x-requested-with,content-type');
  next();
});*/
router.beforeEach((to, from, next) => {
  const temp=cookies.isKey('isLogin');
  console.log(temp)
  if(temp){
    next();
  }else{
    if(to.path !=='/login'){
      next('/login');
    }else{
      next();
    }
  }
  if(from.path=='/order'){
    store.state.orderIndex=0
  }
  if(cookies.get('isLogin')=='doctor'){
    next()
  }else if(cookies.get('isLogin')=='case'){
    if(to.path!=='/dashboard' && to.path!=='/data'){
      next('/dashboard')
    }
  }
})

new Vue({
  router,
  store,
  vuetify,  
  render: h => h(App)
}).$mount('#app')
