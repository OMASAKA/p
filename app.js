// app.js
App({
  onLaunch() {
    // 监听页面不存在的情况
    wx.onPageNotFound(function(res) {
      console.error('Page not found:', res);
      wx.redirectTo({
        url: 'pages/participated/participated'
      })
    })

    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }

    // 获取本地存储的积分
    const score = wx.getStorageSync('score')
    if (score) {
      this.globalData.score = score
    }
  },

  onShow(options) {
    // 小程序从后台进入前台时触发
    console.log('小程序显示', options)
  },

  onHide() {
    // 小程序从前台进入后台时触发
    console.log('小程序隐藏')
  },

  globalData: {
    userInfo: null,
    isLoggedIn: false,
    token: '',
    score: 0,
    activities: [],
    participatedActivities: []
  },

  // 全局方法
  setUserInfo(userInfo) {
    this.globalData.userInfo = userInfo
    this.globalData.isLoggedIn = true
    wx.setStorageSync('userInfo', userInfo)
  },

  clearUserInfo() {
    this.globalData.userInfo = null
    this.globalData.isLoggedIn = false
    this.globalData.token = ''
    wx.removeStorageSync('userInfo')
  },

  updateScore(delta) {
    this.globalData.score += delta
    wx.setStorageSync('score', this.globalData.score)
  },

  addActivity(activity) {
    this.globalData.activities.push(activity)
  },

  addParticipatedActivity(activity) {
    this.globalData.participatedActivities.push(activity)
  },

  // 模拟随机点名
  randomNameCall(activityId) {
    // 这里应该根据 activityId 获取对应活动的参与者列表
    // 为了演示，我们使用一个固定的名单
    const participants = ['张三', '李四', '王五', '赵六', '钱七']
    const randomIndex = Math.floor(Math.random() * participants.length)
    return participants[randomIndex]
  }
})
