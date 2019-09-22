<template>
	<view>
        <view class="cu-modal" :class="[modal_show ?'show':'']">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
                    <view class="content">地图</view>
                        <view class="action" @tap="modalHide">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding-sm" v-if="modal_show == true">
                        <map style="width: 100%; height: 800rpx;" show-compass="true" show-scale="true" :latitude="markers[0]['latitude']" :longitude="markers[0]['longitude']" :markers="markers">
                        </map>
                    </view>
                </view>
        	</view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
		    modal_show: {
		    },
            markers:{
                
            }
		},
        created() {
            console.log(this.modal_show)
            console.log(this.markers)
        },
		methods:{
		    modalHide() {
				this.$emit('modalHide')
			}
        }
	}
</script>

<style>

</style>
