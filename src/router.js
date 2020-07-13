import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/home.vue'
import Downloads from './pages/downloads.vue'
import ReportTos from './pages/report-tos.vue'
import HostingApplication from './pages/hosting-application.vue'

Vue.use(Router)

const router = new Router({
  base: __dirname,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      alias: '/index.html',
      component: Home,
      name: 'Home',
      props: {
        bodyClass: 'home'
      }
    },
    {
      path: '/downloads',
      component: Downloads,
      name: 'Downloads',
      props: {
        bodyClass: 'downloads'
      }
    },
    {
      path: '/report-violation',
      component: ReportTos,
      name: 'Report ToS violation',
      props: {
        bodyClass: 'report-tos'
      }
    },
    {
      path: '/hosting-application',
      component: HostingApplication,
      name: 'Apply for hosting verification',
      props: {
        bodyClass: 'hosting-application'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
