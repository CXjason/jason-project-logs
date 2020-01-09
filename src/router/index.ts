import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProjectLogPage from '../views/ProjectLogPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect:"/home/projectLogPage",
    meta:{
      keepAlive:true
    },
    children:[
      {
        path:"/home/projectLogPage",
        name:"projectLogPage",
        component:ProjectLogPage,
        meta:{
          keepAlive:true
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    redirect:"/home"
  },
  {
    path:'*',
    redirect:'/'
  }
]

const router = new VueRouter({
  routes
})

export default router
