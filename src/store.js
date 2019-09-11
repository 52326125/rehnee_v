import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    LOGIN:function(state,user){
      state.l++;
    }
  },
  actions: {
    login: function({commit},user){
      Axios.get('/api/login',user)
      .then(function(res){
        commit('LOGIN');
        console.log('1')
      })
      .catch(function(error){
        console.log(error);
      })
    }
  }
})
