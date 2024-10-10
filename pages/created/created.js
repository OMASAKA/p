Page({
  data: {
    activities: [
      { id: 1, name: "活动1", participants: 10 },
      { id: 2, name: "活动2", participants: 20 },
      { id: 3, name: "活动3", participants: 15 }
    ]
  },

  onSearchInput(e) {
    // 实现搜索功能
    console.log("搜索:", e.detail.value);
  },

  onActivityTap(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${activityId}`
    });
  },

  onCreateActivity() {
    wx.navigateTo({
      url: '/pages/createActivity/createActivity'
    });
  }
});