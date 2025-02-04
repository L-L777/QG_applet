// components/titlebar/titlebar.js
const app = getApp()
let timer //防抖定时器
Component({
  /**
   * 组件的属性列表-定制高复用头部导航栏
   */
  properties: {
    //要接收数据的名称
    contentRoute: {
      // type 要接收的数据的类型
      type: String,
      // value 默认值（contentRoute默认值）
      value: 'other'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.systemInfo.statusBarHeight + 44, //导航栏高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoHub() {
      // return
      if (timer) {
        clearTimeout(timer)
      }
      timer = wx.redirectTo({
        url: '/packageB/pages/hub/hub',
      })
    },
    gotoB_viewQueue() {
      // return
      if (timer) {
        clearTimeout(timer)
      }
      timer = wx.redirectTo({
        url: '/packageA/pages/B_createInterview/B_createInterview',
      })
    },
    gotoIntroduction() {
      // return
      if (timer) {
        clearTimeout(timer)
      }
      timer = wx.redirectTo({
        url: '/packageB/pages/Introduction/Introduction',
      })
    }

  }
})