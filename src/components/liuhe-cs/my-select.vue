<template>
	<view>
        <view class="cu-modal" :class="[select_modal ?'show':'']">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
                    <view class="content">{{select_title}}</view>
                        <view class="action" @tap="selectModalHide">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view>
                       <checkbox-group class="block" @change="checkboxChange">
                            <view class="cu-form-group" v-for="(item, idx) in select_list">
                                <view class="title">{{item.name +'-'+ item.mobile}}</view>
                                <checkbox :class="item.checked?'checked':''" :checked="item.checked?true:false" :value="item.id"></checkbox>
                            </view>
                        </checkbox-group>
                    </view>
                    <view class="margin-xs">
                        <button class="cu-btn block bg-green" @tap="confirmSelectedList">
                            <text class="cuIcon-check"></text> 确定
                        </button>
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
                tmp_selected_list:[]
			}
		},
		props:{
            select_title: {
            },
		    select_list: {
		    },
            select_modal: {
            },
            selected_list: {

            }
		},
        watch: {
            selected_list(){
                this.tmp_selected_list = this.selected_list
            }
        },
		methods:{
		    selectModalHide() {
				this.$emit('selectModalHide')
			},
            checkboxChange(e) {
                if (e.detail.value.length == 0) {
                    uni.showToast({
                        icon: 'none',
                        title: '请至少选择一项',
                        duration: 3000
                    });
                } else {
                    this.tmp_selected_list = e.detail.value
                }
            },
            confirmSelectedList() {
                console.log(this.tmp_selected_list)
                this.$emit('confirmSelectedList', {selected_list: this.tmp_selected_list})
            }
        }
	}
</script>