<script>
	export default {
        globalData: {
            options: {}
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
    
    .my_image{
        display: block;
        margin: auto;
        width: 100%;
    }
</style>
