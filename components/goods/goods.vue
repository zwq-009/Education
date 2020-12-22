<template>
	<view class="container">
		
		
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/swiper1.png" mode="aspectFit"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/swiper1.png" mode="aspectFit"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/swiper1.png" mode="aspectFit"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	
	
		<!-- 课程列表 -->
		<view class="course">
			<view class="course-list">
				<view class="course-list-item" v-for="(son_fl, index) in son_fls" :key="son_fl.id">
					<text>{{son_fl.title}}</text>
				</view>
				<!-- v-if="index >= 6" -->
				<view class="course-list-item" v-if="son_fls.length >= 6">
					<image src="../../static/xiangxia1.png" mode="aspectFit" style="width: 24upx; height: 16upx;"></image>
				</view>
			</view>
			<view class="course-ad">
				<image src="../../static/list-tupian.png" mode="aspectFit"></image>
			</view>
		</view>
		
		
		<!-- 热门推荐 -->
		<view class="hot">
			<view class="hot-top">
				<image src="../../static/rementuijian.png" mode=""></image>
				<view>
					<text>换一批</text>
					<image src="../../static/huanyipi.png" mode=""></image>
				</view>
			</view>
			<view class="hot-bottom">
				<view class="hot-bottom-list" v-for="coursemenu in coursemenus" :key="coursemenu.id"  @click="goCourseDetails(coursemenu.id)">
					<image :src="HOST_URL + coursemenu.thumb" mode=""></image>
					<text>{{coursemenu.menuname}}</text>
				</view>
			</view>
		</view>
		
		
		<!-- 课程推荐 -->
		<view class="kecheng">
			<view class="kecheng-top">
				<image src="../../static/kechengtuijian.png" mode="aspectFit"></image>
				<view>
					<text>换一批</text>
					<image src="../../static/huanyipi.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="kecheng-bottom">
				<view class="kecheng-bottom-list" v-for="coursemenu in coursemenus" :key="coursemenu.id">
					<image :src="HOST_URL + coursemenu.thumb" mode=""></image>
					<text>{{coursemenu.menuname}}</text>
					<view>
						<text>共4课时</text>
						<text>|</text>
						<text>29人已学</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 独家精选 -->
		<view class="exclusive">
			<view class="exclusive-top">
				<image src="../../static/kechengtuijian.png" mode="aspectFit"></image>
				<view>
					<text>换一批</text>
					<image src="../../static/huanyipi.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="exclusive-bottom">
				<view class="exclusive-bottom-list" v-for="coursemenu in coursemenus" :key="coursemenu.id">
					<image class="img" :src="HOST_URL + coursemenu.thumb" mode=""></image>
					<view class="span">
						<text>{{coursemenu.menuname}}</text>
						<view>
							<image src="../../static/touxiangnvhai.png" mode=""></image>
							<text>惠说英文</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {HOST_URL} from '@/request/request'
	export default{
		data() {
			return{
				HOST_URL
			}
		},
		props: {
			coursemenus: {
				type: Array
			},
			son_fls: {
				type: Array
			}
		},
			
		
		onLoad() {
			
		},
		methods:{
			goCourseDetails (id) {
				// console.log(this.coursemenus, this.son_fls)
				uni.navigateTo({
					url: `/pages/course-details/course-details?menuid=${id}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: #f6f6f6;
	}
	// 头部 
	.header {
		height: 90upx;
		background-color: #4b89ff;
		padding: 0 20upx;
		&-input {
			position: relative;
			display: flex;
			text {
				font-size: 31upx;
				color: #fff;
				margin-top: 10upx;
			}
			image {
				width: 25upx;
				height: 14upx;
				margin: 25upx 20upx 0 10upx;
			}
			input {
				width: 710upx;
				height: 63upx;
				border: 0;
				background-color: #fff;
				border-radius: 63upx;
				font-size: 24upx;
				padding-left: 20upx;
				box-sizing: border-box;
			}
			.goods-search {
				width: 28upx;
				height: 28upx;
				position: absolute;
				right: 10upx;
				top: -5upx;
			}
		}
	}
	
	// 轮播图
	.swiper-course {
		height: 262upx;
		background-color: #4b89ff;
		border-bottom: 96upx solid #fff;
		box-sizing: border-box;
		swiper {
			width: 709upx;
			height: 262upx;
			margin: 0 auto;
			border-radius: 20upx;
			overflow: hidden;
			swiper-item {
				view {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	// 课程列表
	.course {
		margin-top: 0;
		&-list {
			// height: 200upx;
			padding-top: 40upx;
			// box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			&-item {
				width: 169upx;
				height: 48upx;
				border-radius: 48upx;
				background-color: #fff;
				font-size: 24upx;
				margin-bottom: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		&-ad {
			height: 147upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	// 热门推荐
	.hot {
		width: 710upx;
		// height: 666upx;
		margin: 20upx 20upx 0 20upx;
		padding: 40upx 25upx 0 25upx;
		background-color: #fff;
		border-radius: 20upx;
		box-sizing: border-box;
		&-top {
			display: flex;
			justify-content: space-between;
			image {
				width: 134upx;
				height: 30upx;
			}
			view {
				display: flex;
				text {
					font-size: 24upx;
					color: #787878;
				}
				image {
					width: 28upx;
					height: 26upx;
					margin: 4upx 0 0 10upx;
				}
			}
		}
		&-bottom {
			margin-top: 30upx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			&-list {
				width: 210upx;
				height: 272upx;
				display: flex;
				flex-direction: column;
				image {
					width: 100%;
					height: 196upx;
					border-radius: 20upx;
				}
				text {
					font-size: 26upx;
					margin-top: 20upx;
					color: #373737;
				}
			}
		}
	}
	
	
	// 课程推荐
	.kecheng {
		// height: 800upx;
		padding: 0 20upx;
		margin-top: 50upx;
		&-top {
			display: flex;
			justify-content: space-between;
			image {
				width: 134upx;
				height: 30upx;
			}
			view {
				display: flex;
				text {
					font-size: 24upx;
					color: #787878;
				}
				image {
					width: 28upx;
					height: 26upx;
					margin: 4upx 0 0 10upx;
				}
			}
		}
		&-bottom {
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			&-list {
				width: 346upx;
				height: 314upx;
				background-color: #fff;
				border-radius: 20upx;
				margin-bottom: 44upx;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				image {
					width: 346upx;
					height: 186upx;
				}
				text {
					font-size: 28upx;
					font-weight: 700;
					color: #191919;
					margin: 20upx 0;
					margin-left: 10upx;
				}
				view {
					margin-left: 10upx;
					display: flex;
					text {
						margin: 0;
						color: #8b8b8b;
						font-size: 24upx;
						font-weight: 400;
					}
					text:nth-child(2) {
						margin: 0 20upx;
					}
				}
			}
		}
	}


	// 独家精选
	.exclusive {
		// height: 1340upx;
		padding: 0 20upx;
		&-top {
			display: flex;
			justify-content: space-between;
			image {
				width: 134upx;
				height: 30upx;
			}
			view {
				display: flex;
				text {
					font-size: 24upx;
					color: #787878;
				}
				image {
					width: 28upx;
					height: 26upx;
					margin: 4upx 0 0 10upx;
				}
			}
		}
		&-bottom {
			margin-top: 30upx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			&-list {
				width: 710upx;
				height: 230upx;
				background-color: #fff;
				border-radius: 20upx;
				margin-bottom: 24upx;
				display: flex;
				.img {
					width: 189upx;
					height: 181upx;
					margin: 24upx 45upx 0 20upx;
					margin-top: 24upx;
					margin-left: 20upx;
					border-radius: 10upx;
				}
				.span {
					width: 420upx;
					margin-top: 50upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text {
						font-size: 30upx;
						font-weight: 700;
						color: #191919;
					}
					view {
						margin-top: 18upx;
						margin-bottom: 44upx;
						image {
							width: 38upx;
							height: 38upx;
							vertical-align: middle;
						}
						text {
							font-size: 25upx;
							color: #7e7e7e;
							font-weight: 400;
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
</style>
