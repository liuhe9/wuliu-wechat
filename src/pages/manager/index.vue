<template>
	<view class="page show">
        <view v-if="page_show">
            <view class="cu-list menu sm-border card-menu margin-top">
                <view class="cu-item arrow" v-on:touchstart="navigate_to('/pages/manager/manager/index')">
                    <view class="content">
                        <text class="cuIcon-friend text-blue"></text>
                        <text class="text-gray">管理员</text>
                    </view>
                </view>
                <view class="cu-item arrow" v-on:touchstart="navigate_to('/pages/manager/driver/index')">
                    <view class="content">
                        <text class="cuIcon-deliver text-orange"></text>
                        <text class="text-gray">司机</text>
                    </view>
                </view>
                <view class="cu-item arrow" v-on:touchstart="navigate_to('/pages/manager/consigner/index')">
                    <view class="content">
                        <text class="cuIcon-emoji text-pink"></text>
                        <text class="text-gray">客户</text>
                    </view>
                </view>
            </view>
            <view class="cu-list menu sm-border card-menu margin-top">
                <view class="cu-item arrow" v-on:touchstart="navigate_to('/pages/manager/logistics/index')">
                    <view class="content">
                        <text class="cuIcon-location text-red"></text>
                        <text class="text-gray">物流管理</text>
                    </view>
                </view>
                <view class="cu-item arrow" v-on:touchstart="navigate_to('/pages/manager/logistics_statistics/index')">
                    <view class="content">
                        <text class="cuIcon-time text-grey"></text>
                        <text class="text-gray">物流统计</text>
                    </view>
                </view>
            </view>
            <view class="cu-list menu sm-border card-menu margin-top">
                <view class="cu-item arrow" v-on:touchstart="navigate_to('/pages/manager/company/index')">
                    <view class="content">
                        <text class="cuIcon-home text-gray"></text>
                        <text class="text-gray">公司信息</text>
                    </view>
                </view>
            </view>
        </view>
		<Binding :user_type="auth_type" :modal_show="modal_show" @modalHide="modalHide" @init="init"></Binding>
		<Auth :user_type="auth_type" :auth_modal_show="auth_modal_show" @modalHide="modalHide" @init="init"></Auth>
        <Bar active_bar="1"></Bar>
	</view>
</template>

<script>
    import api from "@/utils/api"
    import Binding from "@/components/liuhe-cs/binding.vue"
    import Auth from "@/components/liuhe-cs/auth.vue"
	export default {
        components:{
            Binding,
            Auth,
        },
		data() {
			return {
				title: '我是管理员',
                page_show: false,
                modal_show: false,
                auth_modal_show: false,
				auth_type: 'manager',
			}
		},
		methods: {
            async init() {
                console.log('init')
                let auth_res = await this.checkApiAuth()
                this.page_show = auth_res
                if (auth_res == false) {
                    this.modal_show = 'show'
                } else {
                    let me = await api.get('/api/managers/me').then((res) => {
                        return res.data
                        
                    })
                }
            }
		}
	}
</script>