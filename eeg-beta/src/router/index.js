import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/homepage',
    name: 'homepage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/homepage.vue')
    }
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/loginpage.vue')
    }
  },
  {
    path: '/systemset',
    name: 'systemset',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/sysytmsetuppage.vue')
    }
  },
  {
    path: '/appointmentpage',
    name: 'appointmentpage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/appointment page.vue')
    }
  },

  {
    path: '/reporterpage',
    name: 'reporterpage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/datareporterpage.vue')
    }
  },
  {
    path: '/paperpage',
    name: 'paperpage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/paperpage.vue')
    }
  },
  {
    path: '/videoPage',
    name: 'videoPage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/videoPage.vue')
    },
    children:[
      {
        path:'/',
        name:'eeg',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/eeguse.vue')
        },
      },
      {
        path:'/videoPage/featureanalysis',
        name:'feature',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/heatmap.vue')
        },
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
