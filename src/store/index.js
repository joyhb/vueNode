import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  userInfo: {},
  isLogin: false,

  actions: {
    handleUserState (state) {
      state.state.isLogin = !state.state.isLogin
    },
    //用户信息
    handleUser: function (state, data) {
      state.state.userinfo = data
    }
  }
})

export default store
