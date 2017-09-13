<template>
  <div class="user">
    <div class="userInfo">
      <div class="title">
        用户主页
      </div>
      <div class="info">
        <ul>
          <li><img :src="avatar_url" alt=""></li>
          <li>用户名:{{loginname}}</li>
          <li>当前积分:{{score}}</li>
          <li>注册时间:{{tranTime(create_at)}}</li>
        </ul>
      </div>
    </div>

    <div class="userInfo">
      <div class="title">
        最近参与的话题
      </div>
      <loading v-if="loading"></loading>
        <div class="animated fadeInUp index-list" v-for="item in recent_replies">
          <div class="cell">
            <router-link class="user_avatar pull-left" :to="{ name: 'user', params: {loginname:loginname} }">
              <img :src="item.author.avatar_url" title="coordcn">
            </router-link>
            <a class="last_time pull-right" href="javascript:void(0)">
              <!-- <img class="user_small_avatar" src="https://avatars3.githubusercontent.com/u/7410465?v=4&amp;s=120"> -->
              <span class="last_active_time">{{tranTime(item.last_reply_at)}}</span>
            </a>
            <div class="topic_title_wrapper">
            <router-link :to="{ name: 'topic', params: {id: item.id} }">{{item.title}}</router-link>
            </div>
          </div>
        </div>
    </div>

    <div class="userInfo">
      <div class="title">
        最近创建的话题
      </div>
      <loading v-if="loading"></loading>
        <div class="animated fadeInUp index-list" v-for="item in recent_topics">
          <div class="cell">
            <router-link class="user_avatar pull-left" :to="{ name: 'user', params: {loginname:loginname} }">
              <img :src="item.author.avatar_url" title="coordcn">
            </router-link>
            <a class="last_time pull-right" href="javascript:void(0)">
              <span class="last_active_time">{{tranTime(item.last_reply_at)}}</span>
            </a>
            <div class="topic_title_wrapper">
            <router-link :to="{ name: 'topic', params: {id: item.id} }">{{item.title}}</router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../assets/config'
import {tranTime, translateTab} from '../assets/util'
import loading from './loading'
export default {
  data () {
    return {
      loading: true, // 加载
      recent_replies: [], //最近创建话题列表
      recent_topics: [], // 最近参与的话题
      avatar_url: '', // 用户头像
      create_at: '', // 注册时间
      githubUsername: 'loading...', // 用户名称
      loginname: 'loading...', // 用户名称
      score: 'loading...' // 用户积分
    }
  },
  methods: {
    tranTime: tranTime, // 引入tranTime格式化时间
    translateTab: translateTab, // 转换分类为中文显示
    // 获取用户信息
    getUserInfo: function () {
      axios.get(config.ajaxUrl + '/api/v1/user/' + this.$route.params.loginname, {
      }).then((res) => {
        this.loading = false

        const data = res.data
        this.avatar_url = data.data.avatar_url
        this.create_at = data.data.create_at
        this.githubUsername = data.data.githubUsername
        this.loginname = data.data.loginname
        this.score = data.data.score

        this.recent_replies = []
        // 填充最近创建话题列表
        data.data.recent_replies.map((item) => this.recent_replies.push(item))
        // 填充最近参与的话题
        data.data.recent_topics.map((item) => this.recent_topics.push(item))
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getUserInfo()
  },
  components: {
    loading
  }
}
</script>

<style lang="scss" scoped>
.user{
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;
}
.userInfo{
  margin: 10px 0px;
  background: #fff;
  text-align: left;
  width: 100%;
}
.info{
  padding: 20px;
  img{
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }
}
.title{
  background: #eee;
  padding: 10px;
}
.cell{
  padding: 10px;
  position: relative;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
}
.pull-left{
  float: left;
  img{
    padding-right: 10px;
  }
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
