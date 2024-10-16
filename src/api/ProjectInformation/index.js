import request from '@/utils/request'

// 项目信息表单领域接口（一级）
export function getList(data) {
  return request({
    url: '/api/system/DictionaryType/getList/?id=340746714132513093',
    method: 'get',
    data: data
  })
}
// 项目信息表单领域接口（二级）
export function getListTwo(data) {
  return request({
    url: `/api/system/DictionaryData/${data}`,
    method: 'get',
  })
}


export function saveproject(data) {
  return request({
    url: `/api/extend/project`,
    method: 'POST',
    data: data
  })
}


export function getproject(data) {
  return request({
    url: `/api/extend/project`,
    method: 'get',
    data: data
  })
}

export function getPyear(data) {
  return request({
    url: `/api/extend/Pyear`,
    method: 'post',
    data: data
  })
}


export function PyeargetList(data) {
  return request({
    url: `/api/extend/Pyear/getList`,
    method: 'get',
    data: data
  })
}


export function Pyeardel(data) {
  return request({
    url: `/api/extend/Pyear/${data}`,
    method: 'Delete',

  })
}