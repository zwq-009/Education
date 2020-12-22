/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		
		<view class="tutor">
			<!-- 导师title -->
			<view class="tutor-title">
				<view class="tutor-title-item" v-for="(item, index) in kechengList" :key="index">
					<view @click="tutorchange(index)" :class="{btna:btnnum == index}">{{item}}</view>
					<text :class="{_underline: btnnum == index}"></text>
				</view>
			</view>
			
			
			<!-- 导师内容 -->
			<view class="tutor-content">
				<!-- 导师介绍 -->
				<view class="dsjs" :class="{dis:btnnum == 0}">
					<u-parse :content="tinfo.introduce"></u-parse>
				</view>
				
				<!-- 作品-->
				<view class="works" :class="{dis:btnnum == 1}">
					<view class="works-list" v-for="(item, index) in worksList" :key="index" @click="goCourseDetails (item.id)">
						<view class="works-list-left">
							<text>{{item.menuname}}</text>
							<text>{{item.jianjie}}</text>
							<view class="keshi">
								<image src="../../static/book.png" mode="aspectFit"></image>
								<text>{{item.ksnum}}课时</text>
							</view>
						</view>
						<image class="works-list-right" :src="HOST_URL+item.thumb" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {postTutorDetail} from '@/request/tutor.js'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				HOST_URL:uni.HOST_URL,
				kechengList: ['讲师介绍', '作品'],
				btnnum: 1,
				worksList: [],
				tinfo:{}
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
		onLoad(option) {
			postTutorDetail({tid: option.tid}).then(res => {
				console.log(res.data)
				this.worksList=res.data.data.courses
				this.tinfo=res.data.data.teacher
			})
		},
		methods: {
			tutorchange(e) {
				this.btnnum = e
			},
			// 去课程详情页面
			goCourseDetails (id) {
				uni.navigateTo({
					url: `/pages/course-details/course-details?menuid=${id}`
				})
			},
		}
	}
</script>

<style lang="less" scoped>
// 课程部分
.tutor {
	&-title{
		height: 125upx;
		background-color: #fff;
		padding-top: 45upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		&-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			view {
			font-size: 30upx;
			color: #575757;
			}
			.btna { // 需要追加到view上的class
				font-weight: 700;
				color: #131313;
			}
			._underline { // 需要追加到view下方的下划线class
				width: 70upx;
				height: 7upx;
				background-color: #2f77ff;
				border-radius: 5upx;
				margin-top: 15upx;
			}
		}
		
	}
	
	&-content {
		// 讲师介绍
		.dsjs {
			display: none;
			padding: 20upx;
			margin-top: 20upx;
			border-top: 2upx solid #ddd;
			border-bottom: 2upx solid #ddd;
			text {
				font-size: 32upx;
				color: #333;
				letter-spacing: 4upx;
				}
		}
		
		// 作品
		.works {
			display: none;
			padding: 0 20upx;
			&-list {
				height: 200upx;
				padding: 0 30upx;
				margin-top: 10upx;
				box-sizing: border-box;
				border-radius: 10upx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-left {
					display: flex;
					flex-direction: column;
					text:nth-child(1) {
						font-size: 32upx;
						font-weight: 700;
						color: #333;
					}
					text:nth-child(2) {
						font-size: 28upx;
						color: #8d8d8d;
						margin-top: 6upx;
					}
					.keshi {
						margin-top: 10upx;
						display: flex;
						align-items: center;
						image {
							width: 34upx;
							height: 34upx;
						}
						text {
							font-size: 28upx;
							color: #8d8d8d;
							margin-left: 10upx;
						}
					}
				}
				&-right {
					width: 250upx;
					height: 150upx;
				}
			}
		}
		
		.dis{
			display: block;
		}
	}
}
</style>
