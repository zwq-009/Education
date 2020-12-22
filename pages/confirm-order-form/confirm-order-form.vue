/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<style lang="less" scoped>
	page{
		font-size: 31upx;
		font-family: SimHei;
	}
// 确认订单
// .qrdd {
// 	height: 100upx;
// 	background-color: #fff;
// 	text-align: center;
// 	line-height: 100upx;
// 	text {
// 		font-size: 32upx;
// 		font-weight: 700;
// 		color: #000;
// 	}
// }


// 添加地址
.address {
	height: 96upx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding:20upx 0;
	margin-bottom: 20upx;
	view{
		text {
			font-size: 30upx;
			color: #666;
		}
		image {
			width: 14upx;
			height: 24upx;
			position: absolute;
			right: 20upx;
		}
	}
	.shrinfo{
		view{
			margin-top: 10upx;
		}
		&-box1{
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		
	}
}


// 订单内容
.dd-content {
	font-size: 31upx;
	&-item {
		height: 180upx;
		background-color: #fff;
		padding: 0 20upx;
		border-bottom: 2upx solid #e5e5e5;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.item-left {
			width: 128upx;
			height: 128upx;
		}
		.item-right {
			width: 550upx;
			height: 124upx;
			margin-left: 24upx;
			&-top {
				font-size:28upx;
				color: #414141;
				display: flex;
				justify-content: space-between;
			}
			&-center {
				margin-top: 10upx;
				font-size: 28upx;
				color: #414141;
				display: flex;
				justify-content: space-between;
			}
			&-bottom {
				font-size: 25upx;
				color: #999;
				margin-top: 25upx;
				text-align: right;
			}
		}
	}
	.promotion-code {
		font-size: 31upx;
		height: 90upx;
		background-color: #fff;
		border-bottom: 2upx solid #e5e5e5;
		padding: 0 30upx;
		box-sizing: border-box;
		align-items: center;
		display: flex;
		justify-content: space-between;
		view{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			text {
				color: #333;
			}
			input {
				height: 50upx;
				text-align: center;
			}
		}
		
	}
	.freight {
		font-size: 31upx;
		height: 90upx;
		background-color: #fff;
		border-bottom: 2upx solid #e5e5e5;
		padding: 0 35upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text {
			color: #333;
		}
	}
}

// 订单备注
.ddbz {
	font-size: 31upx;
	margin-top: 20upx;
	height: 150upx;
	background-color: #fff;
	padding: 0 35upx;
	padding-top: 20upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	text {
		color: #333;
	}
	textarea {
		width: 100%;
		height: 120upx;
		// background-color: orange;
		margin-top: 20upx;
	}
}


// 支付方式
.zffs {
	padding: 0 30upx;
	margin-top: 20upx;
	font-size: 31upx;
	background-color: #fff;
	margin-bottom: 150rpx;
	.zhifu-mode {
		font-size: 31upx;
		height: 70upx;
		border-bottom: 2upx solid #e5e5e5;
		line-height: 70upx;
		text {
			color: #333;
		}
	}
	.zhifubao {
		padding: 30upx 25upx;
		border-bottom: 2upx solid #e5e5e5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.weixin-center {
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 54upx;
				height: 54upx;
			}
			text{
				margin-left: 15upx;
				font-size: 28upx;
				color: #666;
			}
		}
		.radio {
			
		}
	}
}



// 支付
.pay {
	width: 100%;
	padding: 25upx 30upx;
	box-sizing: border-box;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: fixed;
	left: 0;
	bottom: 0;
	font-size: 30upx;
	text:nth-child(1) {
		color: #a7a7a7;
	}
	text:nth-child(2) {
		color: #000;
	}
	button {
		height: 68upx;
		margin: 0 0 0 30upx;
		outline: none;
		padding: 0 80upx;
		border: none;
		background-color: #ff402b;
		color: #fff;
		text-align: center;
		line-height: 68upx;
	}
}


</style>

