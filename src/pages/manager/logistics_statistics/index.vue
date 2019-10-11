<template>
	<view>
        <view v-if="page_show">
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="item.key==tab_cur?'text-blue cur':''" v-for="(item,index) in tab_data" :key="index" @tap="tabSelect" :data-id="item.key">
				{{item.label}}
			</view>
		</scroll-view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="item in list">
				<view class="content">
					<text class="text-grey">{{item.date}}</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">{{item.total}}</view>
				</view>
			</view>
		</view>
        <view class="bg-white margin-top margin-bottom-xl" v-if="list_meta.total != undefined && list_meta.total != 0">
            <uniPagination :current="list_meta.current_page" :total="list_meta.total" :pageSize="list_meta.per_page" @change="getList"></uniPagination>
        </view>
        
        <view class="cu-list menu-avatar justify-center" v-if="list.length == 0">
        	<view class="cu-item">
        		<view class="content ">
        			<view class="text-grey">暂无数据</view>
        		</view>
        	</view>
        </view>
        <view class="bg-white margin-top padding-bottom-xl margin-bottom-xl"> </view>
		<Binding :user_type="auth_type" :modal_show="modal_show" @modalHide="modalHide" @init="init"></Binding>
		<Auth :user_type="auth_type" :auth_modal_show="auth_modal_show" @modalHide="modalHide" @init="init"></Auth>
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
    import api from '@/utils/api'
	import Binding from "@/components/liuhe-cs/binding.vue"
    import Auth from "@/components/liuhe-cs/auth.vue"
    import uniPagination from "@/components/uni-ui/uni-pagination/uni-pagination.vue"
	export default {
	    components:{
	        Binding,
            Auth,
            uniPagination
        },
		data() {
			return {
                list_search: {
                    page: 1,
                    type: 'day'
                },
                list:[],
                list_title: '管理员',
                list_type: 'logistics/statistics',
                list_from: 'manager',
                list_meta: {},
				tab_data:[
                    {'label' : '按日', 'key':'day'},
					{'label' : '按月', 'key':'month'},
				],
				tab_cur: 'day',
                page_show: false,
                modal_show: false,
                auth_type: 'manager',
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
                    this.getList()
                }
            },
			tabSelect(e) {
				this.tab_cur = e.currentTarget.dataset.id;
                this.list_search.type = this.tab_cur
                this.getList()
			}
		}
	}
</script>