<template>
	<view class="content">
        <view v-if="page_show">
		<form>
			<view class="cu-bar bg-white">
			    <view class="action">
			        公司图片
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
        <Binding :user_type="auth_type" :modal_show="modal_show" @modalHide="modalHide" @init="init"></Binding>
        <Auth :user_type="auth_type" :auth_modal_show="auth_modal_show" @modalHide="modalHide" @init="init"></Auth>
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
    import api from '@/utils/api'
    import my_global from '@/utils/my_global'
    import Binding from "@/components/liuhe-cs/binding.vue"
    import Auth from "@/components/liuhe-cs/auth.vue"
	export default {
	    components:{
	        Binding,
            Auth
        },
		data() {
			return {
				form: {
                    id:0,
                    images: [],
                },
                page_show: false,
                modal_show: false,
                auth_type: 'manager',
			}
		},
        computed: {
            upload_images:function() {
                let images = []
                if (this.form.images.length != 0) {
                    console.log('company_images', this.form.images)
                    this.form.images.forEach(function (value) {
                        images.push(my_global.storage_fix + value);
                    })
                }
                console.log('images',images)
                return images
            }
        },
		methods: {
            async init() {
                console.log('init')
                let auth_res = await this.checkApiAuth()
                this.page_show = auth_res
                if (auth_res == false) {
                    this.modal_show = 'show'
                } else {
                    this.getCompanyInfo()
                }
            },
            getCompanyInfo() {
                uni.showLoading({
                    title: '加载中'
                });
                api.get('companies').then((res) => {
                    console.log(res)
                    this.form.images = res.data.images == null ? [] : JSON.parse(res.data.images)
                    this.form.id     = res.data.id
                });
                uni.hideLoading() 
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
                let submitRes = await api.put('companies', this.form.id, this.form)
                if (submitRes.data.id != undefined) {
                    uni.showToast({
                        title: '提交成功！',
                        duration: 3000
                    });
                }
            },
		}
	}
</script>