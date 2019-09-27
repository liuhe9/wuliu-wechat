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
				list_title: '司机',
				list_type: 'driver',
				list_links: {},
				list_from: 'manager',
                list_meta: {},
			}
		},
		methods: {
            init() {
            	console.log('init')
                this.getList()
            },
			async getList() {
				let list = await api.list('drivers').then((res) => {return res.data});
				console.log(list)
				this.list = list.data;
				this.list_links = list.links;
				this.list_meta = list.meta;
			}
		}
	}
</script>