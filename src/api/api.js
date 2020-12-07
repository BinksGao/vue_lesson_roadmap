import $axios from './$axios'

// 获取整个图形验证码
export function getAuth() {
    return $axios.get('/v1/captcha/generate')
}
// 用户注册
export function signUp(data) {
    return $axios.post('/v1/user/signUp', data)
}
// 用户登录
export function loginIn(data) {
    return $axios.post('/v1/user/signIn', data)
}
// 获取所有的列表
export function getPic(data) {
    let url = `/v1/hooker/list?page=${data.page}&pageSize=${data.pageSize}`
    if (data.city) {
        url += `&city=${data.city}`
    }
    return $axios.get(url, data)
}

// 修改用户昵称
export function modifyName(data) {
    return $axios.post('/v1/user/setNickName', data)
}
//  提交信息
export function publishInfo(data) {
    return $axios.post('/v1/hooker/add', data)
}
//  获取历史发布信息
export function historyHookers(data) {
    return $axios.get(`/v1/hooker/historyList?page=${data.page}&pageSize=${data.pageSize}`, data)
}
// 删除历史发布消息
export function delHookers(data) {
    return $axios.post('/v1/hooker/delete', data)
}
// 编辑历史发布消息
export function editHookers(data) {
    return $axios.post('/v1/hooker/update', data)
}
// 非会员查看联系方式
export function checkConcat(data) {
    return $axios.get(`/v1/hooker/contact?hookerId=${data.hookerId}`)
}
// 上传图片
export function uploadImage(data) {
    return $axios.post('/v1/upload/image', data)
}
// 获取支付渠道
export function paymentList() {
    return $axios.get(`/v1/payment/list`)
}
// 获取商品
export function productList() {
    return $axios.get('/v1/product/list')
}
// 创建订单
export function createPay(data) {
    return $axios.post('/v1/order/create', data)
}
// 获取历史订单
export function orderList(data) {
    return $axios.get(`/v1/order/list?page=${data.page}&pageSize=${data.pageSize}`, data)
}

// 获取banner
export function getBanner() {
    return $axios.get('/v1/ad/banner/list')
}