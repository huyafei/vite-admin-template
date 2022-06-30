/**
 * @name: user
 * @description：user.js
 * @date: 2022/2/7 17:06
 * @author: yf_hu
 */
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
const userApi = [
  {
    url: "/user/login",
    type: "post",
    response:(config)=>{
      let {username} =config.body
      const token = tokens[username]
      if(token){
        return {
          status: 200,
          result: token,
        }
      }else {
        return {
          status: 60204,
          message: 'Account and password are incorrect.'
        }
      }
    },
  },
  {
    url: '/user/getInfo',
    type: "get",
    response: (config)=>{
      console.log(config)
      const  xToken  = config.headers['x-token']
      console.log(xToken)

      const info = users[xToken]
      if(info){
        return {
          status: 200,
          result: info,
        }
      }else {
        return  {
          status: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }
    },
  },
];

export default userApi;
