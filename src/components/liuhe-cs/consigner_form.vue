<template>
	<view>
         <view class="cu-modal" :class="[modal_show ?'show':'']">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
                    <view class="content">填写发货单</view>
                        <view class="action" @tap="modalHide">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding-sm">
                        <form>
                            <view class="cu-form-group margin-top">
                                <view class="title">发货单号</view>
                                <input placeholder="发货单号" v-model="form.tracking_no"></input>
                                <text class='cuIcon-scan text-orange' @tap="scanQrcode" data-id="tracking_no"></text>
                            </view>
                            <view class="cu-form-group uni-textarea">
                                <view class="title">货品描述</view>
                                <textarea placeholder="货品描述" maxlength="-1" v-model="form.product_desc">
                                </textarea>
                            </view>
                            <view class="cu-form-group uni-textarea">
                                <view class="title">备注</view>
                                <textarea placeholder="备注" maxlength="-1" v-model="form.note">
                                </textarea>
                            </view>
                            <view class="cu-bar bg-white">
                                <view class="action">
                                    发货商品图片
                                </view>
                                <view class="action"></view>
                            </view>
                            <view class="cu-form-group">
                                <view class="grid col-4 grid-square flex-sub">
                                    <view class="bg-img" v-for="(item,index) in form.imgList" :key="index" @tap="ViewImage" :data-url="form.imgList[index]">
                                    <image :src="form.imgList[index]" mode="aspectFill"></image>
                                        <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                                            <text class='cuIcon-close'></text>
                                        </view>
                                    </view>
                                    <view class="solids" @tap="ChooseImage" v-if="form.imgList.length<4">
                                        <text class='cuIcon-cameraadd'></text>
                                    </view>
                                </view>
                            </view>
                            <view class="cu-form-group margin-top bg-gray">
                                <view class="title">收货人</view>
                                <input placeholder="收货人" v-model="form.receiver_name"></input>
                            </view>
                            <view class="cu-form-group bg-gray">
                                <view class="title">收货人手机</view>
                                <input placeholder="收货人手机" v-model="form.receiver_mobile"></input>
                            </view>
                            <view class="cu-form-group bg-gray">
                                <view class="title">收货地址坐标</view>
                                <input type="text" disabled="true" v-model="form.to_gps"></input>
                                <text class='cuIcon-locationfill text-orange' @tap="getGps" data-id="to_gps">选择坐标</text>
                            </view>
                            <view class="cu-form-group bg-gray">
                                <view class="title">收货地址</view>
                                <textarea maxlength="-1" v-model="form.to_address"></textarea>
                            </view>
                            
                            <view class="cu-form-group">
                                <view class="title">发货地址坐标</view>
                                <input type="text" disabled="true" v-model="form.from_gps"></input>
                                <text class='cuIcon-locationfill text-orange' @tap="getGps" data-id="from_gps">选择坐标</text>
                            </view>
                            <view class="cu-form-group">
                                <view class="title">发货地址</view>
                                <textarea maxlength="-1" v-model="form.from_address"></textarea>
                            </view>
                            
                            <view class="padding flex flex-direction">
                                <button class="cu-btn bg-green lg" @tap="submitForm">确定</button>
                            </view>
                        </form>
                    </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import api from '@/utils/api'
	export default {
		data() {
			return {
                form: {
                    tracking_no: '',
                    imgList: [],
                    product_desc:'',
                    receiver_name:'',
                    receiver_mobile:'',
                    to_address:'',
                    to_gps:'',
                    from_address:'',
                    from_gps:'',
                    note: '',
                }
			};
		},
		props:{
            modal_show: {
            }
        },
		methods:{
            modalHide() {
				this.$emit('modalHide')
			},
            RegionChange(e) {
				this.form.region = e.detail.value
			},
            RegionChange2(e) {
            	this.form.region_from = e.detail.value
            },
            ChooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.form.imgList.length != 0) {
							this.form.imgList = this.form.imgList.concat(res.tempFilePaths)
						} else {
							this.form.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.form.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.form.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
            async submitForm()
            {
                console.log(this.form)
                let submitRes = await api.post('logisticses', this.form)
                console.log(submitRes)
            },
            getGps(e) {
                let data_id = e.target.dataset.id
                let self = this
                
                this.chooseLocation(function(res) {
                    if (res.latitude != undefined && res.longitude != undefined) {
                        if (data_id == 'to_gps') {
                            self.form.to_gps = res.latitude + ',' + res.longitude
                            if (!self.form.to_address) {
                                self.form.to_address = res.address
                            }
                        } else {
                            self.form.from_gps = res.latitude + ',' + res.longitude
                            if (!self.form.from_address) {
                                self.form.from_address = res.address
                            }
                        }
                    } else {
                        self.showToast('未选择地点')
                    }
                })
            },
            scanQrcode() {
                console.log(this.scanCode());
            }
		}
	}
</script>
