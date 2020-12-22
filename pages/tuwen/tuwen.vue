/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<style lang="less" scoped>
page{
	background-color: #fff;
	font-family: SimHei;
}
.header{
	font-size: 30upx;
	font-weight: 700;
	padding:30upx 25upx;
	display: flex;
	align-items: center;
	image{
		width: 53upx;
		height: 49upx;
		margin-right: 15upx;
	}
}
.content{
	font-size: 28upx;
	padding: 0 25upx;
}
</style>

<template>
	<view class="container">
		<view class="header">
			<image src="../../static/kechengjianjie.png" mode="aspectFit"></image>
			课程详情
		</view>
		<view class="content">
			<u-parse :content="twdetail.introduce" @navigate="navigate"></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default{
		components:{
			uParse
		},
		data(){
			return{
				twdetail:[],
				tuwenStudyTime:0,
				t1:''
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
		onLoad(e) {
			let twid=e.twid
			let menu_free=e.is_free
			this.gettuwen(twid,menu_free)
			this.countTutime()
		},
		onUnload() {
			clearInterval(this.t1)
			this.saveTutime()
		},
		onReady() {
		},
		onShow() {

		},
		methods:{
			saveStudytime(studytime,media){
				let userinfo = uni.getStorageSync('userinfo')
				const BASE_URL = uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/user/save_studytime',
					method:'POST',
					data:{
						uid:userinfo.uid,
						media:media,
						studytime:studytime
					},
					success:(res) =>{
						console.log(res.data);
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			saveTutime(){
				var tutime=uni.getStorageSync('tutime')
				var data={}
				if(tutime){
					data.tutime=tutime.tutime+this.tuwenStudyTime
					data.nowtime=(new Date()).getTime()
					uni.setStorageSync('tutime',data)
					this.saveStudytime(data.tutime,'tuwen')
				}else{
					data.tutime=this.tuwenStudyTime
					data.nowtime=(new Date()).getTime()
					uni.setStorageSync('tutime',data)
					this.saveStudytime(data.tutime,'tuwen')
				}
			},
			countTutime(){
				this.t1=setInterval(()=>{
					this.tuwenStudyTime++
				},1000)
			},
			pay(){
				uni.navigateTo({
					url:'/pages/confirm-order-form/confirm-order-form?menuid='+this.twdetail.menuid+'&sonid='+this.twdetail.id
				})
			},
			gettuwen(twid,menu_free){
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/courses/tuwendetail',
					data: {
						twid:twid
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data);
						if(res.data.code=="0"){
							this.twdetail=res.data.data
							uni.setNavigationBarTitle({
							    title: this.twdetail.coursename?this.twdetail.coursename:'图文详情'
							});
							let freetime=this.twdetail.freesecond
							let menuid=this.twdetail.menuid
							let sonid=this.twdetail.id
							if(menu_free==0){
								setTimeout(function(){
									uni.showModal({
										title: '试读结束',
										content: '需要解锁该课程吗?',
										success: function (res) {
											if (res.confirm) {
												uni.navigateTo({
													url:'/pages/confirm-order-form/confirm-order-form?menuid='+menuid+'&sonid='+sonid
												})
											} else if (res.cancel) {
												//uni.navigateBack()
											}
										}
									});
								},freetime*1000)
							}
						}
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			}
		}
	}
</script>

