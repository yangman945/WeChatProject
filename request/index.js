// 基准路径
let ajaxNum = 0
const baseUrl = 'https://api.zbztb.cn/api/public/v1'
export const request = (params) => {
    ajaxNum++
    wx.showLoading({ title:'数据加载中' });
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxNum--
                if(ajaxNum === 0){
                    wx.hideLoading();
                }
            }
        });  
    })
}