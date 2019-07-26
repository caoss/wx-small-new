App({
    onLaunch: function(e) {
        wx.setKeepScreenOn({
            keepScreenOn: !0
        }), wx.getScreenBrightness({
            success: function(e) {
                wx.setScreenBrightness({
                    value: .8
                });
            }
        }), void 0 != e.userID && (this.globalData.userID = e.userID);
    },
    onError: function(e) {
        wx.clearStorage();
    },
    globalData: {
        userInfo: null,
        userID: "",
        screenBrightness: .5
    }
});