
Component({
  properties: {
    // 接收的父组件数据
    tabsData:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleID(e){
      const { id } = e.currentTarget.dataset
      this.triggerEvent('getid',{id})
    }
  }
})
