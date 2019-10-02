<template>
	<view>
		<view class="cu-bar bg-white margin-top solid-bottom" v-if="list_from == 'manager'">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>{{list_title}}<view class="cu-tag round bg-gray">{{list_meta.total}}</view>
			</view>
			<view class="flex solid-bottom padding justify-start" @tap="addOne">
				<button class="cu-btn block bg-green">
					<text class="cuIcon-add"></text> 添加
				</button>
			</view>
		</view>
		<view v-if="list_data.length != 0">
			<view v-for="item in list_data" :key="item.id" class="cu-list menu-avatar comment solids-top">
				<view class="cu-item">
					<view class="cu-avatar round" :style="'background-image:url('+item.avatar+')'"></view>
					<view class="content">
						<view class="text-gray"> {{item.nickname}}</view>
						<view class="text-gray text-content text-df">
							
							
						</view>
                        
                        <view class="flex solid-bottom margin-top-df padding-top-df justify-between">
                            <view class="padding-xs margin-xs">
                                {{item.name}}
                                <view class="cu-capsule radius"  @tap="makePhoneCall(item.mobile)">
                                	<view class="cu-tag bg-gray">
                                		<text class="cuIcon-mobile"></text>
                                	</view>
                                	<view class="cu-tag line-gray">
                                		{{item.mobile}}
                                	</view>
                                </view>
                            </view>
                            <view class="padding-xs margin-xs" >
                                <view v-if="item.openid == ''" class="cu-tag bg-yellow radius">
                                	未绑定
                                </view>
                            </view>
                        </view>
						<view v-if="item.id_card !=undefined" class="padding-sm radius margin-top-sm ">
							<view class="flex">
							<view class="flex-sub"><text class="cuIcon-card"></text>{{item.id_card}} </view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-start">
							<button class="cu-btn block bg-cyan" @tap="edit(item)">
								<text class="cuIcon-write"></text> 编辑
							</button>
							<button v-if="item.openid != ''" class="cu-btn block red margin-left-sm" @tap="unbinding(item.id)">
								<text class="cuIcon-unlock"></text> 解绑
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar justify-center" v-if="list_data.length == 0">
			<view class="cu-item">
				<view class="content ">
					<view class="text-gray">暂无数据</view>
				</view>
			</view>
		</view>
        <view class="bg-white margin-top solid-bottom" v-if="list_meta.total != undefined && list_meta.total != 0">
            <UniPagination :current="list_meta.current_page" :total="list_meta.total" :pageSize="list_meta.per_page" @change="getList"></UniPagination>
        </view>
        <view class="padding-bottom-xl margin-bottom-xl">
        </view>
            
        <AddEdit :resources="list_type+'s'" :modal_show="modal_show" :form="form" :title="list_title" @modalHide="modalHide" @getList="getList"></AddEdit>
	</view>
</template>

<script>
    import AddEdit from '@/components/liuhe-cs/add-edit'
    import UniPagination from "@/components/uni-ui/uni-pagination/uni-pagination.vue"
	export default {
        components:{
            AddEdit,
            UniPagination
        },
		data() {
			return {
                form:{
                    name:'',
                    mobile:'',
                    password:'',
                    id_card:'',
                    keys: []
                },
                modal_show:false
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
            addOne() {
                this.form.id = 0
                this.form.name = ''
                this.form.mobile = ''
                this.form.password = ''
                this.form.id_card = ''
                this.form.keys = this.getKeys()
                this.modal_show = 'show'
            },
            edit(item) {
                this.form = item
                this.form.keys = this.getKeys()
                console.log(this.form)
                this.modal_show = 'show'
            },
            async getList(e) {
                this.$emit('getList', {page:e.current})
                this.modal_show = false
            },
            getKeys() {
                let keys = {
                    manager: ['name', 'mobile', 'password'],
                    driver: ['name', 'mobile', 'id_card'],
                    consigner: ['name', 'mobile']
                }
                return keys[this.list_type]
            },
            unbinding(id) {
                this.$emit('unbinding', {id:id,user_type:this.list_type})
            }
        }
	}
</script>