<template>
	<view class="container">
		
		<!-- 确认订单 -->
		<!-- <view class="qrdd">
			<text>确认订单</text>
		</view> -->
		
		
		<!-- 添加地址 -->
		<view class="address" v-if="goodstype=='mall'" @click="navigate('shipping-address')">
			<view v-if="addressinfo==''">
				<text> + 您还没有收货地址，请点击选择或添加</text>
				<image src="../../static/xiangyou11.png" mode=""></image>
			</view>
			<view v-if="addressinfo!=''" class="shrinfo">
				<view class="shrinfo_box1">
					<text>收件人:{{addressinfo.shr_name}}</text>
					<text style="margin-left: 40upx;">{{addressinfo.phone}}</text>
				</view>
				<view class="">
					<text>{{addressinfo.area+addressinfo.address}}</text>
				</view>
			</view>
		</view>
		
		
		<!-- 订单内容 -->
		<view class="dd-content">
			<view class="dd-content-item" v-if="goodstype=='chongzhi'">
				<image class="item-left" src="../../static/money.png" mode="aspectFit"></image>
				<view class="item-right">
					<view class="item-right-top">
						<text>余额充值</text>
						<text>￥{{czmoney}}</text>
					</view>
					<view class="item-right-bottom">
						<text></text>
					</view>
				</view>
			</view>
			<view class="dd-content-item" v-if="goodstype=='vip'">
				<image class="item-left" src="../../static/user-vip.png" mode="aspectFit"></image>
				<view class="item-right">
					<view class="item-right-top">
						<text>{{viptimeinfo.name}}</text>
						<text>￥{{viptimeinfo.price}}</text>
					</view>
					<view class="item-right-bottom">
						<text></text>
					</view>
				</view>
			</view>
			<view class="dd-content-item" v-if="goodstype=='course'">
				<image class="item-left" :src="HOST_URL+courseinfo.thumb" mode="aspectFit"></image>
				<view class="item-right">
					<view class="item-right-top">
						<text>{{courseinfo.menuname?courseinfo.menuname:courseinfo.coursename}}</text>
						<text>￥{{courseinfo.price}}</text>
					</view>
					<view class="item-right-bottom">
						<text>x1</text>
					</view>
				</view>
			</view>
			<view class="dd-content-item" v-if="goodstype=='pxcourse'">
				<image class="item-left" :src="HOST_URL+pxcourse.thumb" mode="aspectFit"></image>
				<view class="item-right">
					<view class="item-right-top">
						<text>{{pxcourse.name}}</text>
						<text>￥{{pxcourse.price}}</text>
					</view>
					<view class="item-right-bottom">
						<text>x1</text>
					</view>
				</view>
			</view>
			<view v-if="goodstype=='mall'">
				<view v-if="shopcarlist==true">
					<view class="dd-content-item" v-for="(item, index) in carlistdata" :key="index">
						<image class="item-left" :src="HOST_URL+item.main_thumb" mode="aspectFit"></image>
						<view class="item-right">
							<view class="item-right-top">
								<text>{{item.name}}</text>
								<text>￥{{item.price}}</text>
							</view>

							<view class="item-right-bottom">
								<text>x{{item.amount}}</text>
							</view>
							<view class="item-right-center">
								<text></text>
								<text>￥{{item.total}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="dd-content-item" v-if="shopcarlist==false">
					<image class="item-left" :src="HOST_URL+goodsinfo.main_thumb" mode="aspectFit"></image>
					<view class="item-right">
						<view class="item-right-top">
							<text>{{goodsinfo.name}}</text>
							<text>￥{{goodsinfo.price}}</text>
						</view>
<!-- 						<view class="item-right-center">
							<text>黑色XL</text>
							<text>￥{{goodsinfo.oldprice}}</text>
						</view> -->
						<view class="item-right-bottom">
							<text>x1</text>
						</view>
					</view>
				</view>
			</view>
			<!-- promotion-code = 优惠码 -->
			<view class="promotion-code" v-if="goodstype=='course' && sonid=='' && action=='' ">
				<view >
				<text>优惠码</text>
				<input type="text" @input="changeYhm" placeholder="请输入优惠码" />
				<button type="primary" size="mini" @click="yhmbtn">使用</button>
				</view>
			</view>
			<view class="promotion-code" v-if="goodstype=='mall' && action=='' ">
				<view >
				<text>优惠码</text>
				<input type="text" placeholder="请输入优惠码" />
				<button type="primary" size="mini">使用</button>
				</view>
			</view>

			<view v-if="goodstype=='pxcourse'">
				<view class="promotion-code">
					<text><text style="color: #DD524D;"> * </text>姓名</text>
					<input type="text" placeholder="请输入您的姓名" @input='changeName' />
				</view>
				<view class="promotion-code">
					<text><text style="color: #DD524D;"> * </text>电话</text>
					<input type="text" placeholder="请输入您的电话" @input='changePhone' />
				</view>
			</view>
			<!-- freight = 运费 -->
			<view class="freight" v-if="goodstype=='mall'">
				<text>运费</text>
				<text>{{postage}}元</text>
			</view>
		</view>
		
		
		<!-- 订单备注 -->
		<view class="ddbz" v-if="goodstype=='mall'">
			<text>订单备注</text>
			<textarea placeholder="在此填写您对本次交易的说明" @input='changeRemarks' />
		</view>
		
		
		<!-- 支付方式 -->
		<view class="zffs">
			<view class="zhifu-mode">
				<text>请选择支付方式</text>
			</view>
			<radio-group @change="radioChange">
			<view class="zhifubao" v-for="(item, index) in items" :key="item.value">
				<view class="weixin-center" v-if="action!='credit' ">
					<image :src="item.icon" mode="aspectFit"></image>
					<text v-if="item.value!='balance' ">{{item.name}}</text>
					<text v-if="item.value=='balance' ">{{item.name}} (￥{{balance}})</text>
				</view>
				<view class="weixin-center" v-if="action=='credit' ">
					<image :src="item.icon" mode="aspectFit"></image>
					<text>{{item.name}} (当前积分:{{userinfo.credit}})</text>
				</view>
				<label class="radio">
					<radio :value="item.value" :checked="index === current"/>
				</label>
			</view>
			</radio-group>
		</view>
		
		
		<!-- 支付 -->
		<view class="pay" v-if="action=='' ">
			<text>合计：</text>
			<text>￥{{total}}</text>
			<!-- #ifdef MP-WEIXIN -->
			<button @click="pay" open-type="getUserInfo">支付</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button @click="pay" >支付</button>
			<!-- #endif -->
		</view>
		<view class="pay" v-if="action=='credit' ">
			<text>积分：</text>
			<text>{{creditinfo.credit}}</text>
			<button @click="pay" >兑换</button>
		</view>
		<view class="pay" v-if="action=='seckill' ">
			<text>秒杀价合计：</text>
			<text>￥{{total}}</text>
			<!-- #ifdef MP-WEIXIN -->
			<button @click="pay" open-type="getUserInfo">支付</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button @click="pay" >支付</button>
			<!-- #endif -->
		</view>
		<view class="pay" v-if="action=='pintuan' ">
			<text>拼团价合计：</text>
			<text>￥{{total}}</text>
			<!-- #ifdef MP-WEIXIN -->
			<button @click="pay" open-type="getUserInfo">支付</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button @click="pay" >支付</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {checkUserinfo} from '@/request/checkUserinfo'
	export default {
		data() {
			return {
				addressinfo:'',
				courseinfo:[],
				goodsinfo:[],
				pxcourse:[],
				shopcarlist:false,
				carlistdata:[],
				goodstype:'course',
				total:0,
				HOST_URL:'',
				current: 0,
				paytype:'wxpay',
				menuid:'',
				sonid:'',
				yhm:'',
				remarks:'',
				shr_name:'',
				shr_phone:'',
				carlistdataid:'',
				postage:0,
				items: [
					{
						value: 'wxpay',
						name: '微信支付',
						icon:'../../static/weixinzhifu.png',
					},
					{
						value: 'alipay',
						name: '支付宝支付',
						icon:'../../static/zhifubao.png'
					},
					{
						value: 'balance',
						name: '余额支付',
						icon:'../../static/money.png'
					},
				],
				shoppingInfo: '',
				viptimeinfo:[],
				czmoney:0,
				balance:'0.00',
				action:'',//判断传参行为
				creditinfo:{},
				userinfo:{},
				seckillinfo:{},
				pintuaninfo:{},
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
		onLoad(e) {
			this.goodstype=e.goodstype
			this.HOST_URL=uni.HOST_URL
			if(e.action){
				this.action=e.action
				if(e.action=='credit'){
					this.items=[{
						value: 'credit',
						name: '积分兑换',
						icon:'../../static/credit.png'
					}]
					this.paytype='credit'
				}
			}
			if(e.goodstype=='mall'){
				this.getmallset()
				if(e.shopcarlist=='1'){
					this.shopcarlist=true
					this.shopcardata()
				}else{
					postDataDetail({id: e.goodsid}).then(res => {
						console.log(res.data)
						this.goodsinfo=res.data.data
						this.total=(parseFloat(this.goodsinfo.price)*1+parseFloat(this.postage)).toFixed(2)
					})
					if(e.action=='credit'){
						this.get_creditinfo(e.goodsid,e.goodstype)
					}else if(e.action=='seckill'){
						this.get_seckillinfo(e.goodsid,e.goodstype)
						
					}else if(e.action=='pintuan'){
						this.get_pintuaninfo(e.goodsid,e.goodstype)
						
					}
				}
			}else if(e.goodstype=='course'){
				if(e.sonid){
					this.sonid=e.sonid
				}
				console.log('sonid '+this.sonid)
				this.menuid=e.menuid
				this.getCourseInfo(e.menuid,e.sonid)
				if(e.action=='credit'){
					this.get_creditinfo(e.menuid,e.goodstype)
				}else if(e.action=='seckill'){
					this.get_seckillinfo(e.menuid,e.goodstype)
				}else if(e.action=='pintuan'){
					this.get_pintuaninfo(e.menuid,e.goodstype)
				}
			}else if(e.goodstype=='pxcourse'){
				this.pxcourseinfo(e.id)
				if(e.action=='credit'){
					this.get_creditinfo(e.id,e.goodstype)
				}else if(e.action=='seckill'){
					this.get_seckillinfo(e.id,e.goodstype)
				}else if(e.action=='pintuan'){
					this.get_pintuaninfo(e.id,e.goodstype)
				}
			}else if(e.goodstype=='vip'){
				this.getvipinfo(e.id)
			}else if(e.goodstype=='chongzhi'){
				this.czmoney=e.czmoney
				this.total=Number(e.czmoney)
				this.items.pop()
			}
		},
		onUnload() {
			uni.removeStorageSync('checked_addressid')
			this.menuid=''
			this.sonid=''
		},
		onShow() {
			checkUserinfo()
			const userinfo_check= uni.getStorageSync('userinfo');
			if(userinfo_check){
				this.balance=userinfo_check.userdata.money
				this.userinfo=userinfo_check.userdata
				var checked_addressid=uni.getStorageSync('checked_addressid')
				if(checked_addressid!='' && checked_addressid!= null && checked_addressid){
					this.getaddress(checked_addressid)
				}else{
					this.getaddress('mr')
				}
			}
			
		},
		methods: {
			get_creditinfo(id,goodstype){
				const BASE_URL = uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/credit/creditinfo',
					data: {
						id:id,
						goodstype:goodstype
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data)
						this.creditinfo=res.data.data
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			get_seckillinfo(id,goodstype){
				const BASE_URL = uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/seckill/seckillinfo',
					data: {
						id:id,
						goodstype:goodstype
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data)
						this.seckillinfo=res.data.data
						this.postage=res.data.data.set.postage
						this.total=(parseFloat(res.data.data.price)*1+parseFloat(res.data.data.set.postage)).toFixed(2)
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			get_pintuaninfo(id,goodstype){
				const BASE_URL = uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/pintuan/pintuaninfo',
					data: {
						id:id,
						goodstype:goodstype
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data)
						this.pintuaninfo=res.data.data
						this.postage=res.data.data.set.postage
						this.total=(parseFloat(res.data.data.price)*1+parseFloat(res.data.data.set.postage)).toFixed(2)
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			changeYhm(e){
				this.yhm=e.detail.value
			},
			yhmbtn(){
				if(this.yhm==''){
					uni.showToast({
						title:'优惠码不能为空',
						icon:'none'
					})
					return false
				}
				if(this.sonid!=''){
					uni.showToast({
						title:'优惠码仅能用于课程目录购买',
						icon:'none'
					})
					return false
				}
				if(this.shopcarlist){
					uni.showToast({
						title:'优惠码仅能用于单个商品购买',
						icon:'none'
					})
					return false
				}
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/agent/yhmjh',
					data: {
						yhm:this.yhm,
						goodstype:this.goodstype,
						goodsid:this.menuid?this.menuid:this.goodsinfo.id
					},
					method:'POST',
					success:(res) =>{
						if(res.data.code==0){
							let yhprice=res.data.data.price
							if(Number(yhprice)>=Number(this.total)){
								this.total=0
								this.paytype='yhm'
							}else{
								this.total=(parseFloat(this.total)-parseFloat(yhprice)).toFixed(2)
							}
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
			getvipinfo(id){
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/vip/viptimeinfo',
					data: {id:id},
					method:'POST',
					success:(res) =>{
						this.viptimeinfo=res.data.data
						this.total=parseFloat(res.data.data.price)
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			getmallset(){
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/mall/set',
					method:'GET',
					success:(res) =>{
						this.postage=res.data.data.postage
						this.total=(parseFloat(this.total)+parseFloat(this.postage)).toFixed(2)
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			pxcourseinfo(id){
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/pxb/coursedetail',
					data: {id:id},
					method:'POST',
					success:(res) =>{
						this.pxcourse=res.data.data
						this.total=parseFloat(res.data.data.price)*1
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			changeName(e){
				this.shr_name=e.detail.value
			},
			changePhone(e){
				this.shr_phone=e.detail.value
			},
			changeRemarks(e){
				this.remarks=e.detail.value
			},
			getaddress(id){
				const BASE_URL=uni.BASE_URL
				const userinfo_check = uni.getStorageSync('userinfo');
				let uid=userinfo_check.uid
				if(id!='mr'){
					uni.request({
						url: BASE_URL+'index/user/get_address',
						data: {id:id},
						method:'POST',
						success:(res) =>{
							console.log(res.data);
							if(res.data.code==0){
								this.addressinfo=res.data.data
							}else{
								this.addressinfo=''
							}
							
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}else{
					uni.request({
						url: BASE_URL+'index/user/get_mr_address',
						data: {uid:uid},
						method:'POST',
						success:(res) =>{
							console.log(res.data);
							if(res.data.code==0){
								this.addressinfo=res.data.data
							}else{
								this.addressinfo=''
							}
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}
				
			},
			shopcardata(){
				var carlist=uni.getStorageSync('shop_trolley')
				console.log(carlist)
				carlist.forEach((item) => {
					postDataDetail({id: item.id}).then(res => {
						res.data.data.total=res.data.data.price*item.amount
						res.data.data.amount=item.amount
						this.carlistdata.push(res.data.data)
						this.carlistdataid+=(item.id+',')
						this.total+=parseFloat(res.data.data.total).toFixed(2)
					})
				})
				this.total=parseFloat(this.total)+parseFloat(this.postage)
			},
			navigate(e) {
				if(e == 'vip') {
					uni.switchTab({
						url: `/pages/${e}/${e}`
					})
				}else if(e=='shipping-address'){
					uni.navigateTo({
						url: `/pages/${e}/${e}?orderpage=1`
					});
				}
				else {
					uni.navigateTo({
						url: `/pages/${e}/${e}`
					});
				}
			},
			radioChange: function(evt) {
				this.paytype=evt.target.value
				console.log(this.paytype)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			pay(){
				let userinfo=uni.getStorageSync('userinfo')
				const BASE_URL=uni.BASE_URL
				
				if(this.paytype==''){
					uni.showToast({
						title:'请选择支付方式',
						icon:'none'
					})
					return false
				}
				
				var data={}
				if(this.goodstype=='chongzhi'){
					data={
						uid:userinfo.uid,
						pay_type:this.paytype,
						goodstype:this.goodstype,
						price:this.total
					}
				}
				else if(this.goodstype=='vip'){
					data={
						uid:userinfo.uid,
						menuid:this.viptimeinfo.id,
						pay_type:this.paytype,
						goodstype:this.goodstype,
						price:this.total
					}
				}else if(this.goodstype=='course'){
					data={
						uid:userinfo.uid,
						menuid:this.menuid,
						sonid:this.sonid,
						pay_type:this.paytype,
						goodstype:this.goodstype,
						price:this.total,
						yhm:this.yhm,
						media:this.courseinfo.media,
						order_type:this.action
					}
				}else if(this.goodstype=='pxcourse'){
					if(this.shr_name==''){
						uni.showToast({
							title:'请输入您的姓名',
							icon:'none'
						})
						return false
					}
					if(this.shr_phone==''){
						uni.showToast({
							title:'请输入您的电话',
							icon:'none'
						})
						return false
					}
					data={
						uid:userinfo.uid,
						menuid:this.pxcourse.id,
						pay_type:this.paytype,
						goodstype:this.goodstype,
						price:this.total,
						shr_name:this.shr_name,
						shr_phone:this.shr_phone,
						order_type:this.action
					}
				}
				else if(this.goodstype=='mall'){
					if(this.addressinfo==''){
						uni.showToast({
							title:'请选择或添加您的地址',
							icon:'none'
						})
						return false
					}
					if(!this.shopcarlist){
						data={
							uid:userinfo.uid,
							menuid:this.goodsinfo.id,
							pay_type:this.paytype,
							goodstype:this.goodstype,
							price:this.total,
							yhm:this.yhm,
							addressid:this.addressinfo.id,
							postage:this.postage,
							remarks:this.remarks,
							order_type:this.action
						}
					}else{
						data={
							uid:userinfo.uid,
							menuid:this.carlistdataid,
							pay_type:this.paytype,
							goodstype:this.goodstype,
							price:this.total,
							yhm:this.yhm,
							addressid:this.addressinfo.id,
							postage:this.postage,
							remarks:this.remarks,
							order_type:this.action
						}
					}
				}
				if(this.total==0){
					uni.request({
						url: BASE_URL+'index/pay/order_make',
						data: data,
						method:'POST',
						success:(res) =>{
							console.log(res.data);
							if(res.data.code==0){
								uni.showToast({
									title:'支付成功！'
								})
								setTimeout(function(){
									uni.switchTab({
										url:'../user/user'
									})
								},1000)
							}
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}else{
				if(this.paytype=='wxpay'){
				// #ifdef  MP-WEIXIN
				data.openid=userinfo.userdata.openid
				data.apptype='MP-WEIXIN'
					uni.request({
						url: BASE_URL+'index/pay/order_make',
						data: data,
						method:'POST',
						success:(res) =>{
							console.log(res.data);
							let paydata=res.data.data
								
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: String(paydata.timeStamp),
								    nonceStr: paydata.nonceStr,
								    package: paydata.package,
								    signType: paydata.signType,
								    paySign: paydata.sign,
								    success: function (res) {
								        console.log('success:' + JSON.stringify(res));
										uni.showToast({
											title:'支付成功！'
										})
										setTimeout(function(){
											uni.switchTab({
												url:'../user/user'
											})
										},800)
								    },
								    fail: function (err) {
								        console.log('fail:' + JSON.stringify(err));
								    }
								});

						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				
				// #endif
				// #ifdef  APP-PLUS
				data.apptype='APP-PLUS'
				uni.request({
					url: BASE_URL+'index/pay/order_make',
					data: data,
					method:'POST',
					success:(res) =>{
						console.log(res.data);
						let paydata=res.data.data
							uni.requestPayment({
							    provider: 'wxpay',
							    orderInfo:paydata,
							    success: function (res) {
							        console.log('success:' + JSON.stringify(res));
									uni.showToast({
										title:'支付成功！'
									})
									setTimeout(function(){
										uni.switchTab({
											url:'../user/user'
										})
									},800)
							    },
							    fail: function (err) {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
				
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
				// #endif
				// #ifdef H5
				var that=this
				if (this.$jwx && this.$jwx.isWechat()) {
					data.openid=userinfo.userdata.gzh_openid
					data.apptype='H5'
					uni.request({
						url: BASE_URL+'index/pay/order_make',
						data: data,
						method:'POST',
						success:(res) =>{
							console.log(res.data);
							let paydata=res.data.data
							this.$jwx.wxpay({
								'timestamp':String(paydata.timeStamp),
								'nonceStr':paydata.nonceStr,
								'package':paydata.package,
								'signType':paydata.signType,
								'paysign':paydata.sign
							},function (r) {
								if (r.errMsg == 'chooseWXPay:ok') {
									uni.showToast({
										title:'支付成功！'
									})
									setTimeout(function(){
										uni.switchTab({
											url:'../user/user'
										})
									},800)
								}else{  
									uni.showToast({
										title:'支付失败!',
										icon:'none'
									})
								}  
							}); 
				
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}
				// #endif
				}
				// wxpayend
				// credit
				else if(this.paytype=='credit'){
					data.apptype=''
					data.credit=this.creditinfo.credit
					data.order_type=this.action
					let credit=userinfo.userdata.credit
					if(Number(this.creditinfo.credit)>Number(credit)){
						uni.showToast({
							title:'积分不足！',
							icon:'none'
						})
						// setTimeout(function(){
						// 	uni.switchTab({
						// 		url:'../user/user'
						// 	})
						// },1000)
					}else{
						uni.request({
							url: BASE_URL+'index/pay/order_make',
							data: data,
							method:'POST',
							success:(res) =>{
								console.log(res.data);
								if(res.data.code==0){
									uni.showToast({
										title:'兑换成功！'
									})
									setTimeout(function(){
										uni.switchTab({
											url:'../user/user'
										})
									},1000)
								}
							},
							fail:(res)=> {
								console.log(res.data);
							}
						});
					}
				}
				// credit pay end
				// balance
				else if(this.paytype=='balance'){
					data.apptype=''
					let balance=userinfo.userdata.money
					if(Number(this.total)>Number(balance)){
						uni.showToast({
							title:'余额不足,请充值！',
							icon:'none'
						})
						// setTimeout(function(){
						// 	uni.switchTab({
						// 		url:'../user/user'
						// 	})
						// },1000)
					}else{
						uni.request({
							url: BASE_URL+'index/pay/order_make',
							data: data,
							method:'POST',
							success:(res) =>{
								console.log(res.data);
								if(res.data.code==0){
									uni.showToast({
										title:'支付成功！'
									})
									setTimeout(function(){
										uni.switchTab({
											url:'../user/user'
										})
									},1000)
								}
							},
							fail:(res)=> {
								console.log(res.data);
							}
						});
					}
				}
				// balance pay end
				// alipay start
				else if(this.paytype=='alipay'){
					// #ifdef  H5
					data.apptype='H5'
					uni.request({
						url: BASE_URL+'index/pay/order_make',
						data: data,
						method:'POST',
						success:(res) =>{
							let divForm = document.getElementsByTagName('divform')
							if (divForm.length) {
								document.body.removeChild(divForm[0])
							}
						    const div = document.createElement('divform')
						    div.innerHTML = res.data.body
						    document.body.appendChild(div)
						    document.getElementById('alipaysubmit').submit()
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
					// #endif
					// #ifdef  APP-PLUS
					data.apptype='APP-PLUS'
					uni.request({
						url: BASE_URL+'index/pay/order_make',
						data: data,
						method:'POST',
						success:(res) =>{
							let paydata=res.data.body
							uni.requestPayment({
							    provider: 'alipay',
							    orderInfo:paydata,
							    success: function (res) {

									uni.showToast({
										title:'支付成功！'
									})
									setTimeout(function(){
										uni.switchTab({
											url:'../user/user'
										})
									},800)
							    },
							    fail: function (err) {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
					// #endif

				}
				
				}

			},
			getCourseInfo(menuid,sonid){
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/courses/courseinfo',
					data: {
						menuid:menuid,
						sonid:sonid
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data);
						if(res.data.code=="0"){
							this.courseinfo=res.data.data
							this.total=parseFloat(this.courseinfo.price)*1
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

