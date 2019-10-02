<template>
	<view>
        <view class="cu-modal" :class="[modal_show ?'show':'']">
        	<view class="cu-dialog">
        		<view class="cu-bar bg-white justify-end">
                    <view class="content">选择司机</view>
                        <view class="action" @tap="selectModalHide">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding flex flex-direction" v-if="modal_show">
                        <view class="uni-list">
                            <checkbox-group @change="checkboxChange">
                                <label class="uni-list-cell uni-list-cell-pd" v-for="item in formatList" :key="item.id">
                                    <view>
                                        <checkbox :value="item.id" :checked="item.checked" />
                                    </view>
                                    <view>{{item.name}}</view>
                                </label>
                            </checkbox-group>
                        </view>
                    </view>
                </view>
        	</view>
        </view>
	</view>
</template>

<script>
    import api from '@/utils/api'
    import my_global from '@/utils/my_global'
	export default {
		data() {
			return {
				
			}
		},
		props:{
		    list_data: {
		    
		    },
            select_type: {
                
            },
            modal_show: {
                
            }
		},
        computed:{
            formatList() {
                let format_list = []
                if (this.list_data.length != 0) {
                    this.list_data.forEach(function(value, idx){
                        format_list.push({
                            'id': value.id,
                            'name': value.name,
                            'checked': false
                        })
                    })
                }
                
                return format_list;
            }
        },
		methods:{
		    selectModalHide() {
				this.$emit('selectModalHide')
			},
        }
	}
</script>