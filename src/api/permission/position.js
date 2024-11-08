import request from '@/utils/request'

// 获取岗位列表（分页）
export const getPositionList = (data) => {
  return request({
    url: '/api/permission/Position',
    method: 'GET',
    data
  })
}

// 获取岗位下拉列表（公司+部门+岗位）
export const getPositionSelector = () => {
  return request({
    url: '/api/permission/Position/Selector',
    method: 'GET'
  })
}

// 新建岗位
export const createPosition = (data) => {
  return request({
    url: '/api/permission/Position',
    method: 'POST',
    data
  })
}

// 修改岗位
export const updatePosition = (data) => {
  return request({
    url: `/api/permission/Position/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取岗位信息
export const getPositionInfo = (id) => {
  return request({
    url: `/api/permission/Position/${id}`,
    method: 'GET'
  })
}

// 删除岗位
export const delPosition = (id) => {
  return request({
    url: `/api/permission/Position/${id}`,
    method: 'DELETE'
  })
}

// 更新岗位状态
export const updatePositionState = (id) => {
  return request({
    url: `/api/permission/Position/${id}/Actions/State`,
    method: 'PUT'
  })
}

// 获取全部岗位管理信息列表
export const getPositionListAll = () => {
  return request({
    url: '/api/permission/Position/All',
    method: 'GET'
  })
}

// 通过组织id获取岗位列表
export const getPositionByOrganize = (organizeIds) => {
  return request({
    url: `/api/permission/Position/getListByOrgIds`,
    method: 'post',
    data: { organizeIds }
  })
}