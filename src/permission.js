import router, { asyncRoutes } from '@/router'
import store from './store'
import settings from './settings'
import { getToken, setToken } from '@/utils/auth'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'

const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // 加载进度条
  if (settings.isNeedNprogress) NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      // 判断是否有用户信息
      let isGetUserInfo = store.state.permission.isGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          // 备注: roles 必须是 object array! 例如: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          let accessRoutes  = await store.dispatch('permission/generateRoutes', roles)

          // setting constRouters and accessRoutes to vuex , in order to sideBar for using
          store.commit('permission/M_routes', accessRoutes)
          // dynamically add accessible routes
          //router4 addRoutes destroyed
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          //already get userInfo
          store.commit('permission/M_isGetUserInfo', true)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          if (settings.isNeedNprogress) NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      if (settings.isNeedNprogress) NProgress.done()
    }
  }
})

router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done()
})
