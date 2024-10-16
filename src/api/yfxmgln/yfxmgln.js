import request from '@/utils/request'

// 新建研发项目
export const addprojectOverview = (data) => {
  return request({
    url: '/api/extend/projectOverview',
    method: 'post',
    data
  })
}
//获取研发项目详情
export const fileArchivesadd = (id) => {
  return request({
    url: `/api/extend/projectOverview/${id}`,
    method: 'get',
  })
}
//获取研发项目
export const getProjectOverviewInfo = (data) => {
  return request({
    url: '/api/extend/projectOverview/getProjectOverviewInfo',
    method: 'post',
    data
  })
}
// 保存项目基础信息
export const aaddbasicInfo = (data) => {
  return request({
    url: '/api/extend/basicInfo',
    method: 'post',
    data
  })
}

// 项目基础信息详情
export const basicInfodetail = (id) => {
  return request({
    url: `/api/extend/basicInfo/${id}`,
    method: 'get'
  })
}
// 保存立项信息
export const aadinitInfo = (data) => {
  return request({
    url: '/api/extend/initInfo',
    method: 'post',
    data
  })
}
// 立项项目基础信息详情
export const initInfodetail = (id) => {
  return request({
    url: `/api/extend/initInfo/${id}`,
    method: 'get'
  })
}

// 保存检索记录信息
export const aadprepareSearch = (data) => {
  return request({
    url: '/api/extend/prepareSearch',
    method: 'post',
    data
  })
}
// 检索记录信息详情
export const prepareSearchdetail = (id) => {
  return request({
    url: `/api/extend/prepareSearch/${id}`,
    method: 'get'
  })
}
// 检索记录信息删除
export const prepareSearchdelete = (id) => {
  return request({
    url: `/api/extend/prepareSearch/delete?ids=${id}`,
    method: 'get'
  })
}
// 保存检索记录信息
export const getPrepareSearchInfo = (data) => {
  return request({
    url: '/api/extend/prepareSearch/getPrepareSearchInfo',
    method: 'post',
    data
  })
}
// 保存论证记录信息
export const aadprepareArgument = (data) => {
  return request({
    url: '/api/extend/prepareArgument',
    method: 'post',
    data
  })
}
// 论证记录信息详情
export const prepareArgumentdetail = (id) => {
  return request({
    url: `/api/extend/prepareArgument/${id}`,
    method: 'get'
  })
}
// 论证记录信息删除
export const prepareArgumentdelete = (id) => {
  return request({
    url: `/api/extend/prepareArgument/delete?ids=${id}`,
    method: 'get'
  })
}
// 获取论证记录信息
export const getPrepareArgumentInfo = (data) => {
  return request({
    url: '/api/extend/prepareArgument/getPrepareArgumentInfo',
    method: 'post',
    data
  })
}

// 保存调研记录信息
export const aadprepareSurvey = (data) => {
  return request({
    url: '/api/extend/prepareSurvey',
    method: 'post',
    data
  })
}
// 调研记录信息详情
export const prepareSurveydetail = (id) => {
  return request({
    url: `/api/extend/prepareSurvey/${id}`,
    method: 'get'
  })
}
// 调研记录信息删除
export const prepareSurveydelete = (id) => {
  return request({
    url: `/api/extend/prepareSurvey/delete?ids=${id}`,
    method: 'get'
  })
}
// 保存调研记录信息
export const getPrepareSurveyInfo = (data) => {
  return request({
    url: '/api/extend/prepareSurvey/getPrepareSurveyInfo',
    method: 'post',
    data
  })
}

