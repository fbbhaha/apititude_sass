import request from '@/utils/request'
// 政策
export function noticeList(data) {
  return request({
    url: `/api/message/Notice?currentPage=1&&pageSize=4`,
    method: 'GET',
    params:data
  })
} 