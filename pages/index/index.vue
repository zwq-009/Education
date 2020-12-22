/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		<!-- 计算手机状态栏的高度 -->
		<!-- #ifndef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-ALIPAY -->
		<view class="status_bar">
		
		</view>
		<!-- #endif -->
		
		<!-- 头部 --> 
		<view class="header" :class="[{newheader:navBarFixed},{changebf:huifu}]" :style="{'background-color':swiper_bgcolor}">
			<!-- 分类 -->
			<view class="header-list">
				<scroll-view class="list" scroll-x="true">
					<view class="list-box">
						<view class="list-item" @click="postIndexGoods(0,0)">
							 <!--   -->
							<view class="list-item-top" :class="[{fangda: 0 == current}, {newview: navBarFixed}]">推荐</view>
							 <!--  -->
							<view class="list-item-bottom" :class="[{hengxian: 0 == current}, {newhengxian: navBarFixed}]"></view>
						</view>
						
						<view class="list-item" v-for="(item,index) in fls" :key="index" @click="postIndexGoods(item.id,index+1)">
							 <!--      -->
							<view class="list-item-top" :class="[{fangda: (index+1) == current}, {newview: navBarFixed}]">{{item.title}}</view>
							 <!--  -->
							<view class="list-item-bottom" :class="[{hengxian: (index+1) == current}, {newhengxian: navBarFixed}]" style="transition: .3s"></view>
						</view>
						
					</view>
				</scroll-view>
				<view class="icon" :fls="fls" @click="goListPage">
					<image v-if="!navBarFixed" src="../../static/fenleixuanzhong.png" mode="aspectFit"></image>
					<image v-else src="../../static/fenleixuanzhong1.png" mode="aspectFit"></image>
				</view>
			</view>

			<!-- 搜索框 -->
			<view class="header-input">
				<image @click="postSearchCourse" class="search" src="../../static/search.png" mode="aspectFit"></image>
				<input v-model.trim="keyword" class="seader-input" :class="{newinput: navBarFixed}" type="text" placeholder="请输入搜索内容" />
				<image @click="navigate('message')" v-if="!navBarFixed" src="../../static/msg.png" mode="aspectFit"></image>
				<image @click="navigate('message')" v-else src="../../static/msg1.png" mode="aspectFit"></image>
				<view @click="navigate('message')" :class="{newinfo: navBarFixed}">1</view>
			</view>

		</view>

		<view v-if="current == 0">
			<!-- 轮播图 -->
			<view class="swiper" :class="[{newheader:navBarFixed},{changebf:huifu}]" :style="{'background-color':swiper_bgcolor}">
				<swiper :indicator-dots="true"
				:autoplay="true"
				:interval="2000"
				:duration="1000"
				circular="true" @change="swiper_change">
					<swiper-item v-for="item in images" :key="item.id">
						<view class="swiper-item">
							<image :src="HOST_URL + item.thumb" mode="aspectFit"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 图标 -->
			<view class="icons">

				<view class="icons-list" @click="navigate('tutor-list')">
					<image src="../../static/daoshi.png" mode="aspectFit"></image>
					<text>导师</text>
				</view>
				<view class="icons-list" @click="postSearchCourse('hot')">
					<image src="../../static/hot.png" mode="aspectFit"></image>
					<text>热门</text>
				</view>
