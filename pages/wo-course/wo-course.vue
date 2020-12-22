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
			<view class="qiehuan-part-content" v-else>
				<view class="kc" :class="{dis:btnnum == 0}" :model="zhiboInfo">
					<!-- 课程订单购买列表 -->
					<view class="buy-list">
						<view class="buy-list-item" v-for="(item, index) in buyCourseList" :key="index" @click="goCourseDetails(item.menuid)">
							<view class="item-top">
								<image class="item-top-left" :src="HOST_URL + item.menuinfo.thumb" mode="aspectFit"></image>
								<view class="item-top-right">
									<text>名称：{{item.menuinfo.menuname}}</text>
									<text>订单号：{{item.orderid}}</text>
									<text decode>价格：{{item.price}}&emsp;付款方式：{{item.payType}}</text>
								</view>
							</view>
							
							<view class="item-bottom">
								<text @click="goEstimate(item.menuid, item.media)">评价</text>
							</view>
						</view>
					</view>
				</view>
				
				
				<!-- 商城订单 -->
				<view class="sc"  :class="{dis:btnnum == 1, newinteract: isOpen == 1}" >
					<!-- 商城订单购买列表 -->
					<view class="buy-list">
						<view class="buy-list-item" v-for="(item, index) in buyCourseList" :key="index" @click="goCourseDetails(item.menuid)">
							<view class="item-top">
								<image class="item-top-left" :src="HOST_URL + item.menuinfo.thumb" mode="aspectFit"></image>
								<view class="item-top-right">
									<text>名称：{{item.menuinfo.name}}</text>
									<text>订单号：{{item.orderid}}</text>
									<text decode>价格：{{item.price}}&emsp;付款方式：{{item.payType}}</text>
								</view>
							</view>
							<view class="item-bottom">
								<text @click="goEstimate(item.menuid, item.media)">评价</text>
							</view>
						</view>
					</view>
				</view>
				
			
				<!-- 培训班订单 -->
				<view class="pxb" :class="{dis:btnnum == 2}">
					<!-- 培训班订单购买列表 -->
					<view class="buy-list">
						<view class="buy-list-item" v-for="(item, index) in buyCourseList" :key="index" @click="goCourseDetails(item.menuid)">
							<view class="item-top">
								<image class="item-top-left" :src="HOST_URL + item.menuinfo.thumb" mode="aspectFit"></image>
								<view class="item-top-right">
									<text>名称：{{item.menuinfo.name}}</text>
									<text>订单号：{{item.orderid}}</text>
									<text decode>价格：{{item.price}}&emsp;付款方式：{{item.payType}}</text>
								</view>
							</view>
							<view class="item-bottom">
								<text @click="goEstimate(item.menuid, item.media)">评价</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	// import {checkUserinfo} from '@/request/checkUserinfo'
	import { postMyCourse } from '@/request/courses'
	import { HOST_URL } from '@/request/request.js'
	export default {
		data() {
			return {
				buyCourseList: [],
				HOST_URL,
				kechengList: ['课程订单', '商城订单', '培训班订单'],
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
			this.postMyCourse()
		},
		methods: {
			muluchange(e) {
				this.btnnum = e
				if(e == 0) {
					this.goodstype = 'course'
					this.postMyCourse()
				} else if(e == 1) {
					this.goodstype = 'mall'
					this.postMyCourse()
				} else {
					this.goodstype = 'pxcourse'
					this.postMyCourse()
				}
			},
			// 获取订单数据
			postMyCourse () {
				let userinfo=uni.getStorageSync('userinfo')
				postMyCourse({uid: userinfo.uid, goodstype: this.goodstype}).then(res => {
					console.log(res.data)
					this.buyCourseList = res.data.data
					if(!res.data.data) {
						this.noData = true
					} else {
						this.noData = false
					}
					if(this.buyCourseList) {
						this.buyCourseList.forEach((item,index) => {
							if(item.pay_type == 'wxpay') {
								item.payType = '微信支付'
							} else if(item.pay_type == 'alipay') {
								item.payType = '支付宝支付'
							} else if(item.pay_type == 'yhm') {
								item.payType = '优惠码'
							}else {
								item.payType = '余额支付'
							}
							this.buyCourseList.forEach(item => {
								var thumb = item.menuinfo.thumb.split(',')
								item.menuinfo.thumb = thumb[0]
							})
						})
					}
					
				})
			},
			goCourseDetails(id) {
				uni.navigateTo({
					url: `/pages/course-details/course-details?menuid=${id}`
				});
			},
			goEstimate (menuid, media) {
				uni.navigateTo({
					url: `/pages/estimate/estimate?menuid=${menuid}&media=${media}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>

// .container {
// 	padding-top: 20upx;
// }

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
			.buy-list {
				border-radius: 20upx;
				margin: 0 20upx;
				&-item {
					padding-bottom: 20upx;
					margin-top: 10upx;
					background-color: #fff;
					border-radius: 20upx;
					.item-top {
						display: flex;
						align-items: center;
						padding: 20upx 0;
						border-bottom: 2upx solid #ddd;
						&-left {
							width: 200upx;
							height: 148upx;
							border-radius: 10upx;
							margin-left: 22upx;
						}
						&-right {
							display: flex;
							margin-left: 42upx;
							flex-direction: column;
							text:nth-child(1) {
								font-size: 26upx;
								color: #8a8a8a;
							}
							text:nth-child(2) {
								font-size: 26upx;
								color: #8a8a8a;
								margin: 18upx 0;
							}
							text:nth-child(3) {
								font-size: 26upx;
								color: #8a8a8a;
							}
						}
					}
					.item-bottom {
						display: flex;
						justify-content: flex-end;
						text {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 120upx;
							height: 40upx;
							font-size: 30upx;
							color: red;
							border-radius: 40upx;
							border: 2upx solid red;
							margin: 20upx 20upx 0 0;
						}
					}
					
					
				}
			}
		}
		
		// 商城订单
		.sc {
			display: none;
			.buy-list {
				border-radius: 20upx;
				margin: 0 20upx;
				&-item {
					padding-bottom: 20upx;
					margin-top: 10upx;
					background-color: #fff;
					border-radius: 20upx;
					.item-top {
						display: flex;
						align-items: center;
						padding: 20upx 0;
						border-bottom: 2upx solid #ddd;
						&-left {
							width: 200upx;
							height: 148upx;
							border-radius: 10upx;
							margin-left: 22upx;
						}
						&-right {
							display: flex;
							margin-left: 42upx;
							flex-direction: column;
							text:nth-child(1) {
								font-size: 26upx;
								color: #8a8a8a;
							}
							text:nth-child(2) {
								font-size: 26upx;
								color: #8a8a8a;
								margin: 18upx 0;
							}
							text:nth-child(3) {
								font-size: 26upx;
								color: #8a8a8a;
							}
						}
					}
					.item-bottom {
						display: flex;
						justify-content: flex-end;
						text {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 120upx;
							height: 40upx;
							font-size: 30upx;
							color: red;
							border-radius: 40upx;
							border: 2upx solid red;
							margin: 20upx 20upx 0 0;
						}
					}
					
					
				}
			}
		}
		
		
		// 培训班订单
		.pxb {
			display: none;
			.buy-list {
				border-radius: 20upx;
				margin: 0 20upx;
				&-item {
					padding-bottom: 20upx;
					margin-top: 10upx;
					background-color: #fff;
					border-radius: 20upx;
					.item-top {
						display: flex;
						align-items: center;
						padding: 20upx 0;
						border-bottom: 2upx solid #ddd;
						&-left {
							width: 200upx;
							height: 148upx;
							border-radius: 10upx;
							margin-left: 22upx;
						}
						&-right {
							display: flex;
							margin-left: 42upx;
							flex-direction: column;
							text:nth-child(1) {
								font-size: 26upx;
								color: #8a8a8a;
							}
							text:nth-child(2) {
								font-size: 26upx;
								color: #8a8a8a;
								margin: 18upx 0;
							}
							text:nth-child(3) {
								font-size: 26upx;
								color: #8a8a8a;
							}
						}
					}
					.item-bottom {
						display: flex;
						justify-content: flex-end;
						text {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 120upx;
							height: 40upx;
							font-size: 30upx;
							color: red;
							border-radius: 40upx;
							border: 2upx solid red;
							margin: 20upx 20upx 0 0;
						}
					}
					
					
				}
			}
		}
		.dis{
			display: block;
		}
	}
}


</style>
