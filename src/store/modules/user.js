import { loginReq, logoutReq, getInfoReq } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      loginReq(data)
        .then((res) => {
          if (res.status === 200) {
            const { token } = res.result
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfoReq()
        .then((res) => {
          const result = res.result
          if (!result) {
            return reject('验证失败，请重新登录.')
          }
          commit('SET_USERINFO',result)
          const { roles } = result

          if (!roles || roles.length <= 0) {
            reject('getInfo: 角色必须是非空数组!')
          }
          commit('SET_ROLES', roles)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 退出登录
  logout() {
    return new Promise((resolve, reject) => {
      // logoutReq()
      //   .then(() => {
          removeToken() // must remove  token  first
          resolve()
        // })
        // .catch((error) => {
        //   reject(error)
        // })
    })
  },
  // 清除token
  resetToken() {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
