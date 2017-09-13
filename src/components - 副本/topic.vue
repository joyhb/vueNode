<template>
  <div class="topic">
    <div class="index-content">
      <div class="index-top">
        <div class="index-top-title">{{content.title}}</div>
        <div class="index-top-em">
          <ul>
            <li>发布于 {{tranTime(content.create_at)}}</li><li>作者 <router-link :to="{ name: 'user', params: {loginname: author.loginname} }">{{author.loginname}}</router-link></li><li>{{content.visit_count}} 次浏览</li><li>最后一次编辑是 {{tranTime(content.last_reply_at)}}</li><li>来自 {{translateTab(content.tab)}}</span></li>
          </ul>
        </div>
      </div>
      <loading v-if="loading"></loading>
      <div class="index-list2" v-html="compiledMarkdown">
      </div>
    </div>
    <div class="comment">
      <loading v-if="loading"></loading>
      <div class="comment-list" v-for="item in replies">
        <div class="comment-title">
          <router-link class="comment-user" :to="{ name: 'user', params: {loginname: item.author.loginname} }"><img :src="item.author.avatar_url" alt="">{{item.author.loginname}}</router-link>
        </div>
        <div class="comment-content" v-html="item.content">
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="babel">
import axios from 'axios'
import config from '../assets/config'
import {tranTime, translateTab} from '../assets/util'
import marked from 'marked'
import loading from './loading'
export default {
  data () {
    return {
      content: [], // 帖子详情
      loading: true,
      author: {
        avatar_url: '使劲加载中...', // 作者头像
        loginname: '使劲加载中...' // 作者名称
      },
      replies: [] // 评论列表
    }
  },
  methods: {
    tranTime: tranTime, // 引入tranTime格式化时间
    translateTab: translateTab, // 转换分类为中文显示
    // 获取文章详细内容
    getContent: function (mdrender) {
      axios.get(config.ajaxUrl + '/api/v1/topic/' + this.$route.params.id + '?mdrender=false').then((response) => {
        const data = response.data
        if (data.success === true) {
          this.loading = false
          this.content = data.data
          this.author.loginname = data.data.author.loginname
          this.author.avatar_url = data.data.author.avatar_url
          data.data.replies.map((item) => this.replies.push(item))
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.content.content || '')
    }
  },
  components: {
    loading
  },
  created () {
    this.getContent()
    // this.markdown()
  }
}
</script>

<style lang="scss">
.comment{
  text-align: left;
  padding: 20px;
  border-top: 10px solid #eee;
  .comment-list{
        line-height: 2em;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
        padding-bottom: 20px;
  }
}
.comment-title img{
    width: 30px;
    height: 30px;
    border-radius: 30px;
    display: block;
    float: left;
}
.comment-user{
  color: #8729E7;
  text-decoration: none;
}
.topic{
  max-width: 960px;
  background: #fff;
  margin: 20px auto;
  width: 100%;
}
.index-top{
  height: 80px;
  background: #f6f6f6;
  line-height: 40px;
  text-align: left;
  padding-left: 20px;
  .index-top-em{
    height: 15px;
    font-size: 11px;
    ul{
      margin: 0;
      padding: 0;
      padding-left: 10px;
    }
    li{
      float: left;
      list-style: initial;
      padding-right: 20px;
    }
  }
  .index-top-title{
    height: 25px;
    font-size: 20px;
    font-weight: bold;
    padding-top: 15px;
  }
}
.index-list2{
  text-align: left;
  padding: 20px;
  line-height: 25px;
  h1,h2{
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  ul{
    padding-left: 20px;
  }
  li{
    list-style: initial;
  }
  table tr td{
    padding: 2px 5px;
    border: 1px solid #eee;
  }
  th{
    padding: 2px 5px;
    border: 1px solid #eee;
  }
  blockquote{
    background: #eee;
    padding: 1px 10px;
  }
  a{
    color: #8729E7;
    text-decoration: none;
  }
  a:hover{
    text-decoration: underline;
  }
}
.index-list2 img{
  display: block;
  max-width: 100%;
}
</style>
