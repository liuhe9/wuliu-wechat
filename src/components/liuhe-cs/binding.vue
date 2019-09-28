<template>
	<view>
        <view class="cu-modal" :class="[modal_show ?'show':'']">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
                    <view class="content">您还未绑定</view>
                        <view class="action" @tap="modalHide">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding flex flex-direction" v-if="modal_show">
                        <button class="cu-btn bg-green lg" open-type="getPhoneNumber" @getphonenumber="getPhoneSuccess">授权手机号绑定</button>
                    </view>
                </view>
        	</view>
        </view>
	</view>
</template>

<script>
    import api from '@/utils/api'
	export default {
		data() {
			return {
				
			}
		},
		props:{
		    modal_show: {
		    },
            user_type: {
            },
		},
		methods:{
		    modalHide() {
				this.$emit('modalHide')
			},
            async getPhoneSuccess(e) {
                console.log(e)
                if (e.detail.errMsg == 'getPhoneNumber:ok') {
                    let request_data = {openid:uni.getStorageSync('openid'), user_type:this.user_type, phone_encrypted_data:e.detail}
                    console.log('phone_request_data', request_data);
                    let res = await api.post('wechat/binding', request_data).then((res1) => {
                        console.log('res1',res1)
                        return res1.data
                    })
                    if (res.status == false) {
                        uni.showModal({
                            title: '绑定失败',
                            content: res.errMsg,
                            showCancel: false,
                            duration: 3000
                        })
                    } else {
                        this.$emit('modalHide')
                        this.$emit('init')
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