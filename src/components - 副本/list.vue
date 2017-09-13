<template>
  <div class="list">
    <div class="animated fadeInUp index-list">
      <div class="cell">
        <router-link class="user_avatar pull-left" :to="{ name: 'user', params: {loginname:loginname} }">
          <img :src="avatarUrl" title="coordcn">
        </router-link>
        <span class="reply_count pull-left">
          <span class="count_of_replies" title="回复数">
            {{replyCount}}
          </span>
          <span class="count_seperator">/</span>
          <span class="count_of_visits" title="点击数">
            {{visitCount}}
          </span>
        </span>
        <a class="last_time pull-right" href="javascript:void(0)">
          <span class="last_active_time">{{tranTime(lastReplyat)}}</span>
        </a>
        <div class="topic_title_wrapper">
          <span class="topiclist-tab-top" v-if="top">置顶</span>
          <span class="topiclist-tab" v-else>{{translateTab(tab)}}</span>
          <router-link :to="{ name: 'topic', params: {id: titleId} }">{{title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animate from 'animate.css'
import {translateTab, tranTime} from '../assets/util'
export default {
  props: [
    'avatarUrl', // 作者头像地址
    'loginname', // 作者用户名
    'userId', // 作者ID
    'replyCount', // 帖子回复数
    'visitCount', // 帖子浏览数
    'lastReplyat', // 最后回复时间
    'top', // 是否置顶
    'good', // 是否精华
    'tab', // 分类名称
    'title', // 帖子标题
    'titleId' // 帖子id
  ],
  methods: {
    tranTime: tranTime, // 引入tranTime格式化时间
    translateTab: translateTab, // 转换分类为中文显示
  }
}
</script>

<style lang="css" scoped>
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
