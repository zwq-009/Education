/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		<view class="search">
			<view class="search-input">
				<input v-model="keyword" type="text" placeholder="请输入搜索内容" />
				<image @click="postSearchCourse" class="goods-search" src="../../static/search.png" mode="aspectFit"></image>
			</view>
		</view>
		
		
		<view class="scroll">
			<scroll-view class="scroll-left" scroll-y="true" >
				<view @click="postSonflData(item.id, index)" :class="{active: activeIndex === index}" v-for="(item, index) in classifyList" :key="index">{{item.title}}</view>
			</scroll-view>
			<scroll-view class="scroll-right" scroll-y="true" >
				<view class="item" v-for="item in son_fls" :key="item.id" @click="navigate(item.id)">
					<text>{{item.title}}</text>
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import { postClassifylist, postSonflData } from '@/request/index'
	import {postSearchCourse} from '@/request/search'
	export default {
		data() {
			return {
				keyword: '',
				activeIndex: 0,
				classifyList: [],
				flid: '', // 这个变量用来传值
				son_fls: [],
				goodstype: ''
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
			this.goodstype = option.goodstype
			this.postClassifylist(option.goodstype)
		},
		methods: {
			// 获取分类列表
			postClassifylist(goodstype) {
				postClassifylist({goodstype: goodstype}).then(res => {
					this.classifyList = res.data.data
					this.postSonflData(this.classifyList[0].id, 0)
				})
			},
			// 获取子分类列表
			postSonflData(id, key) {
				this.activeIndex = key
				this.flid = this.classifyList[key].id
				postSonflData({goodstype: this.goodstype, flid: id}).then(res => {
					this.son_fls = res.data.data
				})
			},
			navigate(id) {
				// console.log(id)
				if(this.goodstype == 'course') {
					uni.navigateTo({
						url: `/pages/course-list/course-list?flid=${this.flid}&sonflid=${id}&goodstype=${this.goodstype}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/commodity-list/commodity-list?flid=${this.flid}&sonflid=${id}&goodstype=${this.goodstype}`
					})
				}
			},
			postSearchCourse(e) {
				console.log(123)
				var keyword
				if(e == 'hot') {
					keyword = e
				} else {
					keyword = this.keyword
					if(keyword == '') {
						uni.showToast({
							title: '搜索内容不能为空',
							icon: 'none'
						});
						return false
					}
				}
				uni.navigateTo({
					url: `/pages/course-list/course-list?keyword=${keyword}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>


	// search框 
	.search {
		height: 90upx;
		background-color: #4b89ff;
		padding: 0 20upx;
		padding-top: 30upx;
		// &-title {
		// 	height: 110upx;
		// 	text-align: center;
		// 	line-height: 110upx;
		// 	text {
		// 		font-size: 34upx;
		// 		color: #fff;
		// 	}
		// }
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
				z-index: 99;
			}
		}
	}
	
	
	.scroll {
		height: calc(100vh - 120upx);
		// background-color: pink;
		display: flex;
		&-left {
			flex: 2;
			// background-color: red;
			view {
				height: 100upx;
				background-color: #eee;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-bottom: 2upx solid #ddd;
				font-size: 34upx;
				color: #333;
				letter-spacing: 2upx;
			}
			.active {
				background-color: #fff;
			}
		}
		&-right {
			flex: 5;
			background-color: #fff;
			padding: 0 30upx;
			box-sizing: border-box;
			.item {
				display: inline-block;
				width: 220upx;
				height: 60upx;
				background-color: #eee;
				text-align: center;
				line-height: 60upx;
				border-radius: 60upx;
				margin: 20upx 12upx 0;
				text {
					font-size: 30upx;
					font-weight: 700;
					letter-spacing: 4upx;
					color: #333;
				}
			}
		}
	}
</style>
