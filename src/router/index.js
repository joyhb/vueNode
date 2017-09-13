import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import topic from '@/components/topic'
import user from '@/components/user'
import add from '@/components/add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: topic
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: user
    },
    {
      path: '/add',
      name: 'add',
      component: add
    }
  ]
})