// 保存项目成员信息
export const aadprojectMember = (data) => {
  return request({
    url: '/api/extend/projectMember',
    method: 'post',
    data
  })
}
// 项目成员信息详情
export const projectMemberdetail = (id) => {
  return request({
    url: `/api/extend/projectMember/${id}`,
    method: 'get'
  })
}
// 项目成员信息删除
export const projectMemberdelete = (id) => {
  return request({
    url: `/api/extend/projectMember/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询项目成员信息
export const getProjectMemberInfo = (data) => {
  return request({
    url: '/api/extend/projectMember/getProjectMemberInfo',
    method: 'post',
    data
  })
}

// 保存项目设备信息
export const aadprojectEquipment = (data) => {
  return request({
    url: '/api/extend/projectEquipment',
    method: 'post',
    data
  })
}
// 项目设备信息详情
export const projectEquipmentdetail = (id) => {
  return request({
    url: `/api/extend/projectEquipment/${id}`,
    method: 'get'
  })
}
// 项目设备信息删除
export const projectEquipmentdelete = (id) => {
  return request({
    url: `/api/extend/projectEquipment/delete?ids=${id}`,
    method: 'get'
  })
}
// 保存项目设备信息
export const getProjectEquipmentInfo = (data) => {
  return request({
    url: '/api/extend/projectEquipment/getProjectEquipmentInfo',
    method: 'post',
    data
  })
}

// 保存项目无形资产信息
export const aadvirtualAsset = (data) => {
  return request({
    url: '/api/extend/virtualAsset',
    method: 'post',
    data
  })
}
// 项目无形资产信息详情
export const virtualAssetdetail = (id) => {
  return request({
    url: `/api/extend/virtualAsset/${id}`,
    method: 'get'
  })
}
// 项目无形资产信息删除
export const virtualAssetdelete = (id) => {
  return request({
    url: `/api/extend/virtualAsset/delete?ids=${id}`,
    method: 'get'
  })
}
// 获取项目无形资产信息
export const getVirtualAssetInfo = (data) => {
  return request({
    url: '/api/extend/virtualAsset/getVirtualAssetInfo',
    method: 'post',
    data
  })
}
// 保存项目建筑信息
export const aadprojectBuilding = (data) => {
  return request({
    url: '/api/extend/projectBuilding',
    method: 'post',
    data
  })
}
// 项目建筑信息详情
export const projectBuildingdetail = (id) => {
  return request({
    url: `/api/extend/projectBuilding/${id}`,
    method: 'get'
  })
}
// 项目建筑信息删除
export const projectBuildingdelete = (id) => {
  return request({
    url: `/api/extend/projectBuilding/delete?ids=${id}`,
    method: 'get'
  })
}
// 保存项目建筑信息
export const getProjectBuildingInfo = (data) => {
  return request({
    url: '/api/extend/projectBuilding/getProjectBuildingInfo',
    method: 'post',
    data
  })
}

// 保存人员工时信息
export const aadprojectMemberHour = (data) => {
  return request({
    url: '/api/extend/projectMemberHour',
    method: 'post',
    data
  })
}
// 项目人员工时详情
export const projectMemberHourdetail = (id) => {
  return request({
    url: `/api/extend/projectMemberHour/${id}`,
    method: 'get'
  })
}
// 项目人员工时删除
export const projectMemberHourdelete = (id) => {
  return request({
    url: `/api/extend/projectMemberHour/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询人员工时信息
export const getProjectMemberHourInfo = (data) => {
  return request({
    url: '/api/extend/projectMemberHour/getProjectMemberHourInfo',
    method: 'post',
    data
  })
}

// 保存成果管理信息
export const aadprojectAchievementManage = (data) => {
  return request({
    url: '/api/extend/projectAchievementManage',
    method: 'post',
    data
  })
}
// 项目成果管理详情
export const projectAchievementManagedetail = (id) => {
  return request({
    url: `/api/extend/projectAchievementManage/${id}`,
    method: 'get'
  })
}
// 项目成果管理删除
export const projectAchievementManagedelete = (id) => {
  return request({
    url: `/api/extend/projectAchievementManage/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询成果管理信息
export const getProjectAchievementManageInfo = (data) => {
  return request({
    url: '/api/extend/projectAchievementManage/getProjectAchievementManageInfo',
    method: 'post',
    data
  })
}

// 保存消耗动力信息
export const aadprojectCostPower = (data) => {
  return request({
    url: '/api/extend/projectCostPower',
    method: 'post',
    data
  })
}
// 项目消耗动力详情
export const projectCostPowerdetail = (id) => {
  return request({
    url: `/api/extend/projectCostPower/${id}`,
    method: 'get'
  })
}
// 项目消耗动力删除
export const projectCostPowerdelete = (id) => {
  return request({
    url: `/api/extend/projectCostPower/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询消耗动力信息
export const getProjectCostPowerInfo = (data) => {
  return request({
    url: '/api/extend/projectCostPower/getProjectCostPowerInfo',
    method: 'post',
    data
  })
}

// 保存消耗材料信息
export const aadprojectCostMaterial = (data) => {
  return request({
    url: '/api/extend/projectCostMaterial',
    method: 'post',
    data
  })
}
// 项目消耗材料详情
export const projectCostMaterialdetail = (id) => {
  return request({
    url: `/api/extend/projectCostMaterial/${id}`,
    method: 'get'
  })
}
// 项目消耗材料删除
export const projectCostMaterialrdelete = (id) => {
  return request({
    url: `/api/extend/projectCostMaterial/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询消耗材料信息
export const getProjectCostMaterialInfo = (data) => {
  return request({
    url: '/api/extend/projectCostMaterial/getProjectCostMaterialInfo',
    method: 'post',
    data
  })
}
// 保存消耗燃料信息
export const aadprojectCostFuel = (data) => {
  return request({
    url: '/api/extend/projectCostFuel',
    method: 'post',
    data
  })
}
// 项目消耗燃料详情
export const projectCostFueldetail = (id) => {
  return request({
    url: `/api/extend/projectCostFuel/${id}`,
    method: 'get'
  })
}
// 项目消耗燃料删除
export const projectCostFueldelete = (id) => {
  return request({
    url: `/api/extend/projectCostFuel/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询消耗燃料信息
export const getProjectCostFuelInfo = (data) => {
  return request({
    url: '/api/extend/projectCostFuel/getProjectCostFuelInfo',
    method: 'post',
    data
  })
}
// 保存结题验收信息
export const aadprojectFinalAcceptance = (data) => {
  return request({
    url: '/api/extend/projectFinalAcceptance',
    method: 'post',
    data
  })
}
// 项目结题验收详情
export const projectFinalAcceptancedetail = (id) => {
  return request({
    url: `/api/extend/projectFinalAcceptance/${id}`,
    method: 'get'
  })
}
// 项目结题验收删除
export const projectFinalAcceptancedelete = (id) => {
  return request({
    url: `/api/extend/projectFinalAcceptance/delete?ids=${id}`,
    method: 'get'
  })
}
// 查询结题验收信息
export const getProjectFinalAcceptanceInfo = (data) => {
  return request({
    url: '/api/extend/projectFinalAcceptance/getProjectFinalAcceptanceInfo',
    method: 'post',
    data
  })
}

// // 保存备查文件信息
// export const aadreferenceDocumentInfo = (data) => {
//   return request({
//     url: '/api/extend/referenceDocumentInfo',
//     method: 'post',
//     data
//   })
// }
// // 项目备查文件详情
// export const referenceDocumentInfodetail = (id) => {
//   return request({
//     url: `/api/extend/referenceDocumentInfo/${id}`,
//     method: 'get'
//   })
// }

// //查询备查文件列表
export const getReferenceDocumentInfo = (data) => {
  return request({
    url: '/api/extend/referenceDocumentInfo/getReferenceDocumentInfo',
    method: 'post',
    data
  })
}