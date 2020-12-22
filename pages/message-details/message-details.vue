/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		<view class="message-details">
			<view class="message-details-list" v-for="(item, index) in msgList" :key="index">
				<view class="item-left">
					<text>{{item.year}}</text>
					<text>{{item.day}}</text>
					<text>{{item.time}}</text>
				</view>
				<view class="item-right">
					<text>{{item.title}}</text>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		
		
		<view class="wuxiaoxi" v-if="msgList.length === 0">
			<image src="../../static/wuxiaoxi.jpg" mode="aspectFit"></image>
		</view>
		
	</view>
</template>

<script>
	import { postNewnotice } from '@/request/message'
	export default {
		data() {
			return {
				msgList: []
			};
		},
		onLoad() {
			let userinfo = uni.getStorageSync('userinfo')
			postNewnotice({uid: userinfo.uid}).then(res => {
				console.log(res.data)
				this.msgList = res.data.data
			})
		}
	}
</script>

<style lang="less" scoped>

.message-details {
	&-list {
		margin: 30upx;
		padding: 30upx;
		background-color: #fff;
		display: flex;
		.item-left {
			display: flex;
			flex-direction: column;
			align-items: center;
			text:nth-child(1) {
				font-size: 32upx;
				font-weight: 700;
				color: #333;
			}
			text:nth-child(2), text:nth-child(3) {
				font-size: 26upx;
				color: #999;
			}
		}
		.item-right {
			margin-left: 40upx;
			display: flex;
			flex-direction: column;
			text:nth-child(1) {
				font-size: 34upx;
				font-weight: 700;
				color: #333;
			}
			text:nth-child(2) {
				font-size: 30upx;
				color: #999;
				margin-top: 10upx;
			}
		}
	}
}

.wuxiaoxi {
	width: 100%;
	height: 100%;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	image {
		width: 100%;
		height: 100%;
	}
}

</style>
