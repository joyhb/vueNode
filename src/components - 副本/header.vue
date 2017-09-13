<template>
  <div class="header">
      <div class="header-name">
        <div class="l">
          Vuejs学习中...
        </div>
        <div class="r">
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li>API</li>
            <li v-if="storage">
              <router-link :to="{ name: 'user', params: {loginname: storage.loginname} }">
                <img :src="storage.avatar_url" alt="">{{storage.loginname}}
              </router-link>
              <a href="javascript:void(0);" @click="login">未读消息</a>
              <router-link to="/add">发布主题</router-link>
              <a href="javascript:void(0);" @click="logout">退出</a>
            </li>
            <li v-else><a href="javascript:void(0);" @click="login">登陆</a></li>
          </ul>
        </div>
        <div class="clear">
        </div>
      </div>
      <template>
        <login></login>
      </template>
      <toast
       v-if="toast.show"
       :type="toast.type"
       :text="toast.text"
       :isShure="toast.isShure"
       :shureText="toast.shureText"
       @close="close"
       @shureOk="shureOut"
      ></toast>
  </div>
</template>

<script>
import login from './login'
import toast from './toast'
export default {
  data () {
    return {
      toast: {
        show: false,
        text: '',
        isShure: false,
        shureText: ''
      },
      storage: {} // 用户登录信息存储在localStorage
    }
  },
  methods: {
    // 打开登录框
    login: function() {
      const loginrap = document.getElementById('loginrap')
      loginrap.style.display = 'block'
    },
    // 用户退出
    logout: function () {
      this.toast.shureText = '确定要退出吗？'
      this.toast.isShure = true
      this.toast.show = true
    },
    // 退出方法
    shureOut: function (e) {
      const storages = localStorage.removeItem('res')
      if (this.storages === '') {
        this.toast.text = '退出成功...'
        this.toast.show = true
        this.$router.push('/')
      }
    },
    // 关闭提示框
    close: function () {
      this.toast.show = false
      this.toast.isShure = false
    },
    // 获取localStorage用户登录信息
    getStorage: function () {
      let _this = this
      _this.storage = JSON.parse(localStorage.getItem('res'))
    }
  },
  created () {
    this.getStorage()
  },
  components: {
    login,
    toast
  }
}
</script>

<style lang="scss">
  .header{
    background: #8729E7;
    height: 50px;
    width: 100%;
  }
  .header-name{
    line-height: 2em;
    height: 50px;
    color: #fff;
    line-height: 50px;
    width: 960px;
    margin: 0 auto;
    text-align: left;
    .l{
      float: left;
    }
    .r{
      float:right;
      a{
        color: #fff;
        text-decoration: none;
      }
      li{
        float: left;
        padding: 0 10px;
      }
      img{
        width: 16px;
        height: 16px;
        border-radius: 2px;
        border: 2px solid #fff;
      }
    }
    .clear{
      clear: both;
    }
  }
</style>
