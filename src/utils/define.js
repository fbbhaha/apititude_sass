// 开发环境接口配置
const APIURl = 'http://q5jn2v.natappfree.cc/'
module.exports = {
  APIURl: APIURl,
  APPURI: 'http://q5jn2v.natappfree.cc/',
  timeout: process.env.NODE_ENV === 'development' ? 1000000 : 1000000,
  WebSocketUrl: APIURl.replace('http', 'ws') + '/api/message/websocket',
  comUploadUrl: process.env.VUE_APP_BASE_API + '/api/file/Uploader',
  comUrl: "http://q5jn2v.natappfree.cc",
  // 大屏应用前端路径
  dataV: process.env.NODE_ENV === 'development' ? 'http://localhost:8100/DataV' : process.env.VUE_APP_BASE_API + '/DataV',
  // 数据报表
  reportServer: process.env.NODE_ENV === 'development' ? 'http://localhost:30007' : process.env.VUE_APP_BASE_API + '/DataReport',
  report: process.env.NODE_ENV === 'development' ? 'http://localhost:8200/html' : process.env.VUE_APP_BASE_API + '/Report',
  version: '3.6'
}
