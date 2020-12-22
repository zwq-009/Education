/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		
		<!-- 当前连续签到 -->
		<view class="continuous">
			<text class="continuous-left">当前连续签到：<text>{{total}}</text>天</text>
			<text class="continuous-right">当前积分：<text>{{credit}}</text></text>
		</view>
		
		
		<!-- 立即签到 -->
		<view class="signin-img">
			<button type="default" class="ljqd"  v-if="is_qd==0" @click="ljqd">立即签到</button>
			<button type="primary" class="yqd" v-if="is_qd==1">已签到</button>
		</view>
		
		<!-- 日历 -->
		<view class="calendar">
			<image src="../../static/rilibeijing-hengxian.png" mode="aspectFit"></image>
			<view>
			    <uni-calendar class="uni-calendar"
			    :insert="true" 
			    :start-date="'2019-3-2'"
			    :end-date="'2019-5-20'"
			    @change="change"
			     />
			</view>
		</view>
		
		
		<!-- 打卡规则 -->
		<view class="dkgz">
			<text>打卡规则</text>
			<text>1.打卡积分可用于积分兑换课程或商品；</text>
		</view>
		
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import {postDaka,ljqd} from '@/request/signin'
	import {checkUserinfo} from '@/request/checkUserinfo'
	export default {
		components: {
		  uniCalendar
		},
		data() {
			return {
				credit:0,
				total:0,
				is_qd:0
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
			checkUserinfo()
			this.postDaka()
		},
		methods: {
			ljqd(){
				uni.showLoading({
					title:'签到中'
				})
				let userinfo=uni.getStorageSync('userinfo')
				ljqd({uid: userinfo.uid}).then(res => {
					console.log(res)
					uni.hideLoading()
					if(res.data.code==0){
						this.is_qd=1
						uni.showToast({
							title:'签到成功！'+'获得'+res.data.data.qdjf+'积分',
							icon:'none'
						})
						this.credit=res.data.data.credit
					}
				})
			},
			change(e) {
				console.log(e);
			},
			postDaka() {
				let userinfo=uni.getStorageSync('userinfo')
				this.credit=userinfo.userdata.credit
				postDaka({uid: userinfo.uid}).then(res => {
					console.log(res)
					if(res.data.code==0){
						this.total=res.data.data.total
						this.is_qd=res.data.data.is_qd
					}
				})
			}
		}
	}
</script>

<style lang="less">
.container {
	background-color: #4b89ff;
}


// 连续签到天数
.continuous {
	padding: 20upx 20upx 0 20upx;
	display: flex;
	justify-content: space-between;
	&-left {
		font-size: 26upx;
		color: #fff;
		text {
			font-size: 32upx;
			color: #ffd74a;
		}
	}
	&-right {
		font-size: 26upx;
		color: #fff;
		text {
			font-size: 32upx;
			color: #fff;
		}
	}
}


// 立即签到按钮
.signin-img {
	margin: 50upx 0;
	text-align: center;
	.ljqd {
		width: 308upx;
		border-radius: 45upx;
		font-size: 32upx;
		letter-spacing: 5upx;
		background-image: linear-gradient(to bottom, #ffca64 , #fb911b);
		color: #fff;
		font-weight: 700;
	}
	.yqd{
		width: 308upx;
		border-radius: 45upx;
		font-size: 32upx;
		letter-spacing: 5upx;
		color: #fff;
		font-weight: 700;
	}
}


// 签到过的日子
.date {
	height: 182upx;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	&-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		text:nth-child(1) {
			width: 56upx;
			height: 56upx;
			border-radius: 50%;
			background-color: #72a1ff;
			text-align: center;
			line-height: 56upx;
			font-size: 26upx;
			color: #fff;
		}
		text:nth-child(2) {
			font-size: 26upx;
			color: #fff;
			margin-top: 10upx;
		}
	}
}


// 日历
.calendar {
	position: relative;
	image {
		width: 100%;
		height: 53upx;
		position: absolute;
		top: -22upx;
	}
	view {
		// width: 95%;
	}
}
// .uni-calendar{
// 	width: 80%;
// }


// 打卡规则
.dkgz {
	padding: 0 48upx;
	display: flex;
	flex-direction: column;
	text:nth-child(1) {
		font-size: 30upx;
		color: #fff;
		margin-top: 45upx;
	}
	text:nth-child(2) {
		font-size: 26upx;
		color: #fff;
		line-height: 40upx;
		margin: 33upx 0;
	}
	text:nth-child(3) {
		font-size: 26upx;
		color: #fff;
		line-height: 40upx;
		margin-bottom: 60upx;
	}
}


</style>
