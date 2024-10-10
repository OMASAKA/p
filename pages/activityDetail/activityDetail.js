Page({
  data: {
    activity: null,
    selectedUser: null
  },

  onLoad(options) {
    const activityId = options.id;
    this.fetchActivityDetails(activityId);
  },

  fetchActivityDetails(id) {
    // 这里应该从后端 API 获取活动详情
    const mockActivity = { id: 1, name: '软件工程课程', participants: 50 };
    this.setData({ activity: mockActivity });
  },

  randomNameCall() {
    // 这里应该从后端 API 获取随机用户
    const randomUser = '张三';
    this.setData({ selectedUser: randomUser });
  },

  randomQuestion() {
    // 这里应该从后端 API 获取随机用户
    const randomUser = '李四';
    this.setData({ selectedUser: randomUser });
  },

  addScore() {
    // 这里应该调用后端 API 增加用户积分
    wx.showToast({ title: '积分已增加', icon: 'success' });
  },

  minusScore() {
    // 这里应该调用后端 API 减少用户积分
    wx.showToast({ title: '积分已减少', icon: 'success' });
  }
});