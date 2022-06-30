import axios from "axios";
import {ElMessage } from 'element-plus'
import Cookies from "./cookie";
import router from "../router";
import store from "../store"
import { getToken } from '../utils/auth'
axios.defaults.baseURL = import.meta.env.VITE_PROJECT_API_baseURL;

// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// 超时时间 10s
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 全局加token
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    console.log(config)
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const res = response.data;
    if(res.status!==200){
      ElMessage.error(res.message || 'Error');
      if (res.status === 99999) {
        router.push({
          path: "/login",
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }else {
      return res;
    }



  },
  function (error) {
    console.log('err' + error) // for debug
    // 对响应错误做点什么
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);
export default axios;
