import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    // 商品详情信息列表
    goodsDetailList:{}
  },
  onLoad(options) {
    this.getGoodsDetail(options.goods_id);
  },
  // 全部商品数据
  goodsList:{},
  // 获取商品详情
  async getGoodsDetail(goods_id) {
    const result = await request({ url: "/goods/detail", data: { goods_id } });
    this.goodsList = result.data.message //全部的商品数据
    // 返回的数据太多 我们只提取我们需要在页面渲染使用的
    this.setData({
      goodsDetailList: {
        goods_name: result.data.message.goods_name,
        goods_price: result.data.message.goods_price,
        pics: result.data.message.pics,
        // 将所有.webp格式图片替换为.jpg
        goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    });
  },
  // 点击预览大图
  handleImagePreview(e){
    const {index} = e.currentTarget.dataset
    const urls = this.data.goodsDetailList.pics.map(v=>v.pics_big)
    const current = urls[index]
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //利用本地存储进行商品购物车的添加
  handleAddCart(){
    // 获取本地添加购物车的对象 在没添加时为空给其默认值
    const cart = wx.getStorageSync('cart') || {};
    if(cart[this.goodsList.goods_id]){
      // 当有商品时添加商品数量
      cart[this.goodsList.goods_id].num++
    }else{
      // 没有商品时将商品为购物车添加新商品 以商品id为属性 商品全部数据为值
      cart[this.goodsList.goods_id] = this.goodsList
      cart[this.goodsList.goods_id].num = 1
      cart[this.goodsList.goods_id].checked = true
    }
    wx.setStorageSync('cart',cart);
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
  }
});
