/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		
		<view class="tutor-title">
			<image src="../../static/jiangshi.png" mode=""></image>
			<text>导师团队</text>
		</view>
		
		
		<view class="tutor-list">
			<view @click="goTutorIntroduced('tutor-introduced', item.id)" class="tutor-list-item" v-for="item in tutorList" :key="item.id">
				<image :src="HOST_URL + item.img" mode="aspectFit"></image>
				<text>{{item.imgname}}</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {getTutorList} from '@/request/tutor.js'
	import {HOST_URL} from '@/request/request.js'
	export default {
		data() {
			return {
				tutorList: [],
				HOST_URL
			};
		},
		onShareAppMessage(res) {
			let path = getCurrentPages()
			let path_share = path[0].$page.fullPath
			let path_title = path[0].data.title
			let userinfo = uni.getStorageSync('userinfo')
			let base_set = uni.getStorageSync('base_set')
			if(userinfo.uid=='' || !userinfo.uid){
				uni.navigateTo({
					url:'../login/login'
				})
				return {
					title: '请先登录后再分享给好友',
					path: ''
				}
			}else{
				if (res.from === 'button') {
					
				}
				return {
					title: base_set.title,
					path: `${path_share}?pid=${userinfo.uid}`
				}
			}
		},
		onLoad() {
			getTutorList().then(res => {
				console.log(res)
				this.tutorList = res.data.data.teachers
			})
		},
		methods: {
			goTutorIntroduced(e, id) {
				uni.navigateTo({
					url: `/pages/${e}/${e}?tid=${id}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	background-color: #f5f5f5;
	padding: 0 30upx;
}
.tutor-title {
	display: flex;
	align-items: center;
	padding-top: 50upx;
	image {
		width: 40upx;
		height: 40upx;
	}
	text {
		font-size: 32upx;
		font-weight: 700;
		color: #333;
		margin-left: 10upx;
	}
}

.tutor-list {
	margin-top: 30upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	&-item {
		width: 335upx;
		height: 460upx;
		background-color: #fff;
		margin-bottom: 20upx;
		display: flex;
		flex-direction: column;
		image {
			width: 335upx;
			height: 400upx;
		}
		text {
			height: 60upx;
			font-size: 30upx;
			color: #fff;
			background-color: #009688;
			text-align: center;
			line-height: 56upx;
			border-top: 4upx solid #fff;
			box-sizing: border-box;
		}
		
	}
}
</style>
