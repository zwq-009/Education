/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper :indicator-dots="true"
			:autoplay="true"
			:interval="2000"
			:duration="1000"
			circular="true">
				<swiper-item  v-for="(item, index) in ads" :key="index">
					<view class="swiper-item">
						<image :src="HOST_URL + item.thumb" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		
		<view class="commodity-list">
			<view class="commodity-list-item">
				<view class="item-box" v-for="(item, index) in goods" :key="index" @click="navigate(item.goodstype,item.goodsid)">
					<image :src="HOST_URL + item.thumb" mode="aspectFit"></image>
					<text>{{item.goodsname}}</text>
					<view>
						<text>{{item.credit}}积分</text>
						<text>兑换</text>
					</view>
				</view>
			</view>
		</view>
		
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				ads:{},
				HOST_URL:uni.HOST_URL,
				goods:{}
			};
		},
		onLoad() {
			this.getindexdata()
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
		methods: {
			navigate(goodstype,goodsid){
				var e;
				if(goodstype=='course'){
					e='course-details'
					uni.navigateTo({
						url: `/pages/${e}/${e}?menuid=${goodsid}&action=credit`
					});
				}else{
					if(goodstype=='mall'){
						e='shop-details'
					}else if(goodstype=='pxb'){
						e='agency-course-details'
					}
					uni.navigateTo({
						url: `/pages/${e}/${e}?id=${goodsid}&action=credit`
					});
				}
			},
			getindexdata(){
				const BASE_URL = uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/credit/index',
					method:'GET',
					success:(res) =>{
						console.log(res.data)
						this.ads=res.data.data.ads
						this.goods=res.data.data.goods
						this.goods.forEach((item,index)=>{
							let thumb=item.goodsinfo.thumb.split(',')
							item.thumb=thumb[0]
						})
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
page {
	background-color: #ebeef5;
	font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
}
.commodity-fls {
	height: 80upx;
	background-color: #4b89ff;
	display: flex;
	align-items: center;
	padding: 0 20upx;
	scroll-view {
		white-space: nowrap;
		view {
			display: inline-block;
			font-size: 34upx;
			margin-right: 35upx;
			color: #fff;
		}
		view:last-child {
			margin-right: 0;
		}
		.newview {
			color: red;
			font-weight: 700;
		}
	}
}


// 轮播图
.swiper {
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


// 课程专场
.commodity-list {
		margin-top: 48upx;
		padding: 0 25upx;
		&-item {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.item-box {
				width: 340upx;
				height: 314upx;
				background-color: #fff;
				border-radius: 20upx;
				margin-bottom: 20upx;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				image {
					width: 100%;
					height: 186upx;
				}
				text {
					font-size: 32upx;
					font-weight: 700;
					margin: 20upx 0 0 20upx;
				}
				view {
					margin-top: 15upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text {
						font-size: 28upx;
						color: red;
						font-weight: 400;
						margin: 0;
						margin-left: 20upx;
					}
					text:last-child {
						margin-right: 30upx;
						color: #8b8b8b;
					}
				}
			}
		}
}
		
		
</style>
