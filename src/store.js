import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import cookies from 'vue-cookies'
import router from './router'
import persistedState from 'vuex-persistedstate'
import { stat } from 'fs'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        user: val.user,
        patient: val.patient,
        patientList: val.patientList,
        orderList: val.orderList,
        recordList: val.recordList,
        isDark: val.isDark,
        isLogin: val.isLogin,
        chatList: val.chatList
      }
    }
  })],
  state: {
    host: 'http://49.158.32.227:3000/',
    user: {
      dr_ID: '',
      name: '',
      pic: ''
    },
    patient: {},
    patientList: [],
    orderIndex: 0,
    orderList: [],
    recordList: [],
    chatHistory: [],
    lastChat: 0,
    isDark: false,
    chatList: [],
    diseaseName: [],
    isLogin: false,
    overlay: false,
    loadSystem: false,
    timer: null,
    patients: [
      {
        index: 1,
        id: 'A123456001',
        name: '小美',
        sex: 'Male',
        remark: '',
        code: 'tes001'
      },
      {
        index: 2,
        id: 'A123456002',
        name: '佳偉',
        sex: 'Male',
        remark: '',
        code: 'tes002'
      },
      {
        index: 3,
        id: 'A123456003',
        name: '大同',
        sex: 'Male',
        remark: '',
        code: 'tes003'
      },
      {
        index: 4,
        id: 'A123456004',
        name: '柏林',
        sex: 'Female',
        remark: '',
        code: 'tes004'
      },
      {
        index: 5,
        id: 'A123456005',
        name: '祈佳',
        sex: 'Female',
        remark: '可能遲到10分鐘',
        code: 'tes005'
      }
    ],
    patientIndex: 0
  },
  mutations: {
    LOGIN: function (state, user) {
      state.user = Object.assign({}, user)
      state.user.dr_ID = 'aaaa'
      state.isLogin = true
    },
    LOGOUT: function (state) {
      state.isLogin = false
    },
    FETCHPATIENT: function (state, patient) {
      state.patient = Object.assign({}, patient)
    },
    SETALLPATIENT: function (state, patientList) {
      state.patientList = patientList
    },
    SETORDERLIST: function (state, list) {
      state.orderList = list
    },
    SETRECORDLIST: function (state, list) {
      state.recordList = list
    },
    SETCHATHISTORY: function (state, chat) {
      for (let i = 0; i < chat.length; i++) {
        state.chatHistory.push(chat[i])
      }
    },
    SETLASTCHAT: function (state, index) {
      state.lastChat = index
    },
    SETDARK: function (state, isDark) {
      state.isDark = isDark
      console.log(isDark)
    },
    SETCHATLIST: function (state, chatList) {
      state.chatList = chatList
    },
    RESETPATIENT: function (state) {
      state.patient = {}
    },
    SETDISEASENAME: function (state, diseaseName) {
      state.diseaseName = diseaseName
    },
    SETOVERLAY: function (state, overlay) {
      state.overlay = overlay
    },
    SETMEDICALRECORD: function (state, medicalRecord) {
      state.patient.medicalRecord = medicalRecord
    },
    SETOVERLAY: function (state) {
      state.overlay = !state.overlay
    },
    RESETCHAT: function (state) {
      state.chatHistory = []
      state.lastChat = 0
    },
    SETPATIENTINDEX: function (state, index) {
      state.patientIndex = index - 1
    }
  },
  actions: {
    login: function ({ commit, state, dispatch }, user) {
      Axios.get('/api/login', { params: user })
        .then((res) => {
          if (res.data.length) {
            res.data[0].pic = state.host + 'dr_pic/' + res.data[0].pic
            commit('LOGIN', res.data[0])
            if (res.data[0].role) {
              cookies.set('isLogin', 'case')
              router.push('/dashboard')
            } else {
              cookies.set('isLogin', 'doctor')
              router.push('/home')
            }
          } else {
            alert('Login error,worng account or password!')
          }
          dispatch('getChatList')
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    getChatList: function ({ commit, state }) {
      console.log(state.user)
      Axios.get('/api/getChatList', { params: state.user })// try not send doctor id
        .then((res) => {
          console.log(res.data)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].profi = state.host + 'patient_pic/' + res.data[i].profi
            console.log()
          }
          commit('SETCHATLIST', res.data)
        })
    },

    setOrderPage: async function ({ commit, dispatch }, patient) {
      await Axios.get('/api/oldPatient', { params: { ID: patient.id } })// now
        .then((res) => {
          if (res.data.length) {
            res.data[0].medicalOrder = res.data[0].medicalOrder.split(',')
            commit('FETCHPATIENT', res.data[0])
            console.log(res.data[0])
          } else {
            commit('FETCHPATIENT', patient)
          }
        })
        .catch((error) => {
        })
      commit('SETPATIENTINDEX', patient.index)
      dispatch('getMedicalRecord')
    },

    getMedicalRecord: function ({ state, commit }) {
      Axios.get('/api/getMedicalRecord',
        { params: { P_code: state.patient.code, dr_ID: state.user.dr_ID } })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].syptom = res.data[i].syptom.split(',')
            res.data[i].medical_order = res.data[i].medical_order.split('-')
          }
          commit('SETMEDICALRECORD', res.data)
          commit('SETOVERLAY')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    order: function ({ dispatch }, patient) {
      patient.medicalOrder = patient.medicalOrder.join(',')
      Axios.get('/api/order', { params: patient })
        .then((res) => {
          dispatch('setOverlay', false)
        })
        .catch((error) => {

        })
    },

    getAllPatient: function ({ commit, state }) {
      Axios.get('/api/getAllPatient')
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].profi = state.host + 'patient_pic/' + res.data[i].profi
          }
          commit('SETALLPATIENT', res.data)
        })
        .catch((error) => {

        })
    },

    turnPatientPage: async function ({ commit, dispatch, state }, patient) {
      await Axios.get('/api/getPatient', { params: patient })
        .then((res) => {
          commit('SETORDERLIST', res.data[0])
          commit('SETRECORDLIST', res.data[1])
          commit('FETCHPATIENT', patient)
        })
      router.push('/data')
    },

    getChat: function ({ commit, state }, params) {
      clearInterval(state.timer)
      commit('RESETCHAT')
      state.timer = window.setInterval(() => {
        if (params.lastChat <= state.lastChat) params.lastChat = state.lastChat
        Axios.get('/api/getChat', { params: params })
          .then((res) => {
            if (res.data.length) {
              commit('SETLASTCHAT', res.data[res.data.length - 1].id)
              commit('SETCHATHISTORY', res.data)
            }
          })
      }, 500)
    },

    chatCommit: function ({ commit, dispatch}, data) {
      Axios.get('/api/chatCommit', { params: data })
        .then((res) => {
          console.log(res)
          commit('SETCHATHISTORY', res.data)
          dispatch('getChatList')
        })
    },

    setDark: function ({ commit }, isDark) {
      commit('SETDARK', isDark)
    },

    logout: function ({ commit }) {
      commit('LOGOUT')
      cookies.remove('isLogin')
      router.push('/login')
    },

    resetPatient ({ commit }) {
      commit('RESETPATIENT')
    },

    getDiseaseName: function ({ commit }) {
      Axios.get('/api/getDiseaseName')
        .then((res) => {
          commit('SETDISEASENAME', res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    setOverlay: function ({ commit }, val) {
      commit('SETOVERLAY', val)
    },
    resetChat: function ({ state }) {
      state.chatHistory = []
      state.lastChat = 0
    },

    setLoadSystem: function ({ state, dispatch }, system) {
      if (router.history.current.path != '/') router.push('/')
      state.loadSystem = system
      if (system) {
        // dispatch('getAllPatient')
      }
      console.log(system)
    }
  },
  getters: {
  }
})
