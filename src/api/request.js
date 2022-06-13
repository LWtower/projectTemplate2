// 封装请求参数
import http from "./index.js";
import QS from "qs";

function request({ method, url, data = {}, params = {} }) {
  if (method == "GET" || method == "get") {
    return http({
      method,
      url,
      params
    });
  } else {
    // 类型转换
    data = QS.stringify(data);
    return http({
      method,
      url,
      data
    });
  }
}

export default request;
