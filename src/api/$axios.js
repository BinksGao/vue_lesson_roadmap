import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "../router";

const config = {
    timeout: 60000,
    withCredentials: true // 访问线上api时axios发送跨域请求时需要设置这个参数
}

if (process.env.NODE_ENV === 'development') {
    // 开发环境
    config.baseURL = "http://api.5544xj.com/"; //这里是开发环境api请求地址
} else if (process.env.NODE_ENV === 'production') {
    // 生产环境
    config.baseURL = "http://www.baidu.com"; //这里是线上api请求地址
}

const $axios = axios.create(config);

$axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("accessToken")) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers["Access-Token"] = `${sessionStorage.getItem(
        "accessToken"
      )}`;
        }
        return config;
    },
    err => {
        Message.error({ message: "请求超时!" });
        return Promise.resolve(err);
    }
);

$axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code == 200) {
                return Promise.resolve(response);
            } else if (response.data.code == 403) {
                Message.error({ message: "拒绝访问，请重新登录" });
                sessionStorage.clear()
                setTimeout(() => {
                    router.push({
                        path: '/login'
                    });
                }, 1000);
            } else if (response.data.code == 400) {
                Message.error({ message: "请求错误，请重试" });
                sessionStorage.clear()
            } else if (response.data.code == 401) {
                Message.error({ message: "未授权，请重新登录" });
                sessionStorage.clear()
                setTimeout(() => {
                    router.push({
                        path: "/login"
                    });
                }, 1000);
            } else if (response.data.code == 404) {
                Message.error({ message: "请求出错" });
                sessionStorage.clear()
            } else if (response.data.code == 500) {
                Message.error({ message: "服务错误，请稍后" });
                sessionStorage.clear()
            } else if (response.data.code == 504) {
                Message.error({ message: "网络超时" });
                sessionStorage.clear()
            } else if (response.data.code == 503) {
                Message.error({ message: "服务不可用" });
                sessionStorage.clear()
            } else if (response.data.code == 502) {
                Message.error({ message: "网络错误" });
                sessionStorage.clear()
            }
            return Promise.resolve(response);
        } else {
            return Promise.resolve(response);
        }
    }
);
export default $axios;