<template>
	<view>
        <scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="item.key==tab_cur?'text-blue cur':''" v-for="(item,index) in tab_data" :key="index" @tap="tabSelect" :data-id="item.key">
				{{item.label}}
			</view>
		</scroll-view>
		<view class="margin-bottom-xl padding-bottom-xl" v-if="list_data.length != 0">
			<view v-for="item in list_data" :key="item.id" class="cu-list menu solids-top bg-white margin-bottom-xl">
				<view class="cu-item">
					<view class="content solid margin-top-df padding-top-df">
                        <view class="flex bg-grey solid-bottom margin-top-df padding-top-df justify-between">
                            <view class="padding-xs margin-xs">单号 : {{item.tracking_no}} </view>
                            <view class="padding-xs margin-xs" @tap="setClipboardData(item.tracking_no)"><uniTag text="复制"></uniTag></view>
                        </view>
                        
                        <view class="flex bg-gray solid-bottom justify-between">
                            <view class="padding-xs margin-xs">收货人 : {{item.receiver_name}} </view>
                            <view class="padding-xs margin-xs">
                                <view class="cu-capsule radius" @tap="makePhoneCall(item.receiver_mobile)">
                                    <view class="cu-tag bg-grey">
                                        <text class="cuIcon-mobile"></text>
                                    </view>
                                    <view class="cu-tag line-red">
                                        {{item.receiver_mobile}}
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="flex bg-gray solid-bottom justify-between">
                            <view class="padding-xs margin-xs" @tap="setClipboardData(item.to_address)">收货地址 : {{item.to_address}} <uniTag text="复制"></uniTag></view>
                            <view class="padding-xs margin-xs text-red" @tap="showMap(item.to_gps, 'end')">
                                <view class="cuIcon-location"> </view>
                            </view>
                        </view>
                        
                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs">发货人 : {{item.consigner_name}} </view>
                            <view class="padding-xs margin-xs">
                                <view class="cu-capsule radius" @tap="makePhoneCall(item.consigner_mobile)">
                                    <view class="cu-tag bg-grey">
                                        <text class="cuIcon-mobile"></text>
                                    </view>
                                    <view class="cu-tag line-red">
                                        {{item.consigner_mobile}}
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs" @tap="setClipboardData(item.from_address)">发货地址 : {{item.from_address}} <uniTag text="复制"></uniTag></view>
                            <view class="padding-xs margin-xs text-red" @tap="showMap(item.from_gps, 'start')">
                                <view class="cuIcon-location"> </view>
                            </view>
                        </view>

                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs">商品描述 : {{item.product_desc}} </view>
                        </view>
                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs">备注 : {{item.note}}</view>
                        </view>
                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs">创建时间 : {{item.created_at}}</view>
                        </view>
                        <view v-if="item.drivers.data.length != 0 && item.drivers != undefined">
                            <view class="flex solid-bottom justify-between" v-for="(idx, driver) in item.drivers" :key="driver.id">
                                <view class="padding-xs margin-xs">司机 : {{driver.name}} </view>
                                <view class="padding-xs margin-xs">
                                    <view class="cu-capsule radius" @tap="makePhoneCall(driver.mobile)">
                                        <view class="cu-tag bg-grey">
                                            <text class="cuIcon-mobile"></text>
                                        </view>
                                        <view class="cu-tag line-red">
                                            {{driver.mobile}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="flex solid-bottom text-white justify-between">
                            <view class="padding-xs margin-xs">
                                <button v-if="item.images" class="cu-btn block bg-gray" @tap="viewImage(item.images)">
                                    <text class="cuIcon-picfill"></text> 发货图片
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button v-if="item.finish_images" class="cu-btn block bg-gray" @tap="viewImage(item.finish_images)">
                                    <text class="cuIcon-picfill"></text> 收货图片
                                </button>
                            </view>
                        </view>
                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-red" @tap="chooseDrivers">
                                    <text class="cuIcon-check"></text> 分配司机
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-red">
                                    <text class="cuIcon-check"></text> 确认
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-white">
                                    <text class="cuIcon-location"></text> 查看定位
                                </button>
                            </view>
                        </view>
					</view>
				</view>
			</view>
            <view class=" bg-white margin-top padding-bottom-xl margin-bottom-xl" v-if="list_meta.total != undefined && list_meta.total != 0">
                <UniPagination :current="list_meta.current_page" :total="list_meta.total" :pageSize="list_meta.per_page" @change="getList"></UniPagination>
            </view>
            <view class="margin-top-xl margin-bottom-xl"></view>
		</view>
		<view class="cu-list menu-avatar justify-center" v-if="list_data.length == 0">
			<view class="cu-item">
				<view class="content ">
					<view class="text-grey">暂无数据</view>
				</view>
			</view>
		</view>
        <MapMarkers :modal_show="modal_show" :markers="markers" @modalHide="modalHide"></MapMarkers>
	</view>
</template>

<script>
    import my_global from '@/utils/my_global.js'
    import uniTag from "@/components/uni-ui/uni-tag/uni-tag"
    import MapMarkers from "@/components/liuhe-cs/map"
    import UniPagination from "@/components/uni-ui/uni-pagination/uni-pagination.vue"

	export default {
        components: {
            uniTag, MapMarkers, UniPagination
        },
		data() {
			return {
                modal_show:false,
                markers:[],
			};
		},
		props:{
            list_title:{
                dataType: {
                    type: String,
                }
            },
            list_data:{
            
            },
            list_type:{
            
            },
            list_from:{
            
            },
            list_links:{
            
            },
            list_meta:{
            
            }
		},
        methods:{
            /**
             * @param {string|array} gps(string:经度,纬度；array:数组)
             * 
             * 
             * **/
            showMap(gps_points, type = 'start') {
                this.markers = [];
                if (typeof gps_points == 'string') {
                    if (gps_points == '' || gps_points == false) {
                        showToast('未选择坐标')
                    }
                    let gps = gps_points.split(',')
                    let icon_index = 0
                    if (type == 'start') {
                        icon_index = 1
                    } else if (type == 'end') {
                        icon_index = 2
                    }
                    let mapIcon = this.mapIcon(icon_index)
                    let marker = this.mapMaker(gps[0], gps[1], mapIcon)
                    this.markers.push(marker)
                } else {
                    let self = this
                    gps_points.forEach(function(value){
                        let gps = value['gps'].split(',')
                        let mapIcon = self.mapIcon(value['icon_index'])
                        let marker = self.mapMaker(gps[0], gps[1], mapIcon)
                        self.markers.push(marker)
                    })
                }
                this.modal_show = true
            },
            async getList(e) {
                this.$emit('getList', {page:e.current})
                this.modal_show = false
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
            
            chooseDrivers() {
                console.log(11)
            },
        }
	}
</script>
