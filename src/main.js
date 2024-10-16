import Vue from 'vue'

const ccit = require('./utils/ccit').default

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import './assets/scss/common.scss'
import "@/assets/fonts/ym-mobile/iconfont.js"

import '@/styles/index.scss' // global css
import './assets/scss/theme.scss' // 主题
import "@/assets/scss/publicCss.scss"; // 自写全局css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './permission' // permission control
import './utils/error-log' // error log
import { message } from './utils/message';
import { fileDown } from "@/utils/dowmloadFil"
import * as filters from './filters' // global filters
// 自定义按钮权限指令
import permission from "@/directive/permission";
Vue.use(permission)
Vue.use(Element, {
  size: ccit.storageGet('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// vant 按需引用
import vant from './assets/vant-ui'
Vue.use(vant)
// 批量引入组件
import components from './components'
Vue.use(components)

// 添加实例属性
Object.assign(Vue.prototype, {
  define: require('./utils/define'), // 常量
  ccit, // 公共方法
  formValidate: require('./utils/formValidate').default, // 表单验证
  $message: message
})
Vue.prototype.fileDown = fileDown
// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
export default vm