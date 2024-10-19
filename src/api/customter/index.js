import request from '@/utils/request'


// 获取客户列表
export const getCustomerList = (params) => {
    return request({
        url: `/api/extend/saleOrder/Customer`,
        method: 'get',
        params
    })
}
// 新增
export const addCustomer = (params) => {
    return request({
        url: `/api/extend/saleOrder/Customer`,
        method: 'post',
        params
    })
}
// 删除
export const deleteCustomerById = (id) => {
    return request({
        url: `/api/extend/saleOrder/Customer/${id}`,
        method: 'delete',
    })
}
// 修改
export const updateCustomerDetail = (params) => {
    return request({
        url: `/api/extend/saleOrder/Customer`,
        method: 'put',
        params
    })
}
// 详情
export const getCustomerDetail = (id) => {
    return request({
        url: `/api/extend/saleOrder/Customer/${id}`,
        method: 'get',
    })
}