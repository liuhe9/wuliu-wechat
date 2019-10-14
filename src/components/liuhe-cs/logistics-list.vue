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
                        
                        <view class="flex solid-bottom text-white justify-between">
                            <view class="padding-xs margin-xs">
                                <button v-if="item.images.length!=0" class="cu-btn block bg-gray" @tap="viewImage(item.images)">
                                    <text class="cuIcon-picfill"></text> 发货图片
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button v-if="item.finish_images.length!=0" class="cu-btn block bg-gray" @tap="viewImage(item.finish_images)">
                                    <text class="cuIcon-picfill"></text> 收货图片
                                </button>
                            </view>
                        </view>
                        
                        <view class="cu-form-group" v-if="list_from != 'consigner'">
                            <view>上传发货图片</view>
                            <view class="grid col-4 grid-square flex-sub">
                                <view class="bg-img" v-for="(item2,index2) in c_upload_images" :key="index2" :data-url="item2">
                                <image :src="item2" mode="widthFix"></image>
                                    <view class="cu-tag bg-red" @tap.stop="delImg(index2, item.id, 'upload_images', 'images')">
                                        <text class='cuIcon-close'></text>
                                    </view>
                                </view>
                                <view class="solids" @tap="chooseImage(idx, 'upload_images', 'images')">
                                    <text class='cuIcon-cameraadd'></text> 
                                </view>
                            </view>
                        </view>
                        <view class="cu-form-group" v-if="list_from != 'consigner'">
                            <view>上传收货图片</view>
                            <view class="grid col-4 grid-square flex-sub">
                                <view class="bg-img" v-for="(item3,index3) in c_upload_finish_images" :key="index3" :data-url="item3">
                                <image :src="item3" mode="widthFix"></image>
                                    <view class="cu-tag bg-red" @tap.stop="delImg(index3, item.id, 'upload_finish_images', 'finish_images')">
                                        <text class='cuIcon-close'></text>
                                    </view>
                                </view>
                                <view class="solids" @tap="chooseImage(idx, 'upload_finish_images', 'finish_images')">
                                    <text class='cuIcon-cameraadd'></text> 
                                </view>
                            </view>
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
                        <view class="flex solid-bottom justify-between">
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-green" v-if="list_from == 'manager'" @tap="driversList(idx)">
                                    <text class="cuIcon-deliver"></text> 司机
                                </button>
                            </view>
                            <view class="padding-xs margin-xs">
                                <button class="cu-btn block bg-green" v-if="show_status(item.next_status, list_from)" @tap="changeStatus(item.id, item.next_status.name, item.next_status.code)">
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
                upload_images:[],
                upload_finish_images:[],
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
            list_meta:{
            
            },

            page:{
            
            },
            
		},
        computed:{
            c_upload_images() {
                return this.fixImages(this.upload_images)
            },
            c_upload_finish_images() {
                return this.fixImages(this.upload_finish_images)
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
                let params = {page:page}
                if(e.tab_cur != undefined) {
                    params.tab_cur = e.tab_cur
                }
                this.$emit('getList', params)
                this.modal_show = false
                this.selected_list = []
            },
            
            chooseImage(idx, obj, target) {
                this.cur_idx = idx
                this[obj] = this.list_data[idx][target] == null ? [] : JSON.parse(this.list_data[idx][target])
                let self = this
            	uni.chooseImage({
            		count: 9, //默认9
            		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            		sourceType: ['album'], //从相册选择
            		success: (res) => {
                        let files_count = res.tempFilePaths.length
                        console.log('files_count',files_count)
                        res.tempFilePaths.forEach(function (tmpImg) {
                            console.log(tmpImg)
                            uni.uploadFile({
                                url: my_global.__BASE_URL__+'/api/files', 
                                filePath: tmpImg,
                                name: 'file',
                                formData: {
                                    'floder': 'logistics'
                                },
                                success: (uploadFileRes) => {
                                    files_count--
                                    self[obj].push(uploadFileRes.data)
                                    console.log(self[obj])
                                    if (files_count == 0) {
                                        self.saveLogisticsImages(self.list_data[idx]['id'], obj, target)
                                    }
                                }
                            })
                        })
            		}
            	});
            },
            
            saveLogisticsImages(id, obj, target){
                let self = this
                api.put('/api/'+self.list_from+'/logistics/'+id+'/images', {images:self[obj], image_type:target}).then((res) => {
                    uni.showToast({
                        icon:'none',
                        title: '保存成功！',
                        duration: 3000
                    });
                })
            },
            
            delImg(index, id, obj, target) {
                let self = this
            	uni.showModal({
            		title: '删除图片',
            		content: '确定要删除图片吗？',
            		cancelText: '取消',
            		confirmText: '删除',
            		success: res => {
            			if (res.confirm) {
            				self[obj].splice(index, 1)
                            self.saveLogisticsImages(id, obj, target)
            			}
            		}
            	})
            },

            fixImages(old_images) {
                let images = []
                old_images = old_images == null ? [] : old_images
                if (old_images.length != 0) {
                    old_images.forEach(function (value) {
                        console.log(value)
                        if (value.search("https://") == -1 || value.search("http://") == -1) {
                            images.push(my_global.storage_fix + value);
                        } else {
                            images.push(value)
                        }
                    })
                }
                console.log('images',images)
                return images
            },
            
            fixImage(old_image) {
                let image = old_image
                if (old_image.search("https://") == -1 || old_image.search("http://") == -1) {
                    image = my_global.storage_fix + old_image
                }
                return image
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
                let drivers = await api.get('/api/drivers', {per_page:1000}).then((res) => {
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
                    let l_res = await api.put('/api/logisticss/'+this.list_data[this.cur_idx]['id']+'/drivers', {drivers:this.selected_list}).then((res) =>{
                        return res
                    })
                    this.getList()
                    console.log('l_res', l_res);
                }
                this.select_modal = false
            },
            changeStatus(id, name, status) {
                let self=this
                uni.showModal({
                  title: '更改物流状态',
                  content: '确定要更改至【'+name+'】吗？',
                  success (res) {
                    if (res.confirm) {
                      api.put('/api/'+self.list_from+'/logistics/'+id+'/status', {status:status}).then((res) => {
                          if (res.data.status == true) {
                              self.getList({tab_cur:status})
                          }
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
            },
            show_status(next_status, list_from) {
                if (list_from != 'consigner' && next_status != false) {
                    if (next_status.code == 10 && list_from == 'driver') {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
        }
	}
</script>
