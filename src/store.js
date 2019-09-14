import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import cookies from 'vue-cookies'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://127.0.0.1:3000/',
    user: {
      dr_ID: '',
      name: '',
      pic: ''
    }
  },
  mutations: {
    LOGIN:function(state,user){
      state.user=Object.assign({},user)
    }
  },
  actions: {
    login: function({commit},user){
      Axios.get('/api/login',{params:user})
      .then((res)=>{
        if (res.data.length){
          commit('LOGIN',res.data[0])
          cookies.set('isLogin','1')
          router.push('/home')
        }
      })
      .catch(function(error){
        console.log(error);
      })
    }
  },
  getters: {
    getName: function(state){
      return state.user.name
    },
    getPic: function(state){
      //var path='assets/dr_pic/'+state.user.pic
      return state.host+'dr_pic/'+state.user.pic
    }
  }
})
