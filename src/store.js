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
    },
    patient: {
    },
    patientList:[],
    orderIndex:0,
    orderList:[],
    recordList:[],
    charHistory:[]
  },
  mutations: {
    LOGIN:function(state,user){
      state.user=Object.assign({},user)
    },
    SETORDERPAGE:function(state,index){
      state.orderIndex=index
    },
    FETCHNEWPATIENT:function(state,name){
      state.patient.name=name
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
      state.charHistory=chat
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

    getAllPatient({commit}){
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

    turnPatientPage({commit},patient){
      Axios.get('/api/getPatient',{params:patient})
      .then((res)=>{
        commit('SETORDERLIST',res.data[0])
        commit('SETRECORDLIST',res.data[1])
      })
      commit('TURNPATIENTPAGE',patient)
      router.push('/data')
    },

    getChat({commit},code){
      Axios.get('/api/getChat',{params:{id:code}})
      .then((res)=>{
        console.log(res.data)
        commit('SETCHATHISTORY',res.data)//do
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
    }
  }
})
