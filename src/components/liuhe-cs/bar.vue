<template>
	<view >
        <view class="cu-bar tabbar padding-bottom-xs bg-white" style="position: fixed;width: 100%; bottom: 0; ">
            <view class="action" :class="[active_bar==0?'text-blue':'text-gray']" v-on:touchstart="redirect_to('/pages/index/index')">
                <view class="cuIcon-home" ></view> 首页
            </view>
            <view class="action" :class="[active_bar==1?'text-blue':'text-gray']" v-on:touchstart="redirect_to('/pages/manager/index')">
                <view class="cuIcon-settings"></view> 我是管理员
            </view>
			<view class="action text-gray add-action" v-on:touchstart="modal_show = true">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				发货
			</view>
			<view class="action" :class="[active_bar==2?'text-blue':'text-gray']" v-on:touchstart="redirect_to('/pages/consigner/index')">
                <view class="cuIcon-form"></view> 我是客户
            </view>
            <view class="action" :class="[active_bar==3?'text-blue':'text-gray']" v-on:touchstart="redirect_to('/pages/driver/index')">
                <view class="cuIcon-location"> </view> 我是司机
            </view>
        </view>
		<consigner_form :modal_show="modal_show" @modalHide="modalHide"></consigner_form>
	</view>
</template>

<script>
	import consigner_form from '@/components/liuhe-cs/consigner_form'

	export default {
		components:{
			consigner_form
		},
		data() {
			return {
				modal_show:false
			};
		},
		props: {
			active_bar: {
				type:Number,
				default:0
			}
		},
		onLoad() {
        },

		methods:{
			modalHide(){
				this.modal_show = false
			},

		},
	}
</script>
