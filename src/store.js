import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import cookies from 'vue-cookies'
import router from './router'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[persistedState({
    storage:window.sessionStorage,
    reducer(val){
      return{
        user:val.user,
        patient:val.patient,
        patientList:val.patientList,
        orderList:val.orderList,
        recordList:val.recordList,
        isDark:val.isDark
      }
    }
  })],
  state: {
    host: 'http://localhost:3000/',
    user: {
      dr_ID: '',
      name: '',
      pic: ''
    },
    patient: {
    },
    patientList:[],
    orderIndex:0,
    orderList:[],
    recordList:[],
    charHistory:[],
    lastChat: 0,
    isDark:false,
    chatList:[],
    diseaseName:[]
  },
  mutations: {
    LOGIN:function(state,user){
      state.user=Object.assign({},user)
    },
    SETORDERPAGE:function(state,index){
      state.orderIndex=index
    },
    FETCHNEWPATIENT:function(state,patient){
      state.patient=Object.assign({},patient)
    },
    FETCHOLDPATIENT:function(state,patient){
      state.patient=Object.assign({},patient)
    },
    GETALLPATIENT:function(state,patientList){
      state.patientList=patientList
    },
    TURNPATIENTPAGE:function(state,patient){
      state.patient=Object.assign({},patient)
    },
    SETORDERLIST:function(state,list){
      state.orderList=list
    },
    SETRECORDLIST:function(state,list){
      state.recordList=list
    },
    SETCHATHISTORY:function(state,chat){
      var i
      for (i=0;i<chat.length;i++){
        state.charHistory.push(chat[i])
      }
    },
    SETLASTCHAT:function(state,index){
      state.lastChat=index
    },
    SETDARK:function(state,isDark){
      state.isDark=isDark
    },
    SETCHATLIST:function(state,chatList){
      state.chatList=chatList
    },
    RESETPATIENT:function(state){
      state.patient={};
    },
    SETDISEASENAME:function(state,diseaseName){
      state.diseaseName=diseaseName
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
    },

    setOrderPage:function({commit},params){
      if(params.ID){
        Axios.get('/api/oldPatient',{params:{ID:params.ID}})//now
        .then((res)=>{
          commit('FETCHOLDPATIENT',res.data[0])
        })
        .catch((error)=>{
          
        })
      }
      commit('SETORDERPAGE',params.page)
    },

    newPatient:function({commit},patient){
      Axios.get('/api/newPatient',{params:patient})
      .then((res)=>{
        console.log(res.data)
        commit('FETCHNEWPATIENT',res.data)
      })
      .catch((error)=>{
        
      })
    },

    order:function({commit},patient){
      Axios.get('/api/order',{params:patient})
      .then((res)=>{
        
      })
      .catch((error)=>{

      })
    },

    getAllPatient:function({commit}){
      Axios.get('/api/getAllPatient')
      .then((res)=>{
        var i
        for (i=0;i<res.data.length;i++){
          res.data[i].profi=this.getters.getHost+'patient_pic/'+res.data[i].profi
        }
        commit('GETALLPATIENT',res.data)
      })
      .catch((error)=>{

      })
    },

    turnPatientPage:function({commit},patient){
      Axios.get('/api/getPatient',{params:patient})
      .then((res)=>{
        commit('SETORDERLIST',res.data[0])
        commit('SETRECORDLIST',res.data[1])
      })
      commit('TURNPATIENTPAGE',patient)
      router.push('/data')
    },

    getChat:function({commit,getters},code){
      var timer=window.setInterval(()=>{
        if(code.lastChat<=getters.getLastChat) code.lastChat=getters.getLastChat
        console.log(router)
        router.beforeEach((to,from,next)=>{
          if(to.path!=='/data'){
            clearInterval(timer)
            next()
          }
        })
        Axios.get('/api/getChat',{params:code})
        .then((res)=>{
          console.log(res.data)
          commit('SETLASTCHAT',res.data[res.data.length-1].id)
          commit('SETCHATHISTORY',res.data)
        })
      },2000)
    },

    chatCommit:function({commit},data){
      Axios.get('/api/chatCommit',{params:data})
      .then((res)=>{
        commit('SETCHATHISTORY',res.data)
      })
    },

    setDark:function({commit},isDark){
      commit('SETDARK',isDark)
    },

    logout:function(){
      cookies.remove('isLogin')
      router.push('/login')
    },

    getChatList:function({commit,getters}){
      Axios.get('/api/getChatList')//try not send doctor id
      .then((res)=>{
        console.log(res.data)
        var i
        for (i=0;i<res.data.length;i++){
          res.data[i].profi=getters.getHost+'patient_pic/'+res.data[i].profi
          console.log(  )
        }
        commit('SETCHATLIST',res.data)
      })
    },

    resetPatient({commit}){
      commit('RESETPATIENT')
    },

    getDiseaseName:function({commit}){
      Axios.get('/api/getDiseaseName')
      .then((res)=>{
        commit('SETDISEASENAME',res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
  getters: {
    getHost:function(state){
      return state.host
    },
    getName: function(state){
      return state.user.name
    },
    getPic: function(state){
      //var path='assets/dr_pic/'+state.user.pic
      return state.host+'dr_pic/'+state.user.pic
    },
    getOrderPage:function(state){
      return state.orderIndex
    },
    test:function(state){
      return state.patient.name
    },
    getPatient:function(state){
      return state.patient
    },
    getAllPatient:function(state){
      return state.patientList
    },
    getPatientID:function(state){
      return state.patient.id
    },
    getOrderList:function(state){
      return state.orderList
    },
    getRecordList:function(state){
      return state.recordList
    },
    getChatHistory:function(state){
      return state.charHistory
    },
    getLastChat:function(state){
      return state.lastChat
    },
    getDark:function(state){
      return state.isDark
    },
    getChatList:function(state){
      return state.chatList
    },
    getCookie:function(){
      return cookies.isKey('isLogin')
    },
    getDiseaseName:function(state){
      return state.diseaseName
    }
  }
})
