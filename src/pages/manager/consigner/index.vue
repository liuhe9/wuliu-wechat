<template>
	<view class="page show">
        <view v-if="page_show">
		<List :list_from="list_from" :list_data="list" :list_links="list_links" :list_title="list_title" :list_type="list_type" :list_meta="list_meta" @getList="getList" @unbinding="unbinding"></List>
        </view>
        <Binding :user_type="auth_type" :modal_show="modal_show" @modalHide="modalHide" @init="init"></Binding>
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
	import List from '@/components/liuhe-cs/list.vue'
	import api from '@/utils/api'
	import Binding from "@/components/liuhe-cs/binding.vue"
	export default {
	    components:{
	        Binding,
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
		}
	}
</script>