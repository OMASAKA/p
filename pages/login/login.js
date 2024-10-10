Page({
  data: {
    account: '',
    password: ''
  },

  onAccountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onLogin() {
    const { account, password } = this.data
    if (account && password) {
      // 这里应该添加实际的登录逻辑，比如调用后端 API
      // 现在我们只是模拟登录成功
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      // 登录成功后跳转到"我创建的"页面
      wx.switchTab({
        url: '/pages/created/created'
      })
    } else {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none',
        duration: 2000
      })
    }
  }
})