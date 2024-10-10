Page({
  data: {
    activities: []
  },

  onLoad() {
    this.fetchParticipatedActivities();
  },

  fetchParticipatedActivities() {
    // 这里应该从后端 API 获取参与的活动列表
    const mockActivities = [
      { id: 1, name: '2024软件工程K班', participants: 104 }
    ];
    this.setData({ activities: mockActivities });
  },

  goToParticipatedDetail(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/participatedDetail/participatedDetail?id=${activityId}` });
  }
});