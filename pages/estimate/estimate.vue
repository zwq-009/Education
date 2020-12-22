/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		<textarea v-model="content" placeholder="说点什么..." />
		
		<view class="floor">
			<text @click="postCourseComment">提交评价</text>
		</view>
	</view>
</template>

<script>
	import { postCourseComment } from '@/request/courses.js'
	export default {
		data() {
			return {
				content: '',
				menuid: '',
				media: ''
			};
		},
		onLoad(option) {
			this.menuid = option.menuid
			this.media = option.media
		},
		methods: {
			postCourseComment() {
				let userinfo = uni.getStorageSync('userinfo')
				postCourseComment({uid: userinfo.uid, menuid: this.menuid, media: this.media, comment: this.content}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="less" scoped>

.container {
	padding: 30upx 30upx 0;
}

textarea {
	width: 100%;
	height: 500upx;
	border-radius: 20upx;
	background-color: #fff;
	font-size: 30upx;
	color: #333;
	padding: 30upx;
	box-sizing: border-box;
}

.floor {
	width: 100%;
	height: 120upx;
	background-color: #fff;
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	text {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 90upx;
		background-color: #4b89ff;
		border-radius: 50upx;
		font-size: 34upx;
		color: #fff;
	}
}


</style>
