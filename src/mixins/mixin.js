import api from '@/utils/api'
import my_global from '@/utils/my_global'

export default {
    onLoad() {
        let self = this
        console.log('onload')
        uni.$on('modalShow',function(data){
            console.log('添加 modalShow 自定义事件');
            self.modalShow('auth_modal_show')
        })
        this.preInit()
    },
    onUnload() {
        uni.$off('modalShow',function(data){
            console.log('移除 modalShow 自定义事件');
        })
    },
    methods: {
        async preInit() {
            console.log('preInit')
            let self = this
            let openid = false
            this.checkSession(async function(res) {
                console.log('checksession:res',res)
                if (res.errMsg == 'login:ok') {
                    openid = await api.get('wechat/user/session', {code:res.code}).then((res1) => {
                        console.log('res1',res1)
                        return res1.data.openid
                    })
                    uni.setStorageSync('openid', openid)
                } else {
                    openid = uni.getStorageSync('openid')
                }
                console.log('g_openid',openid)
                self.init()
            })
        },
        checkSession(callback) {
            let self = this
            uni.checkSession({
                success (res) {
                    callback(res)
                },
                fail () {
                    uni.setStorageSync('openid', false)
                    self.login(callback)
                }
            })
        },
        login(callback) {
            uni.login({
              provider: 'weixin',
              success: function (res) {
                  callback(res)
              }
            })
        },
        async checkApiAuth(type = '') {
            let auth_type = type || this.auth_type
            console.log('auth_type',auth_type)
            
            let res = await api.get('wechat/check', {openid:uni.getStorageSync('openid'), auth_type: auth_type})
            if (res.data.exists == false) {
                uni.setStorageSync(this.my_global.token_key, false)
                return false
            } else {
                return true;
            }  
        },
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
        chooseImage(obj) {
        	uni.chooseImage({
        		count: 9, //默认9
        		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        		sourceType: ['album'], //从相册选择
        		success: (res) => {
                    res.tempFilePaths.forEach(function (tmpImg) {
                        console.log(tmpImg)
                        uni.uploadFile({
                            url: my_global.__BASE_URL__+'/api/file', 
                            filePath: tmpImg,
                            name: 'file',
                            formData: {
                                'floder': 'logistics'
                            },
                            success: (uploadFileRes) => {
                                console.log(uploadFileRes.data)
                                obj.push(uploadFileRes.data)
                                console.log(obj)
                            }
                        })
                    })
        		}
        	});
        },
        fixImages(old_images) {
            let images = []
            if (old_images.length != 0) {
                old_images.forEach(function (value) {
                    images.push(my_global.storage_fix + value);
                })
            }
            console.log('images',images)
            return images
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
        showToast(title, time = 2000, icon = 'none') {
            uni.showToast({
                icon:icon,
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
        
        modalHide(modal_name = 'modal_show'){
            this[modal_name] = false
        },
        
        modalShow(modal_name = 'auth_modal_show'){
            console.log('modalShow', modal_name)
            this[modal_name] = true
            if (modal_name == 'auth_modal_show') {
                this.page_show = false
            }
        },
        async unbinding(id) {
            console.log(id)
            let res = await api.post('wechat/unbinding', {id:id.id, user_type:id.user_type}).then((res1) => {
                console.log('res1',res1)
                return res1.data
            })
            if (res.status == true) {
                this.getList()
            } else {
                this.getList()
            }
        },
        async getList(page_obj = 1) {
            uni.showLoading({
                title: '加载中'
            });
            console.log('page_obj', page_obj)
            let page = typeof page_obj == 'object' ? (page_obj.current ? page_obj.current: page_obj.page) : page_obj
            this.list_page = page
            console.log('page', page)
            this.list_search.page = page
            if (this.tab_cur != undefined) {
                this.list_search.status = this.tab_cur
            }
        	let list = await api.list(this.list_type+'s', this.list_search).then((res) => {return res})
            console.log('list', list)
            if (list.data.data != undefined) {
                this.list = list.data.data;
                this.list_meta = list.data.meta != undefined ? list.data.meta : '';
                if (this.gps_button_show != undefined) {
                    this.gpsSaveBackground()
                    let gps_time_id = this.timer()
                    console.log('gps_time_id', gps_time_id)
                    uni.setStorageSync('gps_time_id', gps_time_id)
                } else {
                    let gps_time_id = uni.getStorageSync('gps_time_id')
                    clearInterval(gps_time_id)
                }
                
            }
            
            uni.hideLoading()            
        },
        initNav() {
            api.get('logisticss/status', {list_from:this.list_from}).then((res) => {
                this.list_navs = res.data
            })
        },
        
        gpsSaveBackground() {
            wx.startLocationUpdateBackground()
            wx.onLocationChange(function(res) {
                let gps = res.latitude + ',' + res.longitude
                let lastest_gps = uni.getStorageSync('lastest_gps')
                if (lastest_gps != gps && res.latitude != 0) {
                    uni.setStorageSync('lastest_gps', gps)
                }
            })
        },
        timer(){
            return setInterval(function () {
                let gps = uni.getStorageSync('lastest_gps')
                console.log('interval', 1)
                if (gps != false && gps != undefined) {
                    api.putCustomer('gps', {gps:gps}).then((res1) => {
                        console.log('gps_post_res', res1)
                    })
                }
            }, 120000)
        }
    }
}