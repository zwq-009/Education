/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		<view class="beijing">
			<image src="../../static/user-beijing.png" mode=""></image>
			<view class="info">
				<image :src="userinfo.avatar" mode=""></image>
				<text>{{userinfo.nickname}}</text>
			</view>
		</view>
		
		
		<!-- 学习时长 -->
		<view class="learntime">
			<view class="learntime-top"><text>累计学习时长</text></view>
			<view class="learntime-bottom">
				<view class="learntime-bottom-list">
					<view class="item">
						<text>累计学习视频</text>
						<text>{{sumVtime}}</text>
					</view>
					<view class="item">
						<text>累计学习音频</text>
						<text>{{sumAtime}}</text>
					</view>
					<view class="item">
						<text>累计学习图文</text>
						<text>{{sumTutime}}</text>
					</view>
				</view>
			</view>
			
			<view class="learntime-top"><text>今日学习时长</text></view>
			<view class="learntime-bottom">
				<view class="learntime-bottom-list">
					<view class="item">
						<text>今日学习视频</text>
						<text>{{Vtime}}</text>
					</view>
					<view class="item">
						<text>今日学习音频</text>
						<text>{{Atime}}</text>
					</view>
					<view class="item">
						<text>今日学习图文</text>
						<text>{{Tutime}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 学习时长和积分 -->
		<view class="jifen">
			<view class="item-box">
				<text>今天共学习</text>
				<text>{{todayTotal}}</text>
			</view>
			<view class="item-box">
				<text>今天已兑换</text>
				<text>{{ydh_score}}积分</text>
			</view>
		</view>
		<view class="tips">温馨提示：每学习{{study_minute}}分钟可以兑换{{dh_score}}积分</view>
		<view class="tips">当前可兑换积分：{{can_dh_score}}</view>
		<button type="primary" @click="ljdh" class="ljdh">立即兑换</button>
	</view>
</template>

<script>
	import {checkUserinfo} from '@/request/checkUserinfo'
	export default {
		data() {
			return {
				userinfo: {},
				Vtime:0,
				Atime:0,
				Tutime:0,
				todayTotal:0,
				sumVtime:0,
				sumAtime:0,
				sumTutime:0,
				dh_score:0,
				study_minute:0,
				can_dh_score:0,
				ydh_score:0
			};
		},
		onLoad() {
			let userinfo=uni.getStorageSync('userinfo')
			this.userinfo = userinfo.userdata
			var atime=uni.getStorageSync('atime')
			var vtime=uni.getStorageSync('vtime')
			var tutime=uni.getStorageSync('tutime')
			console.log(atime)
			console.log(vtime)
			// this.Vtime=vtime?this.formatSecToStr(vtime.vtime):0
			// this.Atime=atime?this.formatSecToStr(atime.atime):0
			// this.Tutime=tutime?this.formatSecToStr(tutime.tutime):0
			// this.todayTotal=this.formatSecToStr((vtime.vtime?vtime.vtime:0)+(atime.atime?atime.atime:0)+(tutime.tutime?tutime.tutime:0))
			// var todaytotalsecond=(vtime.vtime?vtime.vtime:0)+(atime.atime?atime.atime:0)+(tutime.tutime?tutime.tutime:0)
			// this.can_dh_score = Math.floor(todaytotalsecond/60)
			this.getsumtime()
			var set=uni.getStorageSync('base_set')
			this.study_minute=set.study_minute
			this.dh_score=set.dh_score
		},
		onShow() {
			checkUserinfo()
			
		},
		methods:{
			ljdh(){
				if(this.can_dh_score<=0){
					uni.showToast({
						title:'暂无可兑换积分，请学习课程',
						icon:'none'
					})
				}else{
					const BASE_URL = uni.BASE_URL
					uni.request({
						url: BASE_URL+'index/user/studytime_dh',
						method:'POST',
						data:{
							minute:this.can_dh_score,
							uid:this.userinfo.id
						},
						success:(res) =>{
							console.log(res.data);
							uni.showToast({
								title:'兑换成功'
							})
							uni.navigateBack()
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}
			},
			getsumtime(){
				uni.showLoading({
					title:'计算中...'
				})
				const BASE_URL = uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/user/my_studytime',
					method:'POST',
					data:{
						uid:this.userinfo.id
					},
					success:(res) =>{
						console.log(res.data);
						this.sumAtime=this.formatSecToStr(res.data.data.atime)
						this.sumVtime=this.formatSecToStr(res.data.data.vtime)
						this.sumTutime=this.formatSecToStr(res.data.data.tutime)
						
						if(res.data.data.todayinfo){
							this.Vtime=this.formatSecToStr(res.data.data.todayinfo.videostudytime)
							this.Atime=this.formatSecToStr(res.data.data.todayinfo.audiostudytime)
							this.Tutime=this.formatSecToStr(res.data.data.todayinfo.tuwenstudytime)
							this.todayTotal=this.formatSecToStr((res.data.data.todayinfo.videostudytime)+(res.data.data.todayinfo.audiostudytime)+(res.data.data.todayinfo.tuwenstudytime))
							var todaytotalsecond=(res.data.data.todayinfo.videostudytime)+(res.data.data.todayinfo.audiostudytime)+(res.data.data.todayinfo.tuwenstudytime)
							this.can_dh_score = (Math.floor(todaytotalsecond/60)-res.data.data.todayinfo.dh_score)>0?Math.floor(todaytotalsecond/60)-res.data.data.todayinfo.dh_score:0
							this.ydh_score=res.data.data.todayinfo.dh_score
						}
						uni.hideLoading()
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			formatSecToStr(seconds){
			    let daySec = 24 *  60 * 60;
				let hourSec=  60 * 60;
				let minuteSec=60;
			    let dd = Math.floor(seconds / daySec);
			    let hh = Math.floor((seconds % daySec) / hourSec);
			    let mm = Math.floor((seconds % hourSec) / minuteSec);
				let ss=seconds%minuteSec;
			    if(dd > 0){
			      return dd + "天" + hh + "小时" + mm + "分钟"+ss+"秒";
			    }else if(hh > 0){
			      return hh + "小时" + mm + "分钟"+ss+"秒";
			    } else if (mm > 0){
			      return mm + "分钟"+ss+"秒";
			    }else{
			      return ss+"秒";
			    }
			}
		}
	}
</script>

<style lang="less" scoped>
	.ljdh{
		width: 60%;
		margin: 20upx auto;
		height: 80upx;
		font-size: 32upx;
		line-height: 80upx;
	}
.tips{
	text-align: center;
	background-color: #fff;
	font-size: 30upx;
	padding: 15upx 0;
}
.beijing {
	image {
		width: 750upx;
		height: 350upx;
	}
	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 55upx;
		left: 300upx;
		image {
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
		}
		text {
			font-size: 34upx;
			color: #fff;
			margin-top: 20upx;
		}
	}
}


// 学习时长
.learntime {
	background-color: #fff;
	padding: 0 20upx;
	&-top {
		display: flex;
		text {
			height: 80upx;
			border-bottom: 5upx solid #4b89ff;
			line-height: 80upx;
			font-size: 32upx;
			font-weight: 700;
			color: #333;
		}
	}
	&-bottom {
		padding: 20upx 0;
		&-list {
			display: flex;
			.item {
				flex: 1;
				border-right: 2upx solid #ddd;
				display: flex;
				flex-direction: column;
				align-items: center;
				text:nth-child(1) {
					font-size: 30upx;
					color: #8b8b8b;
				}
				text:last-child {
					margin-top: 25upx;
					font-size: 28upx;
					color: #333;
				}
			}
			.item:last-child {
				border-bottom: 0;
			}
		}
	}
}


.jifen {
	margin-top: 20upx;
	padding: 30upx 0;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	.item-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		text:nth-child(1) {
			font-size: 30upx;
			color: #8b8b8b;
		}
		text:last-child {
			font-size: 30upx;
			color: #333;
			margin-top: 20upx;
		}
	}
}

</style>
