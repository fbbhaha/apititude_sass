import request from '@/utils/request'

// 获取文件列表
export const getFileList = (data) => {
  return request({
    url: '/api/system/fileArchives/getList',
    method: 'post',
    data
  })
}
//文件新增接口
export const fileArchivesadd = (data) => {
  return request({
    url: '/api/system/fileArchives',
    method: 'post',
    data
  })
}
//文件修改接口
export const fileArchivesupdate = (data) => {
  return request({
    url: '/api/system/fileArchives/update',
    method: 'post',
    data
  })
}
// 文件详情接口
export const fileArchivesinfo = (id) => {
  return request({
    url: `/api/system/fileArchives/${id}`,
    method: 'get'
  })
}

// 文件删除接口
export const fileArchivesdelete = (id) => {
  return request({
    url: `/api/system/fileArchives/delete?ids=${id}`,
    method: 'get'
  })
}
// 获取考勤接口
export const getkqPage = (data) => {
  return request({
    url: '/api/extend/Atteattendance/getPage?companyId=1&currentPage='+data.currentPage+'&pageSize='+data.pageSize,
    method: 'get'
  })
}
//辅助帐明细
export const getAssistrecord = (yearrepord,proid) => {
  return request({
    url: `/api/extend/projectDetail/getAssistrecord?yearrepord=${yearrepord}&proid=${proid}`,
    method: 'get',
  })
}
//辅助帐汇总生成
export const getSumInfo = (yearrepord) => {
  return request({
    url: `/api/extend/projectAuxiliaryAccount/getSumInfo?projectYear=${yearrepord}`,
    method: 'get',
  })
}
//优惠明细表
export const CompanysubjectdetailedgetList = (yearrepord) => {
  return request({
    url: `/api/extend/Companysubjectdetailed/getList?yearrepord=${yearrepord}`,
    method: 'get',
  })
}
//计算费用优惠明细
export const getCountDetail = (yearrepord) => {
  return request({
    url: `/api/extend/projectDetail/getCountDetail?yearrepord=${yearrepord}`,
    method: 'get',
  })
}
//辅助帐汇总列表查询
export const getProjectAuxiliaryAccount = (data) => {
  return request({
    url: '/api/extend/projectAuxiliaryAccount/getProjectAuxiliaryAccount',
    method: 'post',
    data
  })
}
//项目总数量
export const getProjectOverviewAcount = (yearrepord) => {
  return request({
    url: `/api/extend/Companysubjectdetailed/getProjectOverviewAcount?yearrepord=${yearrepord}`,
    method: 'get',
  })
}
//可申报项目列表
export const getProjectInfo = () => {
  return request({
    url: `/api/extend/Companysubjectdetailed/getProjectInfo`,
    method: 'post',
  })
}