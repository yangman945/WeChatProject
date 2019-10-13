import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    // 定义传递给子组件tabs的数据
    tabsItems: [
      { id: 0, title: "综合", active: true },
      { id: 1, title: "销量", active: false },
      { id: 2, title: "价格", active: false }
    ],
    // 商品列表
    goodsList: []
  },

  // 定义获取商品列表需要的参数
  goodsPamase: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总条数
  total: 1,

  onLoad(options) {
    // 获取商品分类的id
    this.goodsPamase.cid = options.cat_id;
    this.getGoodsList();
  },
  // 获取商品参数列表
  async getGoodsList() {
    const result = await request({
      url: "/goods/search",
      data: this.goodsPamase
    });
    wx.stopPullDownRefresh();
    this.total = result.data.message.total;
    const { goods } = result.data.message;
    this.setData({
      goodsList: [...this.data.goodsList, ...goods]
    });
    // .then(result=>{
    //   wx.stopPullDownRefresh()
    //   this.total = result.data.message.total
    //   const {goods} = result.data.message
    //   this.setData({
    //     goodsList:[...this.data.goodsList,...goods]
    //   })
    // })
  },
  // 获取子组件传递的数据
  handlegetId(e) {
    const { id } = e.detail;
    // 通过传递的数据对 定义传递给子组件tabs的数据进行修改
    const { tabsItems } = this.data;
    tabsItems.forEach(v => {
      v.id === id ? (v.active = true) : (v.active = false);
    });
    this.setData({
      tabsItems
    });
  },
  // 页面上划触底事件
  onReachBottom() {
    // 根据返回的数据计算可展示多少页
    const totalPage = Math.ceil(this.total / this.goodsPamase.pagesize);

    if (totalPage > this.goodsPamase.pagenum) {
      this.goodsPamase.pagenum++;
      this.getGoodsList();
    } else {
      wx.showToast({
        title: "没有数据了",
        icon: "none"
      });
    }
  },
  // 页面下拉刷新事件
  onPullDownRefresh() {
    // 页面重置为1
    this.goodsPamase.pagenum = 1;
    // data数据重置
    this.setData({
      goodsList: []
    });
    // 重新发送请求 请求是异步代码 所有在请求中通过wx.stopPullDownRefresh()将 loading停止
    this.getGoodsList();
  }
});
