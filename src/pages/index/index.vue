<template>
	<view class="page show">
        <view v-if="page_show">
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
				</view>
			</view>
		</view>
		</view>
		<Bar></Bar>
	</view>
</template>

<script>
	import Binding from "@/components/liuhe-cs/binding.vue"
	export default {
	    components:{
	        Binding
        },
		data() {
			return {
				title: 'Hello',
                page_show: false,
                modal_show: false,
			}
		},
		methods: {
            init() {
            	console.log('init')
            },
		}
	}
</script>