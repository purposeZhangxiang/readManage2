import router from '../router/router';//根据自己定义的路由位置进行引入
import axios from 'axios';
import qs from 'qs';
import { baseUrl, imgUrl } from './env';
import { Loading, Message } from 'element-ui'





const login = (apiName, method, data) => {
    let config = {
        url: baseUrl + apiName,
        method: method,
        data: qs.stringify(data),
    }
    return new Promise((resolve, reject) => {
        axios(config)
            .then(res => {
                if (res.status == "200") {
                    if (res.data.code == 0) {
                        resolve(res.data.data)
                    } else {
                        Message.error(res.data.msg)

                    }
                }

            })
            .catch(err => {
                Message.error(err)
                reject(err)
            })
    })
}



const sendRequest = (apiName, method = "get", data = {}, responseType = "json", ) => {

    if (!apiName) {
        return;
    }
    //定义请求参数配置
    let config = {
        url: baseUrl + apiName,
        method: method,
        params: data || '',
        data: qs.stringify(data),
        headers: {
            // "Content-Type": "application/json;charset=UTF-8"
        },
        responseType: responseType
    }
    //token验证部分
    if (sessionStorage.getItem('token')) {
        config.headers.accessToken = sessionStorage.getItem('token')
    } else {
        //判断当前是否在登录页
        if (router.currentRoute.path == '/login') {
            console.log(`当前路由path:${router.currentRoute.path}`)
        } else {
            // 跳转登录页,在登录页成功回调里存取token
            Message.error('获取登录信息失败,请重新登录')
            router.push({ path: '/login' });
            return;
        }
    }
    //关于data的处理,如果后台按照序列化的标准接受就采用qs模块去处理post请求参数
    if (!data) {
        delete config.params;
        delete config.data;
    } else {
        if (method == 'get' || method == 'GET') {
            delete config.data
        } else if (method == 'post' || method == 'POST') {
            delete config.params
        }
    }
    return new Promise((resolve, reject) => {
        axios(config)
            .then(res => {
                if (res.status == 200) {
                    //可和后台协商一个code字段意为请求成功
                    if (res.data.code === 0) {
                        resolve(res.data.data)
                    } else if (res.data.code === 1 && res.data.msg == "请登陆！") {
                        router.push({ path: '/login' })
                    } else if (config.responseType == "blob") {
                        downloadExcel(res.data, res.data.type)
                    } else {
                        reject(res.data)
                        Message.error(res.data.msg)
                    }

                }
            })
            .catch(err => {
                //错误提示
                Message.error(err.message);
                reject(err)
            })

    })



    function downloadExcel(data, type) {
        if (!data) {
            return;
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        if (type == "application/csv") {
            link.setAttribute('download', `code_${data.size}.csv`)
        } else if (type == "application/sql") {
            link.setAttribute('download', 'database.sql');
        }
        document.body.appendChild(link);
        link.click();
    }
}

export {
    login,
    sendRequest as http
};