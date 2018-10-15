import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';

const Axios = axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: 'http://mxxxy.cn/api',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put'
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Message({
        message: error.message,
        type: "error",
    });
    return Promise.reject(error.message);
  },
);

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.data.Status !== 200) {
        Message({
            message: res.data.Msg,
            type: "error",
        });
        return Promise.reject(res.data.Msg);
    }
    return res.data;
  },
  error => {
    if (error.message.indexOf('timeout') > -1) {
        Message({
            message: '请求超时,请检查网络',
            type: "error",
        });
    }
    if (error.message.indexOf('Network Error') > -1) {
        Message({
            message: '当前无网络,请检查网络',
            type: "error",
        });
    }
    return Promise.reject(error.message);
  },
);
export default { axios: Axios };
