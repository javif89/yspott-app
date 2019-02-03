import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SpotDetails from '@/components/SpotDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/miami'
    },
    {
      path: '/:city',
      name: 'home',
      component: Home,
      children: [
          {
            name: "spot",
            path: "spot/:id",
            component: SpotDetails
          }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
