const app = getApp()

Page({
  data: {
    activity: null,
    luckyStudent: null,
    isLoading: false,
    studentId: null,
    showAnswerModal: false
  },

  onLoad: function(options) {
    const activityId = options.id;
    // 这里应该根据 activityId 从服务器或本地存储加载活动详情
    // 现在我们只是模拟一下
    this.setData({
      activity: { id: activityId, name: "2024软件工程K班", participants: 104 }
    });
    // 这里应该从全局状态或本地存储获取当前用户的 student_id
    this.setData({
      studentId: app.globalData.studentId || '12345' // 假设的学生ID
    });
  },

  onSignIn: function() {
    wx.request({
      url: 'http://10.133.7.205:3000/update_attendance_score',
      method: 'POST',
      data: {
        student_id: this.data.studentId
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '签到成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '签到失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('API request failed:', err);
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },

  onDrawLuckyStudent: function() {
    if (this.data.isLoading) return; // 防止重复点击

    this.setData({ isLoading: true });

    this.drawLuckyStudentWithRetry(3); // 最多重试3次
  },

  drawLuckyStudentWithRetry: function(retryCount) {
    wx.request({
      url: 'http://10.133.7.205:3000/get_random_student',
      method: 'GET',
      timeout: 15000, // 增加超时时间到15秒
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            luckyStudent: res.data.name,
            studentId: res.data.id,
            isLoading: false,
            showAnswerModal: true
          });
          wx.showToast({
            title: '已抽取幸运儿',
            icon: 'success'
          });
        } else {
          this.handleDrawError('服务器返回错误', retryCount);
        }
      },
      fail: (err) => {
        console.error('API request failed:', err);
        this.handleDrawError('网络请求失败', retryCount);
      }
    });
  },

  handleDrawError: function(errorMsg, retryCount) {
    if (retryCount > 0) {
      setTimeout(() => {
        this.drawLuckyStudentWithRetry(retryCount - 1);
      }, 1000); // 1秒后重试
    } else {
      this.setData({ isLoading: false });
      wx.showModal({
        title: '抽取失败',
        content: `${errorMsg}，请稍后再试。`,
        showCancel: false
      });
    }
  },

  onAnswerCorrect: function() {
    this.updateAnswerScore(true, 1);
  },

  onAnswerIncorrect: function() {
    this.updateAnswerScore(false, 0);
  },

  updateAnswerScore: function(repeatedCorrectly, answerScore) {
    wx.request({
      url: 'http://10.133.7.205:3000/update_answer_score',
      method: 'POST',
      data: {
        student_id: this.data.studentId,
        repeated_correctly: repeatedCorrectly,
        answer_score: answerScore
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '回答已记录',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '记录失败',
            icon: 'none'
          });
        }
        this.setData({ showAnswerModal: false });
      },
      fail: (err) => {
        console.error('API request failed:', err);
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
        this.setData({ showAnswerModal: false });
      }
    });
  }
});