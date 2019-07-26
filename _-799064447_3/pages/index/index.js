var t = getApp(),ts= require("./weapp.qrcode.min");

Page({
    data: {
        userInfo: {},
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        guideQrcodeUrl: "",
        count: 180,
        currentCount: 0,
        userID: "",
        userIDGlobal: "",
        getUserInfoButtonStyle: "",
        notCheckUser: !0
    },
    bindViewTap: function() {},
    onLoad: function(e) {
        // void 0 != e.userID && "" != e.userID ? (this.setData({
        //     userID: e.userID
        // }), wx.setStorageSync("userID", e.userID)) : this.setData({
        //     userID: wx.getStorageSync("userID")
        // }), "" != t.globalData.userID && this.setData({
        //     userIDGlobal: t.globalData.userID
        // }), (wx.getStorageSync("userInfo") || this.data.notCheckUser) && (this.setData({
        //     getUserInfoButtonStyle: "hasGotUserInfoButton"
        // }), this.autoFreshQrcode());
        this.autoFreshQrcode()
    },
    ontGottUserInfo: function(t) {
        this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        }), wx.setStorageSync("userInfo", this.data.userInfo), this.autoFreshQrcode(), this.setData({
            getUserInfoButtonStyle: "hasGotUserInfoButton"
        });
    },
    autoFreshQrcode: function() {
        this.freshQrcode();
        setInterval(this.freshQrcode, 60000);
    },
    
    freshQrcode: function() {
        const defaultHeader = {
            Accept: '*/*',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Neets-Realm':'jdd-matrix',
            'WXMPEMOJI':'a-weixin:1.0.0'
        };
        wx.request({
            url: 'http://119.23.253.207:9876/member/getCardQrCode?uuid=3d70935b88c943d8b3beca1195680aj8',
            header: defaultHeader,
            success: (res) => {
                console.log('res',res.data.data.qrStr);
                if(res.data.code==='0' && res.data && res.data.data &&res.data.data.qrStr){
                    ts({
                        width:220,
                        height: 220,
                        canvasId: "myQrcode",
                        text: res.data.data.qrStr
                    })
                }
            },
            fail: (err) => {
            }
        });
        // 0 == this.data.currentCount ? ("" == this.data.userID ? this.setData({
        //     guideQrcodeUrl: "http://139.196.93.206:8080/GetCodeController/GetGuideByPixel?pixel=250&" + (Math.random() + Math.random())
        // }) : this.setData({
        //     guideQrcodeUrl: "http://139.196.93.206:8080/GetCodeController/GetGuideByIDAndPixel?userID=" + this.data.userID + "&pixel=250&" + (Math.random() + Math.random())
        // }), this.setData({
        //     currentCount: this.data.count
        // })) : this.setData({
        //     currentCount: this.data.currentCount - 1
        // });
    }
});