/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container" v-if="!nodata">
		
		<view class="allcourse">
			<image src="../../static/kechengtuijian.png" mode="aspectFit"></image>
			<!-- <text>全部课程</text> -->
		</view>
		
		
		<view class="course">
			<view class="course-list">
				<view class="course-list-item" @click="navigate(item.id, item.media)" v-for="(item, index) in courseList" :key="index">
					<image :src="HOST_URL + item.thumb" mode="aspectFit"></image>
					<text>{{item.menuname ? item.menuname : item.zbtitle}}</text>
					<text>{{item.jianjie ? item.jianjie : item.zbjianjie}}</text>
					<view class="item-bottom">
						<view class="item-bottom-left" v-if="item.media === 'audio' || item.media === 'video'">
							<image src="../../static/book.png" mode="aspectFit"></image>
							<text>{{item.ksnum}}课时</text>
						</view>
						<view class="item-bottom-right">
							<text>￥{{item.price}}</text>
						</view>
					</view>
					<div class="icon" v-if="item.media === 'live'">直播</div>
					<div class="icon" v-else-if="item.media === 'audio'">音频</div>
					<div class="icon" v-else-if="item.media === 'video'">视频</div>
					<div class="icon" v-else-if="item.media === 'tuwen'">图文</div>
				</view>
			</view>
		</view>
		
		<!-- 加载 -->
		<uni-load-more style="margin-bottom:25upx;" :status="loading_status" showIcon iconType></uni-load-more>
	</view>
	<view style="text-align: center;" v-else>
		<image src="../../static/wudingdan.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	import {postSearchCourse} from '@/request/search'
	import {getMoretjCourse} from '@/request/index'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {uniLoadMore},
		data() {
			return {
				courseList: [],
				HOST_URL:uni.HOST_URL,
				// media: '',
				page:0,
				loading_status:'more',
				nodata:false
			};
		},
		onReachBottom(){
			this.loading_status= 'loading'
			setTimeout(() => {
				// this.get_pxblist(this.lat,this.lng,this.citycode,this.page,this.flid)
				this.loading_status= 'more'
			}, 1000)
			this.page++
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
			console.log(option)
			let userinfo=uni.getStorageSync('userinfo')
			if(option.goodstype) {
				if(option.media == 'live') {
					getZhiBoList().then(res => {
						console.log(res.data)
						this.courseList = res.data.data
						this.courseList.forEach(item => {
							item.media = 'live'
						})
					})
				}else {
					postSonflGoodslist({goodstype: option.goodstype, flid: option.flid, sonflid: option.sonflid}).then(res => {
						console.log(res.data)
						this.courseList = res.data.data
					})
				}
			}
			
			if(option.keyword) {
				postSearchCourse({keyword: option.keyword}).then(res => {
					console.log(res.data)
					this.courseList = res.data.data
				})
			}
			if(option.moretype=='indextj') {
				getMoretjCourse().then(res => {
					console.log(res.data)
					this.courseList = res.data.data
				})
			}
			if(!this.courseList || this.courseList==[]){
				this.nodata=true
			}
		},
		methods: {
			navigate(id, media) {
				if(media == 'live') {
					uni.navigateTo({
						url: `/pages/broadcasting/broadcasting?id=${id}`
					});
				} else if(media == 'video' || media == 'audio') {
					uni.navigateTo({
						url: `/pages/course-details/course-details?menuid=${id}`
					});
				}else if(media == 'tuwen') {
					uni.navigateTo({
						url: `/pages/tuwen/tuwen?twid=${id}`
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>

.allcourse {
	display: flex;
	align-items: center;
	padding-top: 50upx;
	margin-left: 20upx;
	image {
		width: 140upx;
		height: 40upx;
	}
	text {
		font-size: 32upx;
		color: #333;
		margin-left: 10upx;
		letter-spacing: 2upx;
	}
}


// 课程列表
.course {
		margin-top: 48upx;
		padding: 0 20upx;
		&-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			&-item {
				width: 346upx;
				height: 350upx;
				background-color: #fff;
				border-radius: 20upx;
				margin-bottom: 20upx;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				position: relative;
				.icon {
					position: absolute;
					top: 10upx;
					left: 10upx;
					width: 70upx;
					height: 40upx;
					background-color: rgba(0,0,0,0.3);
					border-radius: 10upx;
					text-align: center;
					line-height: 40upx;
					font-size: 24upx;
					font-weight: 400;
					color: #fff;
					margin-right: 20upx;
				}
				image {
					width: 100%;
					height: 186upx;
				}
				text:nth-child(2) {
					font-size: 30upx;
					font-weight: 700;
					margin-top: 10upx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow:ellipsis;
				}
				text:nth-child(3) {
					font-size: 28upx;
					color: #666;
					margin: 10upx 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow:ellipsis;
				}
				.item-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;
					&-left {
						display: flex;
						align-items: center;
						image {
							width: 30upx;
							height: 30upx;
						}
						text {
							font-size: 28upx;
							font-weight: 400;
							color: #666;
							margin: 0;
							margin-left: 6upx;
						}
					}
					&-right {
						text {
							font-size: 28upx;
							font-weight: 400;
							color: #666;
							margin-right: 20upx;
						}
						.mianfei {
							display: block;
							width: 70upx;
							height: 40upx;
							background-color: green;
							border-radius: 5upx;
							text-align: center;
							line-height: 40upx;
							font-size: 24upx;
							font-weight: 400;
							color: #fff;
							margin-right: 20upx;
						}
					}
				}
			}
		}
}

</style>
