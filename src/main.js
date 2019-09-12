import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import cookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(cookies)
//login check
router.beforeEach((to, from, next) => {
  const temp=cookies.isKey('isLogin');
  if(temp){
    next();
  }else{
    if(to.path !=='/login'){
      next('/login');
    }else{
      next();
    }
  }
})

new Vue({
  router,
  store,
  vuetify,  
  render: h => h(App)
}).$mount('#app')
