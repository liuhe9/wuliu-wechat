<template>
	<view>
        <view class="cu-modal" :class="[auth_modal_show ?'show':'']">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
                    <view class="content">未登录</view>
                        <view class="action" @tap="modalHide2">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding flex flex-direction" v-if="auth_modal_show">
                        <UniNoticeBar text="此功能为公司内部产品，需要有权限的员工授权登录才可使用,如未开通请联系管理员添加"></UniNoticeBar>
                        <button class="cu-btn bg-green lg" open-type="getUserInfo" @getuserinfo="getWechatUserInfo">授权登录</button>
                    </view>
                </view>
        	</view>
        </view>
	</view>
</template>

<script>
    import UniNoticeBar from "@/components/uni-ui/uni-notice-bar/uni-notice-bar.vue"
    import api from '@/utils/api'
    import my_global from '@/utils/my_global'
	export default {
        components:{
            UniNoticeBar
        },
		data() {
			return {
				
			}
		},
		props:{
		    auth_modal_show: {
		    },
            user_type: {
            },
		},
		methods:{
		    modalHide2() {
				this.$emit('modalHide2', 'auth_modal_show')
			},
            async getWechatUserInfo(e) {
                let self = this
                console.log(e)
                uni.showLoading({
                    title: '加载中'
                });
                if (e.detail.errMsg == 'getUserInfo:ok') {
                    let request_data = {openid:uni.getStorageSync('openid'), user_type:this.user_type, encrypted_data:e.detail}
                    console.log('user_info_request_data', request_data);
                    let res = await api.post('/api/login', request_data).then((res1) => {
                        console.log('res1',res1)
                        return res1.data
                    })
                    uni.hideLoading()
                    console.log('login', res)
                    if (res.access_token != undefined && res.access_token) {
                        uni.setStorageSync(my_global.token_key, res.access_token)
                        setTimeout(function () {
                            self.$emit('modalHide2', 'auth_modal_show')
                        }, 1000)
                    } else {
                        uni.showModal({
                            title: '登录失败',
                            content: res.message,
                            showCancel: false,
                            duration: 3000
                        })
                    }
                } else {
                    uni.showModal({
                        title: '获取手机号失败，无法绑定',
                        content: '您将无法使用此功能',
                        showCancel: false,
                        duration: 3000
                    })
                }
            }
        }
	}
</script>