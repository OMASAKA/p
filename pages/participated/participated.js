Page({
  data: {
    activities: [
      { id: 1, name: "2024软件工程K班", participants: 104 }
      // 可以添加更多活动
    ],
    filteredActivities: []
  },

  onLoad: function() {
    this.setData({
      filteredActivities: this.data.activities.slice(1) // 除了第一个活动外的所有活动
    });
  },

  onSearchInput(e) {
    const searchText = e.detail.value.toLowerCase();
    const filtered = this.data.activities.filter(activity => 
      activity.name.toLowerCase().includes(searchText)
    );
    this.setData({
      filteredActivities: filtered
    });
  },

  onActivitySummaryTap() {
    wx.navigateTo({
      url: '/pages/participatedDetail/participatedDetail?id=1',
      fail: (err) => {
        console.error('Navigation failed:', err);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  },

  onActivityTap(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/participatedDetail/participatedDetail?id=${activityId}`,
      fail: (err) => {
        console.error('Navigation failed:', err);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  }
});