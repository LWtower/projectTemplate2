import axios from "axios";
import { Message, Loading } from "element-ui";

let loadingInstance = null; // 这里设置loading加载的接收参数
// 请求
const http = axios.create({
  // 跨域请求时是否需要使用凭证
  // withCredentials: true,
  baseURL: "基础地址",
  timeout: 100000, // 请求超时时间
  headers: {
    get: {
      "Content-Type": "application/json;charset=utf-8"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  },
  async: false
});

// 请求拦截
http.interceptors.request.use(
  config => {
    // 如果需要使用token进行请求拦截也是在这里进行配置
    loadingInstance = Loading.service({
      lock: true,
      text: "数据正在加载中",
      background: "rgba(0, 0, 0, 0.8)"
    });
    return config;
  },
  err => {
    console.log(err);
  }
);
// 响应拦截
http.interceptors.response.use(
  res => {
    // 对响应码的处理
    // 对响应码的处理
    switch (res.data.code) {
      case 200:
        Message.success("数据获取成功");
        loadingInstance.close(); // 关闭数据加载页面，返回一个promise函数，进行回调
        return Promise.resolve(res.data);
      case 400:
        loadingInstance.close();
        Message.error("数据初始化失败 查询失败，请刷新重试");
        break;
      default:
        loadingInstance.close();
        return Promise.resolve(res.data);
    }
  },
  error => {
    // 对响应码的处理
    switch (error.response.status) {
      case 400:
        Message.error("请求错误(400)");
        break;
      case 401:
        Message.error("未授权，请重新登录(401)");
        break;
      case 403:
        Message.error("拒绝访问(403)");
        break;
      case 404:
        Message.error("请求出错(404)");
        break;
      case 408:
        Message.error("请求超时(408)");
        break;
      case 500:
        Message.error("服务器错误(500)");
        break;
      case 501:
        Message.error("服务未实现(501)");
        break;
      case 502:
        Message.error("网络错误(502)");
        break;
      case 503:
        Message.error("服务不可用(503)");
        break;
      case 504:
        Message.error("网络超时(504)");
        break;
      case 505:
        Message.error("HTTP版本不受支持(505)");
        break;
      default:
        Message.error("数据初始化失败 查询失败，请刷新重试");
    }
    loadingInstance.close();
    return Promise.reject(error.response);
  }
);
// 返出
export default http;
