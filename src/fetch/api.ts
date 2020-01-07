

import * as urls from './urls.js';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from "element-ui";

export interface ResponseData {
  code: number;
  data?: any;
  message: string;
}

// 创建 axios 实例
let service: AxiosInstance | any;
if (process.env.NODE_ENV === "development") {
  service = axios.create({
    baseURL: "/indexApi", // api 的 base_url
    timeout: 50000 // 请求超时时间
  });
} else {
  // 生产环境下
  service = axios.create({
    baseURL: "/",
    timeout: 50000
  });
}

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error("error:", error); // for debug
    Promise.reject(error);
  }
);

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // Some example codes here:
    // code == 0: success
    if (!res.data) {
			// _.toast(res.data.msg);
			return Promise.reject(res);
		}
		return res;
  },
  (error: any) => Promise.reject(error)
);

// service.post(urls.updateProjectLogsListUrl).then(res=>{
// 	console.log(res)
// })

export function fetch(url, params){
	return new Promise((resolve, reject) => {
		service.post(url, params)
			.then(response => {
				resolve(response);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export default {

	/*
		获取项目日志列表
	*/
	getUpdateProjectLogsList(params){
		return fetch(urls.updateProjectLogsListUrl,params);
	}

};










