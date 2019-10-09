<template>
	<view>
		<view class="margin-bottom-xl padding-bottom-xl" v-if="list_data.length != 0">
			<view v-for="(item, idx) in list_data" :key="item.id" class="cu-list menu solids-top bg-white margin-bottom-xl">
				<view class="cu-item">
					<view class="content solid margin-top-df padding-top-df">
                        <view class="flex bg-grey solid-bottom margin-top-df padding-top-df justify-between">
                            <view class="padding-xs margin-xs">单号 : {{item.tracking_no}} </view>
                            <view class="padding-xs margin-xs" @tap="setClipboardData(item.tracking_no)">{{item.status_name}}<uniTag text="复制"></uniTag></view>
                        </view>
                        <view class="flex bg-gray solid-bottom justify-between">
                            <view class="padding-xs margin-xs">收货人 : {{item.receiver_name}} </view>
                            <view class="padding-xs margin-xs">
                                <view class="cu-capsule radius" @tap="makePhoneCall(item.receiver_mobile)">
                                    <view class="cu-tag bg-grey">
                                        <text class="cuIcon-mobile"></text>
                                    </view>
                                    <view class="cu-tag">
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
                                    <view class="cu-tag">
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
                        <view v-if="item.drivers.length != 0 && item.drivers != undefined && list_from != 'driver'">
                            <view class="flex solid-bottom justify-between" v-for="driver in item.drivers" :key="driver.id">
                                <view class="padding-xs margin-xs">司机 : {{driver.driver.name}} </view>
                                <view class="padding-xs margin-xs">
                                    <view class="cu-capsule radius" @tap="makePhoneCall(driver.driver.mobile)">
                                        <view class="cu-tag bg-grey">
                                            <text class="cuIcon-mobile"></text>
                                        </view>
                                        <view class="cu-tag">
                                            {{driver.driver.mobile}}
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
                                <button class="cu-btn block bg-green" v-if="list_from == 'manager'" @tap="driversList(idx)">
                                    <text class="cuIcon-deliver"></text> 分配司机
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-green" v-if="list_from != 'consigner' && item.next_status != null" @tap="changeStatus(item.next_status.code)">
                                    <text class="cuIcon-check"></text> {{item.next_status.name}}
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-gray" @tap="showMapGps(idx)">
                                    <text class="cuIcon-location"></text> 查看定位
                                </button>
                            </view>
                        </view>
					</view>
				</view>
			</view>
            <view class=" bg-white margin-top padding-bottom-xl margin-bottom-xl" v-if="list_meta.total != undefined && list_meta.total != 0">
                <uniPagination :current="list_meta.current_page" :total="list_meta.total" :pageSize="list_meta.per_page" @change="getList"></uniPagination>
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
        <mapMarkers :modal_show="modal_show" :markers="markers" :map_scale="map_scale" @modalHide="modalHide"></mapMarkers>
        <mySelect :select_title="select_title" :select_modal="select_modal" :select_list="drivers" :selected_list="selected_list" @selectModalHide="selectModalHide" @confirmSelectedList="confirmSelectedList"></mySelect>
	</view>
</template>

<script>
    import api from '@/utils/api.js'
    import my_global from '@/utils/my_global.js'
    import uniTag from "@/components/uni-ui/uni-tag/uni-tag"
    import mapMarkers from "@/components/liuhe-cs/map"
    import uniPagination from "@/components/uni-ui/uni-pagination/uni-pagination.vue"
    import mySelect from '@/components/liuhe-cs/my-select.vue'

	export default {
        components: {
            uniTag, mapMarkers, uniPagination, mySelect
        },
		data() {
			return {
                modal_show:false,
                select_modal:false,
                markers:[],
                map_scale: 15,
                drivers:[],
                selected_list: [],
                select_title: '选择司机',
                cur_idx: 0
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
            
            },

            page:{
            
            },
            
		},
        mounted() {
            this.initNav()
        },
        methods:{
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
                    this.map_scale = 15
                } else {
                    console.log('gps_points', gps_points)
                    let self = this
                    gps_points.forEach(function(value){
                        let gps = value.gps.split(',')
                        let mapIcon = self.mapIcon(value['icon_index'])
                        let marker = self.mapMaker(gps[0], gps[1], mapIcon)
                        self.markers.push(marker)
                    })
                    
                    console.log('markers', self.markers)
                    this.map_scale = 14
                }
                this.modal_show = true
            },
            showMapGps(idx) {
                this.cur_idx = idx
                let item = this.list_data[idx]
                let gps_arr = []
                if (item.drivers.length != 0) {
                    item.drivers.forEach(function(value, idx){
                        if (value.latest_gps) {
                            gps_arr.push({'gps': value.latest_gps, 'icon_index': 3})
                        }
                    })
                }
                gps_arr.push({'gps': item.from_gps, 'icon_index': 1})
                gps_arr.push({'gps': item.to_gps, 'icon_index': 2})
                this.showMap(gps_arr, 'all')
            },
            async getList(e = 1) {
                let page = typeof e == 'object' ? e.current : e
                this.$emit('getList', {page:page})
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

            async driversList(idx) {
                this.cur_idx = idx
                this.selected_list = this.formatSelectedList(this.list_data[idx]['drivers'])
                console.log('idx', idx)
                console.log('item', this.list_data[idx])
                let drivers = await api.get('drivers', {per_page:1000}).then((res) => {
                    return res.data.data
                })
                this.drivers = this.formatList(drivers)
                console.log(this.drivers)
                this.select_modal = true
            },
            formatSelectedList(drivers) {
                let selected_list = []
                if (drivers.length != 0) {
                    drivers.forEach(function(value, idx){
                        selected_list.push(value.driver_id)
                    })
                }
                return selected_list;
            },
            formatList(drivers) {
                let format_list = []
                if (drivers.length != 0) {
                    let selected_list = this.selected_list
                    console.log('selected_list',selected_list)
                    drivers.forEach(function(value, idx){
                        value.checked = selected_list.length !=0 ? (selected_list.includes(value.id) ? true : false) : false
                        format_list.push(value)
                    })
                }
                return format_list;
            },
            selectModalHide() {
                this.select_modal = false
            },
            async confirmSelectedList(params) {
                console.log(params)
                this.selected_list = params.selected_list
                if (this.selected_list.length > 0) {
                    let l_res = await api.putCustomer('logisticss/'+this.list_data[this.cur_idx]['id']+'/drivers', {drivers:this.selected_list}).then((res) =>{
                        return res
                    })
                    this.getList()
                    console.log('l_res', l_res);
                }
                this.select_modal = false
            },
            changeStatus(status) {

            }
        }
	}
</script>
