module.exports = {
  title: '服务运营一体化管理中心',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  sysConfig: {
    sysVersion: 'V3.6',
    copyright: 'Copyright @ 2024 信息技术有限公司版权所有',
    navigationIcon: '',
    logoIcon: '',
    loginIcon: '',
    sysName: '服务运营一体化管理中心'
  },
  themeClass: 'blue',
  layoutType: 'classic',
  slideClass: 'lightWhite',
  tagsIcon: false,
  showLanguage: true,
  showSearch: true,
  showPortalToolbar: '1',
  useCache: false,
  errorLog: 'production'
}
