<template>
	<view @touchstart="drag_start" @touchmove="drag_hmove" @tap="clickButton">
		<view  	:class="['ball', colse ? 'hide':'']" :style="'left:'+moveX+'px;top :'+moveY+'px;'"	><view :class="[icon]"> </view></view>
		<view 	:class="['ball',!colse ? 'hide':'']" :style="'left:'+x+'px;top :'+y+'px;'"			><view :class="[icon]"> </view></view>
	</view>
</template>

<script>
	export default {
		props: {
			x: {
				type: String
			},
			y: {
				type: String
			},
            icon: {
            	type: String
            }
		},
		data() {
			return {
				start:[0,0],
				moveY:0,
				moveX:0,
				colse:true
			}
		},
		methods: {
			drag_start(event){
				this.start[0]= event.touches[0].clientX-event.target.offsetLeft;
				this.start[1]= event.touches[0].clientY-event.target.offsetTop;
			},
			drag_hmove(event){
					let	 tag 	 = event.touches;
					this.moveX	 = tag[0].clientX-this.start[0];
					this.moveY	 = tag[0].clientY-this.start[1];
					this.colse ? this.colse = false : this.colse;
			},
            clickButton() {
                this.$emit('clickButton')
            }
		}}
</script>

<style>
	.ball{
		width: 70px;height: 70px;
		background:linear-gradient(to bottom, #39b54a,#39b54a);
		border-radius: 50%;
		box-shadow: 0 0 15upx ##39b54a;
		color: #fff;
		font-size: 30px;
		display: flex;justify-content: center;align-items: center;
		position: fixed !important;
	}
	.hide{
		display: none;
	}
</style>
