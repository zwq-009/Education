/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		<view class="message">
			<!-- 系统消息 -->
			<view class="message-list" @click="navigate('message-details')">
				<view class="item-left">
					<image src="../../static/laba.png" mode="aspectFit"></image>
					<view class="item-left-right">
						<text>系统消息</text>
						<text>欢迎回来</text>
					</view>
				</view>
				<view class="item-right">
					<image src="../../static/xiangyou11.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 我的通知 -->
			<view class="message-list" @click="navigate('message-details')">
				<view class="item-left">
					<image src="../../static/tongzhi.png" mode="aspectFit"></image>
					<view class="item-left-right">
						<text>我的通知</text>
						<text>订单进度，红包领取及支付通知等</text>
					</view>
				</view>
				<view class="item-right">
					<image src="../../static/xiangyou11.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 在线客服 -->
			<view class="message-list">
				<view class="item-left">
					<image src="../../static/zaixiankefu.png" mode="aspectFit"></image>
					<view class="item-left-right">
						<text>在线客服</text>
						<text>任何问题小智都会详细为你解答</text>
					</view>
				</view>
				<view class="item-right">
					<!-- <text>16:27</text> -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			navigate(e) {
				uni.navigateTo({
					url: `/pages/${e}/${e}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>

.message {
	&-list {
		padding: 40upx 30upx;
		background-color: #fff;
		border-bottom: 4upx solid #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item-left {
			display: flex;
			align-items: center;
			image {
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
			}
			&-right {
				margin-left: 40upx;
				display: flex;
				flex-direction: column;
				text:nth-child(1) {
					font-size: 34upx;
					font-weight: 700;
					color: #333;
				}
				text:last-child {
					font-size: 30upx;
					color: #999;
				}
			}
		}
		.item-right {
			image {
				width: 14upx;
				height: 24upx;
			}
			text {
				font-size: 30upx;
				color: #999;
			}
		}
		
	}
}

</style>
