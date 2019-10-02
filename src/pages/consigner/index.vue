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
		<Auth :user_type="auth_type" :auth_modal_show="auth_modal_show" @modalHide="modalHide" @init="init"></Auth>
        <Bar active_bar="2"></Bar>
	</view>
</template>

<script>
	import LogisticsList from '@/components/liuhe-cs/logistics-list.vue'
	import api from '@/utils/api'
	import Binding from "@/components/liuhe-cs/binding.vue"
	import Auth from "@/components/liuhe-cs/auth.vue"
	export default {
	    components:{
	        Binding,
	        Auth,
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
				list_title: '物流列表',
				list_type: 'consigner/logistics',
				list_links: {},
				list_from: 'consigner',
                page_show: false,
                modal_show: false,
                auth_modal_show: false,
                auth_type: 'consigner',
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
			},
		}
	}
</script>