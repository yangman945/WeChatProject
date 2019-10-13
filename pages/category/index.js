import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    // 左侧分类参数列表
    cateLeftList: [],
    // 右侧分类参数内容
    cateRightList: [],
    current: 0,
    scrolltop: 0
  },
  // 分类总数据
  cats: [],
  onLoad() {
    // 缓存优化 利用本地存储将获取的数据存储起来
    // 判断本地有无数据
    // 1、如果没有数据重新发送请求数据
    // 2、如果有数据的话判断数据是否过期 不过期的话用该数据 过期就重新发送请求
    const cacheCats = wx.getStorageSync("cacheCats");
    if (!cacheCats) {
      this.getCateList();
    } else {
      if (Date.now() - cacheCats.time > 10000) {
        this.getCateList();
      } else {
        this.cats = cacheCats.data;
        // 左侧参数
        const cateLeftList = this.cats.map(value => ({
          cat_id: value.cat_id,
          cat_name: value.cat_name
        }));
        // 右侧内容
        let cateRightList = this.cats[0].children;
        this.setData({
          cateLeftList,
          cateRightList
        });
      }
    }
  },
  // 获取分类参数列表
 async getCateList() {
    const result = await request({url: "/categories" })
    this.cats = result.data.message;
      // 将数据缓存至本地
      wx.setStorageSync("cacheCats", { time: Date.now(), data: this.cats });
      // 左侧参数
      const cateLeftList = this.cats.map(value => ({
        cat_id: value.cat_id,
        cat_name: value.cat_name
      }));
      // 右侧内容
      let cateRightList = this.cats[0].children;
      this.setData({
        cateLeftList,
        cateRightList
      });
    // .then(result => {
    //   console.log(result)
    //   this.cats = result.data.message;
    //   // 将数据缓存至本地
    //   wx.setStorageSync("cacheCats", { time: Date.now(), data: this.cats });
    //   // 左侧参数
    //   const cateLeftList = this.cats.map(value => ({
    //     cat_id: value.cat_id,
    //     cat_name: value.cat_name
    //   }));
    //   // 右侧内容
    //   let cateRightList = this.cats[0].children;
    //   this.setData({
    //     cateLeftList,
    //     cateRightList
    //   });
    // });
  },
  // 获取点击的索引 触发对应的数据进行动态渲染
  handleChange(e) {
    console.log(e);
    const { index } = e.currentTarget.dataset;
    const cateRightList = this.cats.data.message[index].children;
    this.setData({
      cateRightList,
      current: index,
      scrolltop: 0
    });
  }
});
