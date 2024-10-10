Page({
  data: {
    fileName: ''
  },

  onUpload() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['xlsx'],
      success: (res) => {
        const file = res.tempFiles[0];
        this.setData({
          fileName: file.name
        });
        // 这里可以处理文件上传逻辑
        console.log('选择的文件:', file);
      }
    });
  },

  onSubmit(e) {
    const { activityName, activityDescription } = e.detail.value;
    if (activityName && activityDescription) {
      if (!this.data.fileName) {
        wx.showToast({
          title: '请上传 XLSX 文件',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      // 这里应该添加创建活动的逻辑，比如调用后端 API
      console.log('创建活动:', activityName, activityDescription, this.data.fileName);
      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration: 2000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      });
    }
  }
});