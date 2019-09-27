<template>
	<view>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="item.key==tab_cur?'text-blue cur':''" v-for="(item,index) in tab_data" :key="index" @tap="tabSelect" :data-id="item.key">
				{{item.label}}
			</view>
		</scroll-view>
		<view class="cu-list menu">
			<view class="cu-item" v-for="item in list_data">
				<view class="content">
					<text class="text-grey">{{item.date}}</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">{{item.total}}</view>
				</view>
			</view>
		</view>
		<Bar active_bar="1"></Bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list_data:[
					{'date' : '09-18', 'total':100},{'date' : '09-17', 'total':150},{'date' : '09-16', 'total':200},
					{'date' : '09-15', 'total':100},{'date' : '09-14', 'total':150},{'date' : '09-13', 'total':200},
					{'date' : '09-12', 'total':100},{'date' : '09-11', 'total':150},{'date' : '09-10', 'total':200},
					{'date' : '09-09', 'total':100},{'date' : '09-08', 'total':150},{'date' : '09-07', 'total':200},
					{'date' : '09-06', 'total':100},{'date' : '09-05', 'total':150},{'date' : '09-04', 'total':200},
					{'date' : '09-03', 'total':100},{'date' : '09-02', 'total':150},{'date' : '09-01', 'total':200},
				],
				tab_data:[
					{'label' : '按月', 'key':'month'},
					{'label' : '按日', 'key':'day'},
				],
				tab_cur: 'month',
			}
		},
		methods: {
            init() {
            	console.log('init')
            },
			tabSelect(e) {
				this.tab_cur = e.currentTarget.dataset.id;
			}
		}
	}
</script>