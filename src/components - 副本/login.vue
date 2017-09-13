<template>
  <div class="login" id="loginrap">
    <div class="loging-shadowbox"></div>
    <div class="animated bounceInDown login-box">
      <div class="title">
        用户登录
      </div>
      <a href="javascript:void(0);" class="close" @click="close"></a>
      <div class="login-input">
        <span><input type="text" v-model="accesstoken" name="" value=""></span>
        <span v-if="showTips.default" class="red">{{showTips.text}}</span>
        <span><button type="button" @click="login" name="button">登录</button></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import animate from 'animate.css'
export default {
  data () {
    return {
      // 提示输入accesstoken
      showTips: {
        default:false,
        text: '请输入accesstoken'
      },
      accesstoken : '' // 用户登录令牌
    }
  },
  methods: {
    // 用户登录方法
    login: function () {
      // 判断用户是否输入
      if (this.accesstoken === '' || this.accesstoken === 'undefine') {
         this.showTips.default = true
         return
      }
      axios.post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: this.accesstoken
      }).then((res) => {
        this.$store.dispatch('login', res)
        // 把用户登录信息存储在localStorage
        localStorage.setItem('res',JSON.stringify(res.data))
        // 跳转到当前页面
        this.$router.push('/')
        // 关闭登录框
        this.close()
      }).catch((err) => {
        console.log(err)
      })
    },
    // 关闭登录框
    close: function () {
      const loginrap = document.getElementById('loginrap')
      loginrap.style.display = 'none'
      this.showTips.default = false
      this.accesstoken = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
    display: none;
  }
  .loging-shadowbox{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }
  .login-box{
    background: #fff;
    position: fixed;
    width: 400px;
    height: 300px;
    top:50%;
    left: 50%;
    margin-left: -180px;
    margin-top: -150px;
    z-index: 99999;
    border-radius: 10px;
    .title{
      height: 45px;
      background: #eee;
      line-height: 45px;
      text-align: left;
      padding-left: 20px;
      font-size: 16px;
      border-radius: 10px 10px 0px 0px;
    }
  }
  .login-input{
    width: 260px;
    margin: 0 auto;
    padding-top: 50px;
    .red{
      color: red;
    }
  }
  .login-input input{
    width: 260px;
    height: 25px;
  }
  .login-input button{
    margin-top: 50px;
    width: 260px;
    height: 35px;
    color: #fff;
    border: 0px;
    background: #8729E7;
  }
  .close{
    position: absolute;
    right: 10px;
    top: 15px;
    width: 20px;
    height: 20px;
    background: url(../assets/img/login_close.png) no-repeat;
  }
</style>
