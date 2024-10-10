Page({
  data: {
    activities: []
  },

  onLoad() {
    this.fetchActivities();
  },

  fetchActivities() {
    // 这里应该从后端 API 获取活动列表
    const mockActivities = [
      { id: 1, name: '软件工程课程', participants: 50 },
      { id: 2, name: '数据结构讨论', participants: 30 }
    ];
    this.setData({ activities: mockActivities });
  },

  onSearch(e) {
    const keyword = e.detail.value;
    // 实现搜索逻辑
  },

  goToCreateActivity() {
    wx.navigateTo({ url: '/pages/createActivity/createActivity' });
  },

  goToActivityDetail(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/activityDetail/activityDetail?id=${activityId}` });
  }
});