/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		<!-- 头部部分 -->
		<view class="vip-title">
			<view class="vip-title-info">
				<view class="photo">
					<image class="avatar" :src="userinfo.avatar?userinfo.avatar:'../../static/user-photo.png'" mode="aspectFit"></image>
					<image v-if="isvip" src="../../static/user-vip.png" mode="aspectFit" class="viplogo"></image>
				</view>
				<view class="name">
					<view class="nickname">
						<text>{{userinfo.nickname}}</text>
						<text v-if="isvip" style="margin-left: 20upx;font-size: 25upx;color: #b57400;">({{vipinfo.viptype}})</text>
					</view>
					<view class="vipinfo" v-if="isvip">
						<text>到期时间：{{vipinfo.dqtime}}</text>
					</view>
					<view>可享受全场音频视频免费观看收听<image src="../../static/heijiantou.png" mode=""></image></view>
				</view>
			</view>
		</view>
	
	
	
		<!-- 方式一和方式二 -->
		<view class="mode">
			
			<!-- 方式一 -->
			<view class="mode-one">
				<view class="mode-one-top">
					<text>请选择会员套餐</text>
				</view>
				<view class="mode-one-center">
					<view @click="chooseVip(index, item.id)" :class="{newviplist: addBorder === index}" class="vip-list" v-for="(item, index) in vipList" :key="index">
						<text>{{item.name}}</text>
						<text><text>￥</text>{{item.price}}</text>
						<text>原价￥{{item.bfprice}}</text>
					</view>
				</view>
				<view class="mode-one-bottom">
					<text @click="goPay(vipid)">立即购买</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getViptime} from '@/request/vip'
	import {checkUserinfo} from '@/request/checkUserinfo'
export default {
	data() {
		return {
			addBorder: 1,
			vipList: [],
			userinfo:'',
			wx_nickname:'',
			vipid: 0,
			jhm:'',
			vipinfo:[],
			isvip:false
		};
	},
	onLoad() {
		checkUserinfo()
		this.getViptime()
		this.base_check()
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
		this.getViptime()
		this.base_check()
	},
	methods: {
		changeJhm(e){
			this.jhm=e.detail.value
		},
		ljjh(){
			if(this.jhm==''){
				uni.showToast({
					title:'激活码不能为空',
					icon:'none'
				})
				return false
			}
			const BASE_URL = uni.BASE_URL
			uni.request({
				url: BASE_URL+'index/vip/jhmjh',
				method:'POST',
				data:{
					uid:this.userinfo.id,
					jhm:this.jhm
				},
				success:(res) =>{
					console.log(res.data);
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
						})
						uni.switchTab({
							url:'../user/user'
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				},
				fail:(res)=> {
					console.log(res.data);
				}
			});
		},
		base_check(){
			const userinfo_check= uni.getStorageSync('userinfo');
			if(userinfo_check.userdata){
				this.userinfo=userinfo_check.userdata
				if(userinfo_check.userdata.is_vip==1){
					this.isvip=true
					const BASE_URL = uni.BASE_URL
					uni.request({
						url: BASE_URL+'index/vip/vipinfo',
						method:'POST',
						data:{
							uid:this.userinfo.id,
						},
						success:(res) =>{
							console.log(res.data);
							this.vipinfo=res.data.data
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}
			}
		},
		getViptime () {
			getViptime().then(res => {
				this.vipList = res.data.data
				console.log(this.vipList)
				if(this.vipList.length == 1) {
					this.chooseVip(0, this.vipList[0].id)
				} else {
					this.chooseVip(1, this.vipList[1].id)
				}
			})
		},
		chooseVip(index, id) {
			this.addBorder = index
			this.vipid = id
			//console.log(this.vipid)
		},
		goPay(id) {
			uni.navigateTo({
				url: `/pages/confirm-order-form/confirm-order-form?goodstype=vip&id=${id}`
			});
		}
	}
};
</script>
<style lang="less" scoped>
.container {
	background-color: #333;
}

// 头部部分
.vip-title {
	height: 345upx;
	padding: 0 20upx;
	padding-top: 40upx;
	box-sizing: border-box;
	&-info {
		width: 710upx;
		height: 250upx;
		background-color: #f7dba9;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		.photo {
			width: 100upx;
			height: 100upx;
			border-radius: 100%;
			border: 4upx solid #fff;
			margin: 0 30upx;
			position: relative;
			.avatar {
				width: 100upx;
				height: 100upx;
				border-radius: 100%;
			}
			.viplogo{
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 0;
				bottom:0;
				z-index: 10;
			}
		}
		.name {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 60%;
			.vipinfo{
				image {
					width: 30upx;
					height: 30upx;
				}
				text {
					font-size: 25upx;
					font-weight: 700;
				}
			}
			.nickname{
				text {
					font-size: 30upx;
					font-weight: 700;
				}
			}
			view {
				font-size: 24upx;
				color: #333;
				image {
					width: 15upx;
					height: 20upx;
					margin-left: 15upx;
				}
			}
		}
	}
}


// 方式一和方式二
.mode {
	background-color: #fff;
	padding: 0 20upx;
	border-radius: 30upx 30upx 0 0;
	// 方式一
	&-one {
		&-top {
			height: 128upx;
			line-height: 128upx;
			text {
				font-size: 30upx;
				font-weight: 700;
			}
		}
		&-center {
			display: flex;
			.vip-list {
				width: 208upx;
				height: 250upx;
				margin-right: 20upx;
				border: 2upx solid #cfcfcf;
				border-radius: 10upx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				background-color: #f7f7f7;
				text:nth-child(1) {
					font-size: 28upx;
					font-weight: 700;
					color: #333;
				}
				text:nth-child(2) {
					font-size: 35upx;
					font-weight: 700;
					color: #deb565;
					text {
						font-size: 26upx;
						font-weight: 700;
						color: #deb565;
					}
				}
				text:nth-child(3) {
					font-size: 24upx;
					color: #999;
					text-decoration: line-through;
				}
			}
			.newviplist {
				border: 2upx solid orange;
			}
		}
		&-bottom {
			margin-top: 50upx;
			text {
				display: block;
				width: 710upx;
				height: 90upx;
				font-size: 30upx;
				color: #333;
				text-align: center;
				line-height: 90upx;
				border-radius: 90upx;
				background-color: #e7c382;
			}
		}
	}
	
	// 方式二
	&-two {
		margin-top: 60upx;
		&-top {
			height: 60upx;
			text {
				font-size: 30upx;
				font-weight: 700;
				color: #333;
			}
		}
		&-bottom {
			position: relative;
			input {
				width: 450upx;
				height: 92upx;
				border: 2upx solid #e0e0e0;
				border-radius: 10upx;
				background-color: #f7f7f7;
				padding-left: 30upx;
			}
			text {
				font-size: 28upx;
				font-weight: 700;
				color: #deb565;
				border-bottom: 4upx solid #deb565;
				position: absolute;
				top: 30upx;
				right: 40upx;
			}
		}
	}
}

</style>