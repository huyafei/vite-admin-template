//to fix js-token issue for electron so replace js-cookie to localStorage
//detail to look https://bbs.csdn.net/topics/397963088
import Cookie from '../plugins/cookie'

const TokenKey = 'Admin-Token'
export function getToken() {
  // return localStorage.getItem(TokenKey)
  return Cookie.get(TokenKey)
}

export function setToken(token) {
  // return localStorage.setItem(TokenKey, token)
  return Cookie.set(TokenKey,token)
}

export function removeToken() {
  // return localStorage.removeItem(TokenKey)
  return Cookie.remove(TokenKey)
}
