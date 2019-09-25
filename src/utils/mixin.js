export default {
    methods: {
        redirect_to(url) {
            uni.redirectTo({ url: url })
        },
        navigate_to(url) {
            uni.navigateTo({ url: url })
        },
        makePhoneCall(mobile){
            uni.makePhoneCall({
                phoneNumber:mobile
            });
        },
        scanCode(){
            return uni.scanCode({
                success: function (res) {
                    return res.result;
                }
            });
        },
        setClipboardData(data){
            let self = this
            uni.setClipboardData({
                data: data,
                success: function () {
                    self.showToast('复制成功', 2000)
                }
            });
        },
        showToast(title, time = 2000) {
            uni.showToast({
                title: title,
                duration: time
            });
        },
        showModal(title, showCancel = true) {
            uni.showModal({
              title: title,
              content: content,
              showCancel: showCancel
            })
        },
        mapCallout(title, bgIndex = 0) {
            let bgColorArr = [
                '#8dc63f', '#1cbbb4', '#F43f3b'
            ];
            return {content:title, color:'#fff', bgColor:bgColorArr[bgIndex], padding: '3rpx', fontSize:'30rpx', display:'ALWAYS', textAlign:'center'};
        },
        mapIcon(index = 0) {
            let arr = ['/static/images/icon_gps.png', '/static/images/icon_qi.png', '/static/images/icon_zhong.png', '/static/images/icon_che.png']
            return arr[index]
        },
        mapMaker(latitude, longitude, mapIcon, callout = '') {
            let marker = {latitude: latitude, longitude: longitude, iconPath: mapIcon, width:50, height:50}
            if (callout != '') {
                marker.callout = callout
            }
            return marker
        },
        chooseLocation(callback) {
            uni.getSetting({
                success(res){
                    console.log(res)
                    if (!res.authSetting['scope.userLocation']) {
                        console.log(1)
                        uni.authorize({
                            scope: 'scope.userLocation',
                            success () {
                                uni.chooseLocation({
                                    success (res) {
                                        console.log(res)
                                        callback(res);
                                    }
                                });
                            }
                        })
                    } else {
                        console.log(2)
                        uni.chooseLocation({
                            success (res) {
                                console.log(res)
                                callback(res);
                            }
                        });
                    }
                }
            })
        },
    }
}