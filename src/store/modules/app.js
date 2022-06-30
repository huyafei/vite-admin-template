import defaultSettings from '@/settings'
const state = {
  settings: defaultSettings,
  sidebar: {
    opened: true
  },
  device: 'desktop',

  cachedViews: []
}

const mutations = {

  /*
   * data:ObjType
   * such as {sidebarLogo:false}
   * */
  SET_SETTINGS: (state, data) => {
    state.settings = { ...state.settings, ...data }
  },

  SET_SIDEBAR_OPENED: (state, data) => {
    state.sidebar.opened = data
  },
  TOGGLE_SIDEBAR_OPENED: (state) => {
    state.sidebar.opened = !state.sidebar.opened
  },

  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },

  /*keepAlive缓存*/
  ADD_CACHED_VIEW: (state, view) => {
    console.log('ADD_CACHED_VIEW', view)
    if (state.cachedViews.includes(view)) return
    state.cachedViews.push(view)
  },
  DEL_CACHED_VIEW: (state, view) => {
    console.log('DEL_CACHED_VIEW', view)
    const index = state.cachedViews.indexOf(view)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  RESET_CACHED_VIEW: (state) => {
    state.cachedViews = []
  }
}
const actions = {
  setSidebarOpened({ commit }, data) {
    commit('SET_SIDEBAR_OPENED', data)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
