<template>
	<view>
		<view class="cu-modal" :class="[modal_show ?'show':'']">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
		            <view class="content">添加{{title}}</view>
		                <view class="action" @tap="modalHide">
		                    <text class="cuIcon-close text-red"></text>
		                </view>
		            </view>
		            <view class="padding-sm">
		                <form>
		                    <view class="cu-form-group">
		                        <view class="title">姓名</view>
		                        <input placeholder="姓名" v-model="form.name"></input>
		                    </view>
		                    <view class="cu-form-group">
		                        <view class="title">手机</view>
		                        <input placeholder="手机" v-model="form.mobile"></input>
		                    </view>
		                    <view class="cu-form-group" v-if="form.keys.includes('id_card')">
		                        <view class="title">身份证</view>
		                        <input placeholder="身份证" v-model="form.id_card"></input>
		                    </view>
		                    <view class="cu-form-group" v-if="form.keys.includes('password') && (form.id == false || form.id == undefined)">
		                        <view class="title">密码</view>
		                        <input placeholder="密码" v-model="form.password"></input>
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
				
			}
		},
        props:{
            modal_show:{
                
            },
            title:{
                dataType: {
                    type: String,
                }
            },
            form: {
                
            },
            resources:{
                
            }
        },
		methods: {
			modalHide() {
                this.$emit('modalHide')
            },
            async submitForm() {
                if (this.form.id != false && this.form.id != undefined) {
                    let res = await api.put('/api/'+this.resources+'/'+this.form.id, this.form)
                } else {
                    let res = await api.post('/api/'+this.resources, this.form)
                }
                
                this.$emit('getList')
            },
		}
	}
</script>

<style>

</style>
