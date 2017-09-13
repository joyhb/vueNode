<template>
  <div class="toast">
    <div class="toastShoadow"></div>
    <div class="animated bounceInDown toast-box">
      <template v-if="isShure === true">
        <div class="toast-text">
          {{shureText}}
        </div>
        <div class="toast-shure">
          <a href="javascript:void(0);" class="toast-btn" @click="shureOk($event)">{{enter}}</a>
          <a href="javascript:void(0);" class="toast-btn-cancel" @click="close">{{cancel}}</a>
        </div>
      </template>
      <template v-else>
        <div class="toast-text">
          {{text}}
        </div>
        <div class="toast-shure">
          <a href="javascript:void(0);" class="toast-btn" @click="close">{{enter}}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import animate from 'animate.css'
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    enter: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: String,
      default: '取消'
    },
    isShure: {
      type: Boolean,
      default: false
    },
    shureText: {
      type: String,
      default:''
    }
  },
  data () {
    return {
      shureRes: true
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    },
    shureOk: function (e) {
      this.$emit('shureOk', e)
    }
  }
}
</script>

<style lang="scss">
  .toast{
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .toastShoadow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity:0.5;
    z-index: 9999;
  }
  .toast-box{
    background: #fff;
    position: fixed;
    width: 400px;
    height: 240px;
    top:50%;
    left: 50%;
    margin-left: -180px;
    margin-top: -150px;
    z-index: 99999;
    border-radius: 10px;
  }
  .toast-text{
    padding: 20px;
    text-align: center;
    font-size: 16px;
    height: 80px;
    line-height: 100px;
  }
  .toast-shure{
    padding: 20px;
    height: 100px;
    a{
      float: left;
      padding: 0px 20px;
      margin: 0px 20px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      color: white;
      font-size: 16px;
      text-decoration: none;
    }
  }
  .toast-btn{
    background: #8729E7;
  }
  .toast-btn-cancel{
    background: #666;
  }
</style>
