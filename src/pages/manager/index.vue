<template>
	<view class="page show">
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
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>