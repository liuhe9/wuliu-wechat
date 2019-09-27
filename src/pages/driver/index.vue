<template>
	<view class="page show">
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="item.key==tab_cur?'text-blue cur':''" v-for="(item,index) in tab_data" :key="index" @tap="tabSelect" :data-id="item.key">
				{{item.label}}
			</view>
		</scroll-view>
		<Logistics_list :list_from="list_from" :list_data="list" :list_links="list_links" :list_title="list_title" :list_type="list_type"></Logistics_list>
		<Bar active_bar="3"></Bar>
	</view>
</template>

<script>
	import Logistics_list from '@/components/liuhe-cs/logistics_list.vue'
	import api from '@/utils/api'
	export default {
		components:{
			Logistics_list
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
				list_title: '物流列表',
				list_type: 'logistics',
				list_links: {},
				list_from: 'manager'
			}
		},
		methods: {
            init() {
            	console.log('init')
                this.getList()
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