/**
 * @param {baseUrl} 数据请求全局接口
 * @param {imgUrl}  图片上传全局接口
*/

let baseUrl;
let imgUrl;

if (process.env.NODE_ENV === 'development') {
    //测试环境
    imgUrl = '';
    baseUrl='http://120.78.226.69:8087';
} else {
    //正式环境
    imgUrl = '';
    baseUrl = 'http://120.78.226.69:8087';
    // baseUrl="http://39.105.78.33:8087"
}

export {
    baseUrl,
    imgUrl,
}