// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "title": "外媒称香港回归15年打破“经济将死”预言",
    "date": "2012-07-01T09:34:12.000Z",
    "source": "中国新闻网",
    "firstImage": "//img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg",
    "content": [
      {
        "type": "p",
        "text": "报道特别强调金融合作方面，中央支持第三方利用香港办理人民币贸易投资结算，进一步丰富香港人民币离岸产品”。自1997年7月1日回归之后，香港与内地的经济关系日益紧密，“北京方面迫切希望利用这个全球金融中心来进行重大改革试验，比如将人民币国际化的努力。”"
      },
      {
        "type": "p",
        "text": "一些香港居民在接受美国CNN采访时表达了对香港特区以及新任特首的看法。多数香港居民认为，回归以来，“一国两制”实行得不错，相信“一国两制”将进展良好，相信香港的前途会更光明。希望新任特首上台后，能进一步改善包括住房在内的民生条件。"
      }
    ],
    "readCount": 471
  },
  onLoad: function (options) {
    this.getResult(options.id,this)
  },
  getResult(param, weixin) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail', 
      data: {
        id: param
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        var util = require('../../utils/util.js')
        let item = res.data.result;
        if (item.source) {
          item.source = item.source.split('/')[0]
        } else {
          item.source = ""
        }
        item.date = util.formatTime2(new Date(item.date))
        if (!item.firstImage) {
          item.firstImage = "/images/snow-bg.png"
        }
        weixin.setData({
          "title": item.title,
          "date": item.date,
          "source": item.source,
          "firstImage": item.firstImage,
          "content": item.content,
          "readCount": item.readCount
        })
      }
    })
  },
  getDefaultImage(event) {
    console.info(event)
    if (event.type == "error") {
      let result = this.data.firstImage
      result = "/images/snow-bg.png"
      this.setData({
        firstImage: result
      })
    }
  }
})