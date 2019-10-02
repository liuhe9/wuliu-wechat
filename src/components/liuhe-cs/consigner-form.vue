<template>
	<view v-if="modal_show">
         <view class="cu-modal" :class="[modal_show ?'show':'']" style="position: fixed;">
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
                            
                            <view class="cu-bar bg-white">
                                <view class="action">
                                    发货商品图片
                                </view>
                                <view class="action"></view>
                            </view>
                            <view class="cu-form-group">
                                <view class="grid col-4 grid-square flex-sub">
                                    <view class="bg-img" v-for="(item,index) in upload_images" :key="index" @tap="ViewImage" :data-url="upload_images[index]">
                                    <image :src="upload_images[index]" mode="aspectFill"></image>
                                        <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                                            <text class='cuIcon-close'></text>
                                        </view>
                                    </view>
                                    <view class="solids" @tap="ChooseImage">
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
                            
                            <view class="cu-form-group">
                                <view class="title">货品描述</view>
                                <textarea placeholder="货品描述" :fixed="true" v-model="form.product_desc">
                                </textarea>
                            </view>
                            <view class="cu-form-group uni-textarea">
                                <view class="title">备注</view>
                                <textarea placeholder="备注" v-model="form.note">
                                </textarea>
                            </view>
                            
                            <view class="padding flex flex-direction">
                                <button class="cu-btn bg-green lg" @tap="submitForm">确定</button>
                            </view>
                        </form>
                    </view>
				</view>
			</view>
            <AuthCompoents :user_type="auth_type" :auth_modal_show="auth_modal_show" @modalHide2="modalHide2" ></AuthCompoents>
		</view>
	</view>
</template>

<script>
    import api from '@/utils/api'
    import my_global from '@/utils/my_global'
    import AuthCompoents from '@/components/liuhe-cs/auth-components.vue'
	export default {
        components:{
            AuthCompoents
        },
		data() {
			return {
                form: {
                    tracking_no: '',
                    images: [],
                    product_desc:'',
                    receiver_name:'',
                    receiver_mobile:'',
                    to_address:'',
                    to_gps:'',
                    from_address:'',
                    from_gps:'',
                    note: '',
                },
                auth_modal_show: false,
                auth_type: 'consigner'
			};
		},
        props: {
            modal_show: {
            }
        },
        mounted() {
            let self = this
            uni.$on('modalShowComponents',function(data){
                console.log('添加 组件 自定义事件');
                self.modalShow()
            })
        },
        computed: {
            upload_images:function() {
                let images = []
                if (this.form.images.length != 0) {
                    this.form.images.forEach(function (value) {
                        images.push(my_global.storage_fix + value);
                    })
                }
                console.log('images',images)
                return images
            }
        },
		methods: {
            modalHide() {
				this.$emit('modalHide')
			},
            modalHide2 () {
                this.auth_modal_show = false
            },
            modalShow () {
                this.auth_modal_show = true
            },
            RegionChange(e) {
				this.form.region = e.detail.value
			},
            RegionChange2(e) {
            	this.form.region_from = e.detail.value
            },
            ChooseImage() {
                let self = this
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
                        res.tempFilePaths.forEach(function (tmpImg) {
                            console.log(tmpImg)
                            uni.uploadFile({
                                url: my_global.__BASE_URL__+'/api/file', 
                                filePath: tmpImg,
                                name: 'file',
                                formData: {
                                    'floder': 'logistics'
                                },
                                success: (uploadFileRes) => {
                                    console.log(uploadFileRes.data)
                                    self.form.images.push(uploadFileRes.data)
                                    console.log(self.form.images)
                                }
                            })
                        })
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.upload_images,
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
							this.form.images.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
            async submitForm()
            {
                console.log(this.form)
                let submitRes = await api.post('logisticss', this.form)
                if (submitRes.data.data.id != undefined) {
                    uni.showToast({
                        title: '提交成功！',
                        duration: 3000
                    });
                    this.modalHide()
                    uni.navigateTo({ url: '/pages/consigner/index' })
                }
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
                let self = this
                uni.scanCode({
                    success: function (res) {
                        self.form.tracking_no = res.result
                    }
                })
            }
		}
	}
</script>
