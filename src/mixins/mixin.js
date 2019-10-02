import api from '@/utils/api'

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
        viewImage(images) {
            console.log(images)
            let urls = this.fixImages(JSON.parse(images))
        	uni.previewImage({
        		urls: urls,
        		current: urls[0]
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
            let page = typeof page_obj == 'object' ? page_obj.page : page_obj
            console.log('page', page)
        	let list = await api.list(this.list_type+'s', {page:page}).then((res) => {return res})
            console.log('list', list)
            this.list = list.data.data;
            this.list_links = list.data.links;
            this.list_meta = list.data.meta;
        }
    }
}