<!-- 				<view class="icons-list" @click="postSearchCourse('free')">
					<image src="../../static/kaoshi.png" mode="aspectFit"></image>
					<text>免费</text>
				</view> -->
				<view class="icons-list" @click="postSearchCourse('new')">
					<image src="../../static/AI_bd.png" mode="aspectFit"></image>
					<text>最新</text>
				</view>
				<view class="icons-list" @click="navigate('sign-in')">
					<image src="../../static/qiandao.png" mode="aspectFit"></image>
					<text>签到</text>
				</view>
				<view class="icons-list" @click="navigate('vip')">
					<image src="../../static/vip.png" mode="aspectFit"></image>
					<text>会员</text>
				</view>
			</view>

			<!-- 课程专场 -->
			<view class="course">
				<view class="course-top">
					<image src="../../static/kczc.png" mode="aspectFit"></image>
					<text class="btn" @click="navigate('course-list','indextj')">查看更多></text>
				</view>
				<view class="course-bottom">
					<view class="course-bottom-list" v-for="(item, index) in index_courseTJ" :key="index" @click="goCourseDetails(item.id)">
						<image :src="HOST_URL + item.thumb" mode="aspectFit"></image>
						<text>{{item.menuname}}</text>
						<text>共{{item.ksnum}}课时<text>|</text>{{item.viewnum}}人已学</text>
					</view>
				</view>
			</view>
			 <!-- <canvas style="width: 750upx; height: 277upx;" canvas-id="myCanvas" id="myCanvas"></canvas> -->
		</view>

		<view v-else>
			<!-- 轮播图 -->
			<view class="swiper" :class="[{newheader:navBarFixed},{changebf:huifu}]" :style="{'background-color':swiper_bgcolor}">
				<swiper :indicator-dots="true"
				:autoplay="true"
				:interval="2000"
				:duration="1000"
				circular="true" @change="swiper_change">
					<swiper-item v-for="item in images" :key="item.id">
						<view class="swiper-item">
							<image :src="HOST_URL + item.thumb" mode="aspectFit"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 二级分类列表 -->
			<view class="course11">
				<view class="course11-list">
					<view class="course11-list-item" v-for="(son_fl, index) in son_fls" :key="son_fl.id" @click="sonflCourseList(son_fl.id)">
						<text>{{son_fl.title}}</text>
					</view>
					<view class="course11-list-item" v-if="son_fls.length > 0">
						<text>更多</text>
					</view>
					<!-- v-if="index >= 6" -->
					<view class="course11-list-item" v-if="son_fls.length >= 6">
						<image src="../../static/xiangxia1.png" mode="aspectFit" style="width: 24upx; height: 16upx;"></image>
					</view>
				</view>
			</view>
			
			
			<!-- 热门推荐 -->
			<!-- <view class="hot">
				<view class="hot-top">
					<image src="../../static/rementuijian.png" mode="aspectFit"></image>
					<view>
						<text>换一批</text>
						<image src="../../static/huanyipi.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="hot-bottom">
					<view class="hot-bottom-list" v-for="coursemenu in coursemenus" :key="coursemenu.id"  @click="goCourseDetails(coursemenu.id)">
						<image :src="HOST_URL + coursemenu.thumb" mode="aspectFit"></image>
						<text>{{coursemenu.menuname}}</text>
					</view>
				</view>
			</view> -->
			
			
			<!-- 课程推荐 -->
			<view class="kecheng">
				<view class="kecheng-top">
					<image src="../../static/kechengtuijian.png" mode="aspectFit"></image>
					<view @click="declick('tj')">
						<text>换一批</text>
						<image :class="{an: isPlaying, pause: isPaused}" src="../../static/huanyipi.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="kecheng-bottom">
					<view class="kecheng-bottom-list" v-for="(item, index) in courseTJ" :key="index" @click="goCourseDetails(item.id)">
						<image :src="HOST_URL + item.thumb" mode="aspectFit"></image>
						<text>{{item.menuname}}</text>
						<view>
							<text>共{{item.ksnum}}课时</text>
							<text>|</text>
							<text>{{item.viewnum}}人已学</text>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<!-- 独家精选 -->
			<view class="exclusive">
				<view class="exclusive-top">
					<image src="../../static/dujiajingxuan.png" mode="aspectFit"></image>
					<view @click="declick('jx')">
						<text>换一批</text>
						<image :class="{an: isPlaying1, pause: isPaused1}" src="../../static/huanyipi.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="exclusive-bottom">
					<view class="exclusive-bottom-list" v-for="(item, index) in dujiaList" :key="index" @click="goCourseDetails(item.id)">
						<image class="img" :src="HOST_URL + item.thumb" mode="aspectFit"></image>
						<view class="span">
							<text>{{item.menuname}}</text>
							<text>{{item.jianjie}}</text>
							<view class="span-view">
								<text>{{item.tinfo.imgname}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>


<script>
	import {getIndexInfo, getIndexListInfo, postIndexGoods, postDhHyp} from '@/request/index'
	import {wx_login} from '@/request/checkUserinfo'
	export default {
		data() {
			return {
				keyword: '',
				fls: [],
				current: 0,
				navBarFixed:false,
				huifu:false,
				images: [],
				HOST_URL:uni.HOST_URL,
				coursemenus: [],
				son_fls: [],
				index:0,
				swiper_bgcolor:'#4b89ff',
				robBuyList:{},
				killhour:0,
				killminute:0,
				killsecond:0,
				ptInfo:{},
				ptNum:'',
				tuijianjigou: [
				],
				index_courseTJ:[],//主页课程推荐
				courseTJ: [], // 分类课程推荐列表
				dujiaList: [], // 独家精选列表
				flid: '' ,// 这个变量用于传值
				isPlaying: false,
				isPaused: false,
				isPlaying1: false,
				isPaused1: false,
				page:0,
				page1:0
			}
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
		onLoad(){
			
			// #ifdef H5
			//wx_login()
			// #endif
			
			
			
		},
		onPageScroll(object){
				let scrollTop=object.scrollTop;
				if (scrollTop > 30) {
					this.navBarFixed = true
					this.huifu = false
				} else {
					this.navBarFixed = false
					this.huifu = true
				}
		 
		},
		onShow() {
			this.getIndexInfo()
			// #ifdef H5
			var userinfo=uni.getStorageSync('userinfo')
			if(!userinfo && !userinfo.userdata){
				wx_login()
			}
			// #endif
		},
		onReady(){
		},
		methods: {
			declick(type) {
				
				if(type=='tj'){
					this.isPlaying = true
					console.log('loading')
					this.isPaused = false
					setTimeout(() => {
						var data={
							flid:this.flid,
							page:this.page,
							type:type?type:''
						}
						postDhHyp(data).then(res=>{
							console.log(res.data)
							if(res.data.code==0){
								this.courseTJ=res.data.data
							}
						})
						console.log('end')
						this.isPaused = true
					}, 1500)
					this.page++
				}else{
					this.isPlaying1 = true
					console.log('loading')
					this.isPaused1 = false
					setTimeout(() => {
						var data={
							flid:this.flid,
							page:this.page1,
							type:type?type:''
						}
						postDhHyp(data).then(res=>{
							console.log(res.data)
							if(res.data.code==0){
								this.dujiaList=res.data.data
							}
						})
						console.log('end')
						this.isPaused1 = true
					}, 1500)
					this.page1++
				}
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
				
				}
				if(hh > 0){
				this.killhour=hh
				}
				if (mm > 0){
				this.killminute=mm
				}
				if(ss>0){
				this.killsecond=ss
				}
			},
			plugin_navigate(goodstype,goodsid,action){
				var e;
				if(goodstype=='course'){
					e='course-details'
					uni.navigateTo({
						url: `/pages/${e}/${e}?menuid=${goodsid}&action=${action}`
					});
				}else{
					if(goodstype=='mall'){
						e='shop-details'
					}else if(goodstype=='pxb'){
						e='agency-course-details'
					}
					uni.navigateTo({
						url: `/pages/${e}/${e}?id=${goodsid}&action=${action}`
					});
				}
			},
			// 去列表页面
			goListPage () {
				uni.navigateTo({
					url: `/pages/list-page/list-page?goodstype=course`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 去课程详情页面
			goCourseDetails (id) {
				uni.navigateTo({
					url: `/pages/course-details/course-details?menuid=${id}`
				})
			},
			swiper_change(e){
				this.swiper_bgcolor=this.images[e.detail.current].maincolor
			},

			// 页面跳转
			navigate(e,param){
				if(e=='vip'){
					uni.switchTab({
						url:'/pages/'+e+'/'+e
					})
				}else if(e=='course-list'){
					uni.navigateTo({
						url:'/pages/'+e+'/'+e+'?moretype='+param
					})
				}
				else {
					uni.navigateTo({
						url:'/pages/'+e+'/'+e
					})
				}
			},
			// 去课程列表页面
			goCourseList() {
				uni.navigateTo({
					url: `/pages/course-list/course-list?media=live&goodstype=course`
				});
			},
			// 获取轮播图和列表信息
			getIndexInfo() {
				getIndexInfo().then(res => {
					this.images = res.data.data.ads
					this.fls = res.data.data.classify
					this.index_courseTJ=res.data.data.courses
				})
			},
			
			// 获取首页分类列表信息
			postIndexGoods(id,key) {
				this.current = key
				this.flid = id
				getIndexListInfo({flid: id}).then(res => {
					this.son_fls = res.data.data.son_fl
				})
				postIndexGoods({goods_label: 'is_tj', flid: id}).then(res => {
					if(res.data.code == 0) {
						this.courseTJ = res.data.data
					} else {
						this.courseTJ = []
					}
				})
				postIndexGoods({goods_label: '', flid: id}).then(res => {
					if(res.data.code == 0) {
						this.dujiaList = res.data.data
					} else {
						this.dujiaList = []
					}
				})
			},
			sonflCourseList(sonid) {
				uni.navigateTo({
					url: `/pages/course-list/course-list?flid=${this.flid}&sonflid=${sonid}&goodstype=course`
				})
			},
			postSearchCourse(e) {
				var keyword
				if(e == 'hot' || e == 'new' || e == 'free' ) {
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
			},
			color_change(){
				const ctx = uni.createCanvasContext('myCanvas')
					let src=this.HOST_URL+this.images[0].thumb
					uni.downloadFile({
					  url: src,
					  success: function (res) {
					    var filePath = res.tempFilePath;
					    uni.getImageInfo({
					    	src: filePath,
					    	success: function (image) {
					    		ctx.drawImage(filePath, 0, 0, 375, 138.5)
					    		ctx.draw()
								setTimeout(function(){
									uni.canvasGetImageData({
									  canvasId: 'myCanvas',
									  x: 0,
									  y: 0,
									  width: 50,
									  height: 50,
									  success(res) {
										let imgdata = res.data
										var arr=[]
										var i = 0, len = res.data.length
										for(i ; i<len ; i+=4 ) {
										  arr.push(imgdata[i]+','+imgdata[i+1]+','+imgdata[i+2])
										}
										if(arr!=[]){
											var obj = {};
											for(var j= 0, l = arr.length; j< l; j++){
												var item = arr[j];
												obj[item] = (obj[item] +1 ) || 1;
											}
											console.log(obj)
											var keys = Object.keys(obj)    
											var maxNum = 0, maxEle    
											for (var i=0,l = keys.length;i<l;i++) {
											if (obj[keys[i]] > maxNum) {
													maxNum = obj[keys[i]]
													maxEle = keys[i]
												}
											}
											console.log(maxEle)
										}
									  }
									})
								},500)
					    	}
					    });
					  }
					});
			},
		}
	}
</script>


<style lang="less">
@import './index.less';
@import './goods-course.less';
@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(720deg);
	}
}
.an {
	animation: rotation 2s infinite linear;
}
.pause {
	animation-play-state: paused;
}
</style>