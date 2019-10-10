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
            <LogisticsList :list_from="list_from" :list_data="list" :list_title="list_title" :list_type="list_type" :list_meta="list_meta" :list_page="list_page" @getList="getList"></LogisticsList>
            <view class="gps-button" v-if="gps_button_show"><button open-type="openSetting" @opensetting="openSettings"><view class="bg-green cuIcon-location"></view></button></view>
        </view>
        
        <Binding :user_type="auth_type" :modal_show="modal_show" @modalHide="modalHide" @init="init"></Binding>
		<Auth :user_type="auth_type" :auth_modal_show="auth_modal_show" @modalHide="modalHide" @init="init"></Auth>
        <Bar active_bar="3"></Bar>
	</view>
</template>

<script>
    import api from '@/utils/api'
	import LogisticsList from '@/components/liuhe-cs/logistics-list.vue'
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
				list_type: 'driver/logistics',
				list_from: 'driver',
				list_meta: {},
                page_show: false,
                modal_show: false,
                auth_modal_show: false,
                auth_type: 'driver',
                list_navs:[],
                tab_cur: -1,
                gps_button_show: false
			}
		},
		methods: {
            async init() {
                let self = this
                console.log('init')
                let auth_res = await this.checkApiAuth()
                this.page_show = auth_res
                if (auth_res == false) {
                    this.modal_show = 'show'
                } else {
                    this.initNav()
                    this.getList()
                    
                    uni.getSetting({
                       success(res) {
                          if(res.authSetting['scope.userLocationBackground'] == false || res.authSetting['scope.userLocationBackground'] == undefined) {
                              self.gps_button_show = true
                          } else {
                              self.gpsSaveBackground()
                          }
                       }
                    })
                }
            },
			tabSelect(e) {
				this.tab_cur = e.currentTarget.dataset.id;
				this.getList()
			},
			openSettings(e) {
                if (e.target.authSetting['scope.userLocationBackground'] == false || e.target.authSetting['scope.userLocationBackground'] == undefined) {
                    showModal('位置信息设置错误','设置=>位置信息,需选择"使用小程序和离开小程序后"选项，才可持续定位')
                } else {
                    this.gpsSaveBackground()
                }
                
			}
		}
	}
</script>
<style>
    .gps-button{
        width: 100px;height: 100px;
        background:linear-gradient(to bottom, #39b54a,#39b54a);
        border-radius: 50%;
        box-shadow: 0 0 15px ##39b54a;
        color: #fff;
        font-size: 60px;
        display: flex;justify-content: center;align-items: center;
        position: fixed !important;
        left: 230px;
        top: 300px;
    }
    .gps-button button{
        font-size:50px;
        background: #39b54a;
        line-height:1!important;
    }
    .gps-button button::after{
        border: 0!important;
    }
</style>