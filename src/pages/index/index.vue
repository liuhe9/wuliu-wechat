<template>
	<view class="page">
        <view style="text-align: center; padding: 10rpx; ">
            <image class="my_image" lazy-load="true" v-if="format_images.length > 0" v-for="(item, idx) in format_images" :key="idx" :src="item" mode="widthFix"></image>
        </view>
		<Bar></Bar>
	</view>
</template>

<script>
    import api from '@/utils/api'
    import my_global from '@/utils/my_global'
	export default {
		data() {
			return {
				title: '首页',
                images: [],
                modal_show: false,
			}
		},
        computed: {
            format_images:function() {
                let images = []
                if (this.images.length != 0) {
                    this.images.forEach(function (value) {
                        images.push(my_global.storage_fix + value);
                    })
                }
                console.log('images',images)
                return images
            }
        },
		methods: {
            init() {
            	this.getCompanyInfo()
            },
            getCompanyInfo() {
                uni.showLoading({
                    title: '加载中'
                });
                api.get('companies').then((res) => {
                    console.log(res)
                    this.images = res.data.images == null ? [] : JSON.parse(res.data.images)
                });
                uni.hideLoading() 
            },
		}
	}
</script>