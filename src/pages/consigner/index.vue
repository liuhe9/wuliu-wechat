<template>
	<view class="page show">
        <view v-if="page_show">
		<scroll-view scroll-x="true" class="bg-white nav text-center">
		    <view class="cu-item" :class="-1 == tab_cur?'text-blue cur':''" @tap="tabSelect" data-id="-1">
		    	全部
		    </view>
			<view class="cu-item" :class="item.code == tab_cur?'text-blue cur':''" v-for="(item,index) in list_navs" :key="index" @tap="tabSelect" :data-id="item.code">
				{{item.name}}
			</view>
		</scroll-view>
		<LogisticsList :list_from="list_from" :list_data="list" :list_links="list_links" :list_title="list_title" :list_type="list_type" :list_meta="list_meta" @getList="getList"></LogisticsList>
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
                list_search: {
                    page: 1,
                    status: -1
                },
				list:[],
				list_title: '物流列表',
				list_type: 'consigner/logistics',
				list_links: {},
				list_from: 'consigner',
				list_meta: {},
                page_show: false,
                modal_show: false,
                auth_modal_show: false,
                auth_type: 'consigner',
                list_navs:[],
                tab_cur: -1
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
                    this.initNav()
                    this.getList()
                }
            },
			tabSelect(e) {
				this.tab_cur = e.currentTarget.dataset.id;
				this.getList()
			},
		}
	}
</script>