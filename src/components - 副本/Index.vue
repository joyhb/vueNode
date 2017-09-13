<template>
  <div class="index">
    {{userInfo}}
    <div class="index-content">
      <div class="index-top">
        <ul>
          <li @click="toogle(index)" v-for="(item, index) in tabs" :class="{active:active === index}">{{item.text}}</li>
        </ul>
      </div>
      <loading v-if="loading"></loading>
      <list
         v-for="item in list"
         :avatarUrl="item.author.avatar_url"
         :loginname="item.author.loginname"
         :userId="item.author_id"
         :replyCount="item.reply_count"
         :visitCount="item.visit_count"
         :lastReplyat="item.last_reply_at"
         :top="item.top"
         :tab="item.tab"
         :title="item.title"
         :key="item.id"
         :titleId="item.id"
      ></list>
    </div>
  </div>
</template>

<script lang="babel">
import axios from 'axios'
import list from './list'
import loading from './loading'
import animate from 'animate.css'
import config from '../assets/config'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      list: [], // 初始化帖子列表
      active: 0,
      loading: true, // 初始化加载
      tabs: [
        {
          id: 0,
          name: 'all',
          text: '全部'
        },
        {
          id: 1,
          name: 'share',
          text: '分享'
        },
        {
          id: 2,
          name: 'ask',
          text: '问答'
        },
        {
          id: 3,
          name: 'job',
          text: '招聘'
        }
      ]
    }
  },
  name: 'index',
  methods: {
    // 获取帖子列表信息
    getList: function (index, page, limit) {
      axios.get(config.ajaxUrl + '/api/v1/topics', {
        params: {
          page: this.page || 1,
          tab: index,
          limit: this.limit || 20
        }
      }).then((response) => {
        this.list = []
        this.loading = false
        const data = response.data
        // 填充帖子列表
        data.data.map((item) => this.list.push(item))
      }).catch((error) => {
        console.log(error)
      })
    },
    toogle: function (index) {
      var tabName
      if (index === 0) {
        this.tabName = ''
        this.getList(this.tabName)
      }
      if (index === 1) {
        this.tabName = 'share'
        this.getList(this.tabName)
      }
      if (index === 2) {
        this.tabName = 'ask'
        this.getList(this.tabName)
      }
      if (index === 3) {
        this.tabName = 'job'
        this.getList(this.tabName)
      }
      this.active = index
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  components: {
    loading,
    list
  },
  created () {
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  max-width: 960px;
  background: #fff;
  margin: 20px auto;
  width: 100%;
}
.index-top{
  height: 40px;
  background: #f6f6f6;
  line-height: 40px;
  text-align: left;
  padding-left: 20px;
}
.cell{
  padding: 10px;
  position: relative;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
}
.pull-left{
  float: left;
}
.pull-right{
  float: right;
}
.topic_title_wrapper{
  text-align: left;
  white-space: nowrap;
}
.topic_title_wrapper, .user_name, a.dark, a.topic_title {
    text-overflow: ellipsis;
}
.topic_title_wrapper a{
  color: #666;
  font-weight: bold;
  text-decoration: none;
}
.topic_title_wrapper a:hover{
  color: #666;
  font-weight: bold;
  text-decoration: underline;
}
.index-list{
  line-height: 2em;
}
.topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
}
.topiclist-tab-top {
    background-color: #8729E7;
    color: #fff;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
}
.reply_count {
    width: 100px;
    display: inline-block;
    text-align: center;
}
.last_time {
    font-size: 11px;
    display: inline-block;
    margin-left: 20px;
    color: #777;
}
.last_time .last_active_time {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
}
.last_time .user_small_avatar {
    height: 18px;
    width: 18px;
    vertical-align: middle;
    margin-right: .5em;
    border-radius: 3px;
}
.user_avatar img, .user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.index-top ul li{
  float: left;
  padding: 0px 10px;
}
.active{
  color: red;
  background: #eee;
}
</style>
