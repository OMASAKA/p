Page({
  data: {
    cards: [
      { id: 1, name: "卡牌1", price: 100, image: "/assets/card1.png" },
      { id: 2, name: "卡牌2", price: 200, image: "/assets/card2.png" },
      { id: 3, name: "卡牌3", price: 300, image: "/assets/card3.png" },
      { id: 4, name: "卡牌4", price: 400, image: "/assets/card4.png" }
    ],
    userPoints: 1000 // 假设用户初始有1000积分
  },

  onBuy: function(e) {
    const cardId = e.currentTarget.dataset.id;
    const card = this.data.cards.find(c => c.id === cardId);
    if (this.data.userPoints >= card.price) {
      this.setData({
        userPoints: this.data.userPoints - card.price
      });
      wx.showToast({
        title: '购买成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '积分不足',
        icon: 'none'
      });
    }
  },

  onGuess: function() {
    wx.showModal({
      title: '猜题',
      content: '1 + 1 = ?',
      editable: true,
      placeholderText: '请输入答案',
      confirmText: '提交',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const answer = res.content;
          if (answer === '2') {
            this.setData({
              userPoints: this.data.userPoints + 1
            });
            wx.showToast({
              title: '答对了，获得1积分',
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: '答错了，再接再厉',
              icon: 'none'
            });
          }
        }
      }
    });
  }
});