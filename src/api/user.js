import request from '@/plugins/axios'

export function loginReq(data) {
  return request({
    url: '/user/login',
    data,
    method: 'post',
  })
}

export function getInfoReq() {
  return request({
    url: '/user/getInfo',
    method: 'get',
  })
}

export function logoutReq() {
  return request({
    url: '/user/loginOut',
    method: 'post'
  })
}
