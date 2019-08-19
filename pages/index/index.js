Page({
  /**
   * 页面的初始数据
   */
  data: {
    //gn、gj、cj、yl、js、ty和other
    //,"国际", "财经", "娱乐", "军事", "体育", "其他"
    titleBarText: [{ text: "国内", id: "gn" }, { text: "国际", id: "gj" },
      { text: "财经", id: "cj" }, { text: "娱乐", id: "yl" },
      { text: "军事", id: "js" }, { text: "体育", id: "ty" },
      { text: "其他", id: "other" }],
    newsResult:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getResult("gn",this)
    // 定义函数
    
  },
  getResult(param,weixin){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', //仅为示例，并非真实的接口地址
      data: {
        type: param
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        var util = require('../../utils/util.js')
        res.data.result.forEach((item, index) => {
          item.source = item.source.split('/')[0]
          item.date = util.formatTime2(new Date(item.date))
        })
        weixin.setData({
          newsResult: res.data.result
        })
      }
    })
  },
  tapMessage(event) {
    console.log(event)
    this.getResult(event.target.id, this)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})