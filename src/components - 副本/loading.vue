<template>
  <div class="loading">
    {{text}}
  </div>
</template>

<script lang="babel">
export default {
  props: {
    text: {
      type: String,
      default: '使劲加载中...'
    }
  }
}
</script>

<style lang="css">
.loading{
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
