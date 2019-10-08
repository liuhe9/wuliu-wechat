<template>
	<view v-if="modal_show">
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
                            <input placeholder="发货单号" v-model="form.tracking_no"></input>
                            <text class='cuIcon-scan text-orange' @tap="scanQrcode" data-id="tracking_no"></text>
                        </view>
                        
                        <view class="cu-form-group margin-top bg-gray">
                            <input placeholder="收货人" v-model="form.receiver_name"></input>
                        </view>
                        <view class="cu-form-group bg-gray">
                            <input placeholder="收货人手机" v-model="form.receiver_mobile"></input>
                        </view>
                        <view class="cu-form-group bg-gray">
                            <input type="text" placeholder="选择收货地址坐标" @tap="getGps" data-id="to_gps" disabled="true" v-model="form.to_gps"></input>
                            <text class='cuIcon-locationfill text-orange' @tap="getGps" data-id="to_gps"></text>
                        </view>
                        <view class="cu-form-group bg-gray">
                            <input placeholder="收货地址" v-model="form.to_address"></input>
                        </view>
                        
                        <view class="cu-form-group">
                            <input type="text" placeholder="选择发货地址坐标" @tap="getGps" data-id="from_gps" disabled="true" v-model="form.from_gps"></input>
                            <text class='cuIcon-locationfill text-orange' @tap="getGps" data-id="from_gps"></text>
                        </view>
                        <view class="cu-form-group">
                            <input placeholder="发货地址" v-model="form.from_address"></input>
                        </view>
                        
                        <view class="cu-form-group">
                            <input placeholder="货品描述" v-model="form.product_desc"></input>
                        </view>
                        <view class="cu-form-group ">
                            <input placeholder="备注" v-model="form.note"></input>
                        </view>
                        
                        <view class="cu-bar bg-white">
                            <view class="action">
                                商品图片
                            </view>
                            <view class="action"></view>
                        </view>
                        <view class="cu-form-group">
                            <view class="grid col-4 grid-square flex-sub">
                                <view class="bg-img" v-for="(item,index) in upload_images" :key="index" @tap="viewImage" :data-url="upload_images[index]">
                                <image :src="upload_images[index]" mode="widthFix"></image>
                                    <view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
                                        <text class='cuIcon-close'></text>
                                    </view>
                                </view>
                                <view class="solids" @tap="chooseImage(form.images)">
                                    <text class='cuIcon-cameraadd'></text>
                                </view>
                            </view>
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
            chooseImage(obj) {
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
                                    obj.push(uploadFileRes.data)
                                    console.log(obj)
                                }
                            })
                        })
            		}
            	});
            },
			viewImage(e) {
				uni.previewImage({
					urls: this.upload_images,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
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
