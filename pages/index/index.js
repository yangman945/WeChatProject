
import {request} from '../../request/index.js'
Page({
  data:{
    // 轮播图数组
    swiperList:[],
    // 分类导航栏
    cateList:[],
    // 商品楼层图
    goodsList:[]
  },
  // 页面加载触发
  onLoad(){
    this.getSwiperList()
    this.getCateList()
    this.getGoodsList()
  },
  // 获取轮播图
  getSwiperList(){
    request({url:'/home/swiperdata'}).then(result=>{
      this.setData({
        swiperList : result.data.message
      })
    })
  },
  // 获取分类导航
  getCateList(){
    request({url:'/home/catitems'}).then(result=>{
      this.setData({
        cateList : result.data.message
      })
    })
  },
  // 获取商品楼层
  getGoodsList(){
    request({url:'/home/floordata'}).then(result=>{
      this.setData({
        goodsList : result.data.message
      })
    })
  }
})