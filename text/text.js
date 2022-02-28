// packageG/pages/text/text.js
const util = require('../../../utils/util.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      dataUrl:'store/storeList',
      zishow: false,
      ziList: [],

   },
   totalPages:0,
   bindAgentDialog() {
      this.setData({
         zishow: true
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.datalist()
   },
   datalist(e) {
      if (e == 2) {
         if (this.data.currentPage >= this.totalPages) {
            wx.showToast({
               title: '已经到底啦',
               icon: 'none'
            })
            return
         } else {
            this.data.currentPage++
         }
      } else {
         this.data.currentPage = 1
      }
      if (e == 1) {
         this.setData({
            zifirstBool: true
         })
         wx.showLoading({
            title: "加载中"
         })
      }
      var params = {
         SearchInfo:this.data.serachInfo,
         currentPage: this.data.currentPage,
      }
      console.log(params);
      util.Htpapi.post('store/storeList',params).then(res => {
         console.log(res);
         if (res.data.stateCode == 100) {
            if (e !== 2) {
               this.setData({
                  ziList: []
               })
            }
            const total = res.data.data.total
            this.totalPages = Math.ceil(total / res.data.data.pageSize)
            var a = []
            var b = []
            for (var item of res.data.data.list) {
               for (var i in item) {
                  if (i == 'StoreName') {
                     b.push(item[i])
                  }
                  if (i == 'StoreID') {
                     a.push(item[i])
                  }
               }
            }
            let aa = [];
            for (let i in a) {
               let c = {};
               c.id = a[i];
               c.name = b[i];
               aa.push(c);
            }
            console.log(aa);
            // this.setData({
            //    ziList
            // })
            this.setData({
               ziList: this.data.ziList.concat(aa)
            })
            console.log(this.data.ziList);
         }
         wx.hideLoading
         this.setData({
            zifirstBool: false
         })
      })
   },
   bind_handle(e){
      console.log(e.detail);
      // console.log(this.selectComponent('.pulicSelect'));
   },

   component_refresh(e){
      // this.datalist(e)
      console.log(e);
      this.setData({
         comsDetail:e.detail
      })
      this.datalist(e.detail)
   },
   component_tolower(e){
      console.log(e);
      this.setData({
         comsDetail:e.detail
      })
      this.datalist(e.detail)
   },
   bind_confirmAndSerach(e){
      console.log(e);
      this.setData({
         serachInfo:e.detail 
      })
      this.datalist()
   },
   bind_clear(){
      this.setData({
         serachInfo:'',
         currentPage:1
      })
      this.datalist()
   },
   bind_inputComs(){

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