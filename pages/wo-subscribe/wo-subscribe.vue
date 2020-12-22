/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		<!-- 课程订单  商城订单 培训班订单  -->
		<view class="qiehuan-part">
			<view class="qiehuan-part-title">
				<view class="qiehuan-part-title-item" v-for="(item, index) in kechengList" :key="index">
					<view @click="muluchange(index)" :class="{btna:btnnum == index}">{{item}}</view>
					<text :class="{_underline: btnnum == index}"></text>
				</view>
			</view>
			<!-- 没有任何订单图片 -->
			<view id="nodata" v-if="noData == true">
				<image src="../../static/wudingdan.png" mode="aspectFit"></image>
			</view>
			
			<!-- 课程订单 -->
			<view class="qiehuan-part-content">
				<view class="kc" :class="{dis:btnnum == 0}" :model="zhiboInfo">
					<!-- 课程订单购买列表 -->
					<view class="subscribe-list" v-for="(item, index) in subecribeList" :key="index">
						<view class="subscribe-list-left">
							<text>{{item.menuinfo.menuname}}</text>
							<text>{{item.menuinfo.jianjie}}</text>
							<!-- <view class="keshi">
								<image src="../../static/book.png" mode="aspectFit"></image>
								<text>{{item.courseTime}}课时</text>
							</view> -->
						</view>
						<image class="subscribe-list-right" :src="HOST_URL + item.menuinfo.thumb" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 商城订单 -->
				<view class="sc"  :class="{dis:btnnum == 1}">
					<!-- 商城订单购买列表 -->
					<view class="subscribe-list" v-for="(item, index) in subecribeList" :key="index">
						<view class="subscribe-list-left">
							<text>{{item.menuinfo.name}}</text>
							<text>{{item.menuinfo.jianjie}}</text>
							<!-- <view class="keshi">
								<image src="../../static/book.png" mode="aspectFit"></image>
								<text>{{item.courseTime}}课时</text>
							</view> -->
						</view>
						<image class="subscribe-list-right" :src="HOST_URL + item.menuinfo.thumb" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	import { postMyDingyue } from '@/request/courses'
	// import { HOST_URL } from '@/request/request.js'
	export default {
		data() {
			return {
				// isEdit: false,
				// isShangjia: true,
				// index: 0,
				// courseForm: {
				// 	name: '',
				// 	money: ''
				// },
				HOST_URL: uni.HOST_URL,
				subecribeList: [],
				kechengList: ['知识课程', '实物商品'],
				btnnum: 0,
				goodstype: 'course',
				noData: false
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
		onShow() {
			this.postMyDingyue()
		},
		methods: {
			muluchange(e) {
				this.btnnum = e
				if(e == 0) {
					this.goodstype = 'course'
					this.postMyDingyue()
				} else if(e == 1) {
					this.goodstype = 'mall'
					this.postMyDingyue()
				}
			},
			postMyDingyue () {
				let userinfo = uni.getStorageSync('userinfo')
				postMyDingyue({uid: userinfo.uid, goodstype: this.goodstype}).then(res => {
					console.log(res.data)
					this.subecribeList = res.data.data
					if(!res.data.data) {
						this.noData = true
					} else {
						this.noData = false
					}
					this.subecribeList.forEach(item => {
						var thumb = item.menuinfo.thumb.split(',')
						item.menuinfo.thumb = thumb[0]
					})
				})
			},
			
			
		}
	}
</script>

<style lang="less" scoped>


#nodata {
	width: 100%;
	height: 100vh;
	background-color: #fff;
	image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -70%);
	}
}

// 全部订单
.qiehuan-part {
	&-title{
		height: 100upx;
		background-color: #fff;
		padding-top: 30upx;
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
		// 课程订单
		.kc {
			display: none;
			padding: 0 20upx;
			.subscribe-list {
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
					width: 390upx;
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
						margin-top: 26upx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
				&-right {
					width: 250upx;
					height: 150upx;
				}
			}
		}
		
		// 商城订单
		.sc {
			display: none;
			padding: 0 20upx;
			.subscribe-list {
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
					width: 390upx;
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
						margin-top: 26upx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
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
