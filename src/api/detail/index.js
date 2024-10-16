import request from '@/utils/request'
// 获取项目明细账管理list
export function getList(data) { 
  return request({
    url: `/api/extend/projectDetail/getList`,
    method: 'post',
    data:data
  })
} 
// 调整金额接口 
export function updateMoney(data) { 
    return request({
      url: `/api/extend/projectDetail/${data.id}`,
      method: 'put',
      data:data
    })
  } 
  // 批量删除接口
export function batchRemove(ids) { 
    return request({
      url: `/api/extend/projectDetail/batchRemove/${ids} `,
      method: 'DELETE' 
    })
  } 
  // 删除接口
export function deleteDetail(id) { 
    return request({
      url: `/api/extend/projectDetail/${id}`,
      method: 'DELETE' 
    })
  } 
    // 模板下载
export function templateDownload() { 
    return request({
      url: `/api/extend/projectDetail/templateDownload`,
      method: 'get' ,
      responseType: 'blob',
    })
  } 
// 导出
export function ActionsExport() { 
    return request({
      url: `/api/extend/projectDetail/Actions/Export`,
      method: 'get' ,
      responseType: 'blob',
    })
} 
// 获取项目明细账管理list
export function Export(data) { 
    return request({
      url: `/api/extend/projectDetail/Actions/Export`,
      method: 'GET',
      params:data
    })
  } 
  // 科目匹配左边的数值 
export function getProdetailList() { 
    return request({
      url: `/api/system/DictionaryData/getProdetailList/?id=341549172962361797`,
      method: 'GET' 
    })
  } 
// 科目匹配保存
export function ItemDetail(data) { 
    return request({
      url: `/api/extend/ItemDetail`,
      method: 'post',
      data:data 
    })
  } 
// 科目匹配保存
export function getItemList(data) { 
    return request({
      url: `/api/extend/ItemDetail/getItemList?proyear=${data.proyear}&&createby=${data.createby}`,
      method: 'get'
    })
  } 
// 科目匹配保存
export function getProAccount(data) { 
    return request({
      url: `/api/extend/prjectAccount/getProAccount?createby=${data.createby}`,
      method: 'get'
    })
} 