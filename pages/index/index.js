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
    newsResult:[],
    isHide:"gn"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getResult("gn",this)
  }, getDefaultImage(event){
    console.info(event)
    if (event.type=="error"){
      let result = this.data.newsResult
      result[event.target.dataset.errorimg].firstImage = "/images/snow-bg.png"
      this.setData({
        newsResult: result
      })
    }
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
          if (item.source) {
            item.source = item.source.split('/')[0]
          } else {
            item.source = ""
          }
          
          item.date = util.formatTime2(new Date(item.date))
          if (!item.firstImage){
            item.firstImage =  "/images/snow-bg.png"
          }
        })
        weixin.setData({
          newsResult: res.data.result
        })
      },
      complete:()=>{
        wx.stopPullDownRefresh()
      }
    })
  },
  tapMessage(event) {
    this.setData({
      isHide: event.target.id
    })
    this.getResult(event.target.id, this)
  },

  //事件处理函数
  bindViewTap: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.id
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getResult(this.data.isHide, this)
  }
})