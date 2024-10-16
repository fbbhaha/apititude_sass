import request from '@/utils/request'
// 获取企业信息
export function getinfoList(data) {
  return request({
    url: '/api/extend/company/List',
    method: 'GET',
    params:data
  })
}
// 保存企业信息
export function saveinfoList(data) {
  return request({
    url: '/api/extend/company/save',
    method: 'POST',
    data:data
  })
}
// 
export function yearrepord(data) {
  return request({
    url: `/api/extend/Subject/getList?yearrepord=${data}`,
    method: 'get',
  })
}
export function Subject(data) {
  return request({
    url: `/api/extend/Subject`,
    method: 'put',
    data:data
  })
}