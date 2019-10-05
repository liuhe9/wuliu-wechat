<template>
    <view>
        <view style="position: fixed; bottom: 0; width: 100%; ">
            <view class="cu-bar tabbar padding-bottom-xs bg-white">
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
            <consignerForm :modal_show="modal_show" @modalHide="modalHide"></consignerForm>
        </view>
	</view>
</template>

<script>
	import consignerForm from '@/components/liuhe-cs/consigner-form'

	export default {
		components:{
			consignerForm
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
			

		},
	}
</script>
