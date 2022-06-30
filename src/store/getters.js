const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,

  device: (state) => state.app.device,
  cachedViews: (state) => state.app.cachedViews
}
export default getters
