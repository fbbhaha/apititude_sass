import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import ccit from '@/utils/ccit'

const {
  showSettings,
  tagsView,
  tagsIcon,
  showLanguage,
  showSearch,
  showPortalToolbar,
  useCache,
  fixedHeader,
  sidebarLogo,
  themeClass,
  slideClass,
  layoutType,
  sysConfig
} = defaultSettings

const state = {
  theme: variables.theme,
  loginNeedCode: ccit.storageGet('loginNeedCode') === null ? false : ccit.storageGet('loginNeedCode'),
  showSettings: showSettings,
  tagsView: ccit.storageGet('tagsView') === null ? tagsView : ccit.storageGet('tagsView'),
  tagsIcon: ccit.storageGet('tagsIcon') === null ? tagsIcon : ccit.storageGet('tagsIcon'),
  showLanguage: ccit.storageGet('showLanguage') === null ? showLanguage : ccit.storageGet('showLanguage'),
  showSearch: ccit.storageGet('showSearch') === null ? showSearch : ccit.storageGet('showSearch'),
  showPortalToolbar: ccit.storageGet('showPortalToolbar') === null ? showPortalToolbar : ccit.storageGet('showPortalToolbar'),
  useCache: ccit.storageGet('useCache') === null ? useCache : ccit.storageGet('useCache'),
  fixedHeader: ccit.storageGet('fixedHeader') === null ? fixedHeader : ccit.storageGet('fixedHeader'),
  sidebarLogo: ccit.storageGet('sidebarLogo') === null ? sidebarLogo : ccit.storageGet('sidebarLogo'),
  themeClass: ccit.storageGet('themeClass') === null ? themeClass : ccit.storageGet('themeClass'),
  slideClass: ccit.storageGet('slideClass') === null ? slideClass : ccit.storageGet('slideClass'),
  layoutType: ccit.storageGet('layoutType') === null ? layoutType : ccit.storageGet('layoutType'),
  sysConfig: ccit.storageGet('sysConfig') === null ? sysConfig : ccit.storageGet('sysConfig')
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      ccit.storageSet({
        [key]: value
      })
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}