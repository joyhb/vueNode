<template>
  <div class="add">
    <div class="title">
      发布主题
    </div>
    <div class="add-title">
      <span>主题名称</span>
      <span><input type="text" name="" value="" v-model="title"></span>
    </div>
    <div class="add-content">
      <span>主题内容</span>
      <span><textarea name="name" rows="8" cols="80" v-model="content"></textarea></span>
    </div>
    <div class="button">
      <a href="javascript:void(0);" @click="submit">发布</a>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      tab: '',
      content: ''
    }
  },
  methods: {
    submit: function () {
      axios.post('https://cnodejs.org/api/v1/topics', {
          title:this.title,
          tab: 'dev',
          content: this.content,
          accessToken: '26ccd3fc-e6fa-4046-9467-ffea5c2b1603'
      }).then((res) => {
        console.log('发布成功')
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    mavonEditor
  }
}
</script>

<style lang="scss">
  .add{
    max-width: 960px;
    margin: 20px auto;
    background: #fff;
    height: 500px;
    .title{
      text-align: left;
      height: 40px;
      background: #eee;
      padding-left: 20px;
      line-height: 40px;
    }
  }
  .add-title, .add-content, .button{
    text-align: left;
    padding: 20px;
  }
  .add-title input{
    width: 500px;
    border: 1px solid #333;
    height: 35px;
  }
  .add-content textarea{
    width: 500px;
    border: 1px solid #333;
  }
  .button a{
    display: block;
    background: #8729E7;
    width: 300px;
    color: white;
    text-align: center;
    line-height: 40px;
    height: 40px;

  }
</style>
