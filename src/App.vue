<script>
	export default {
		globalData: {
			__base_url__: (process.env.NODE_ENV === 'development') ? 'http://localhost:8084' : 'https://shnh.s666666.cn'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/static/colorui/main.css";
	@import "/static/colorui/icon.css";
</style>
