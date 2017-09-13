<template>
  <div id="app">
    <top></top>
    <router-view></router-view>
    <foo></foo>
  </div>
</template>

<script>
import './assets/css/common.css'
import top from './components/header'
import foo from './components/footer'
export default {
  name: 'app',
  components: {
    top,
    foo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
