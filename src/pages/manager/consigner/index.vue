<template>
	<view class="page show">
		<List :list_from="list_from" :list_data="list" :list_links="list_links" :list_title="list_title" :list_type="list_type" :list_meta="list_meta" @getList="getList"></List>
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
	import List from '@/components/liuhe-cs/list.vue'
	import api from '@/utils/api'
	export default {
		components:{
			List
		},
		data() {
			return {
				list:[],
				list_title: '客户',
				list_type: 'consigner',
				list_links: {},
				list_from: 'manager',
                list_meta: {},
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async getList() {
				let list = await api.list('consigners');
				this.list = list.data.data;
				this.list_links = list.data.links;
                this.list_meta = list.data.meta;
			}
		}
	}
</script>