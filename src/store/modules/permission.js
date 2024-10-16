import { constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'
import baseRouters from '@/router/modules/base'
import { deepClone } from "@/utils";

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, route) {
    return new Promise(resolve => {
      let accessedRoutes
      let dtRoutes = {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
          ...baseRouters,
          ...route,
          {
            path: '/404',
            component: (resolve) => require(['@/views/error-page/404'], resolve),
            hidden: true
          },
        ]
      };
      let _route = deepClone(route)
      _route.forEach(item => {
        item.name = 'main-' + item.name
        item.path = '/main' + item.path
      })
      let _baseRouters = deepClone(baseRouters)
      _baseRouters.forEach(item => {

        item.name = 'main-' + item.name
        item.path = '/main' + item.path
        item.meta.affix = false
      })
      accessedRoutes = [
      dtRoutes,
        {
          path: '*',
          redirect: '/404',
          hidden: true
        },
        ..._baseRouters,
        ..._route,
      ]
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true, //需要加上所属的模块名
  state,
  mutations,
  actions
}