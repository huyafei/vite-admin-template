const setting = {
  /* 登录相关 */
  /**
   * 是否开启权限验证
   * @type {boolean} true | false
   */
  isPermission:true,
  /**
   * 权限方式
   * @type {string} 'roles' | 'code'
   */
  permissionMode: 'roles',
  /*page layout related*/
  /**
   * 侧边栏或导航栏显示的标题
   */
  title: 'Vue3 Admin Plus',
  /**
   * 是否在侧边栏显示 LOGO
   * @type {boolean} true | false
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Whether show Hamburger
   */
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showLeftMenu: true,
  /**
   * 是否显示 TagsView
   * @type {boolean} true | false
   */
  showTagsView: true,
  /**
   * TagsView 显示数量
   */
  tagsViewNum: 6,
  /**
   * 是否显示顶部导航栏
   * @type {boolean} true | false
   */
  showTopNavbar: true,
  /* page  animation related*/
  /**
   * @type {boolean} true | false
   * @description Whether need animation of main area
   */
  mainNeedAnimation: true,
  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,

  /*page login or other*/
  /*
   * table height(100vh-delWindowHeight)
   * */
  delWindowHeight: '210px',

  /*
   * 显示版本信息
   * */
  showVersionInfo: true,
  /*
   * i18n 默认语言
   * en/zh
   * */
  defaultLanguage: 'zh',
  /*
   * 设置 element-plus 全局默认大小
   * large / default /small
   * */
  defaultSize: 'small',
  /*
   * vite.config.js 中 base 参数配置
   * such as
   * */
  viteBasePath: '/'
}

export default setting
