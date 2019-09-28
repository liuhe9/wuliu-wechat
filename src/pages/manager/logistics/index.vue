<template>
	<view class="page show">
        <view v-if="page_show">
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="item.key==tab_cur?'text-blue cur':''" v-for="(item,index) in tab_data" :key="index" @tap="tabSelect" :data-id="item.key">
				{{item.label}}
			</view>
		</scroll-view>
		<LogisticsList :list_from="list_from" :list_data="list" :list_links="list_links" :list_title="list_title" :list_type="list_type"></LogisticsList>
        </view>
        <Binding :user_type="auth_type" :modal_show="modal_show" @modalHide="modalHide" @init="init"></Binding>
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
	import LogisticsList from '@/components/liuhe-cs/logistics-list.vue'
	import api from '@/utils/api'
	import Binding from "@/components/liuhe-cs/binding.vue"
	export default {
	    components:{
	        Binding,
			LogisticsList
		},
		data() {
			return {
				tab_data:[
					{'label' : '发货填单', 'key':0},
					{'label' : '已确认', 'key':1},
					{'label' : '运输中', 'key':2},
					{'label' : '已到达', 'key':3},
					{'label' : '已完成', 'key':4},
				],
				tab_cur: 0,
				list:[],
				list_title: '物流',
				list_type: 'logistics',
				list_links: {},
				list_from: 'manager',
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
			async getList() {
				let list = await api.list('logisticses').then((res) => {return res.data});
				console.log(list)
				this.list = list.data;
				this.list_links = list.links;
				this.list_meta = list.meta;
			},
			tabSelect(e) {
				this.tab_cur = e.currentTarget.dataset.id;
			},
		}
	}
</script>