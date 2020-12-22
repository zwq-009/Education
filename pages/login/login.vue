/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<style lang="less">
	page{
		background-color: #fff;
		font-size: 35upx;
		font-family: SimHei;
		color: #262626;
	}
	.header{
		display: flex;
		justify-content: space-between;
		padding: 30upx;
		align-items: center;
		image{
			width: 17upx;
			height: 30upx;
		}
	}
	.container1{
		&-img1{
			width: 243upx;
			height: 270upx;
			position: absolute;
			top:0;
			left:0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		&-img2{
			width: 218upx;
			height: 350upx;
			position: absolute;
			bottom:150upx;
			right:0;	
			image{
				width: 100%;
				height: 100%;
			}
		}
		.middle{
			margin-top: 150upx;
			width: 100%;
			z-index:99;
			&-item{
				display: flex;
				background-color: #e0e5ff;
				width: 75%;
				padding: 30upx 40upx;
				margin: 60upx auto;
				border-radius: 50upx;
				font-size: 30upx;
				
				image{
					width: 32upx;
					height: 40upx;
				}
				input{
					margin-left: 25upx;
				}
				.placeholder{
					font-size: 30upx;
				}
				.code{
					width: 50%;
					border-right: 1upx solid #ccc;
				}
				.getcode{
					text-align: center;
					display: flex;
					align-items: center;
					border: none;
					font-size: 30upx;
					outline: none;
					  border-radius: 0;
					  background-color: transparent;
					  line-height: inherit;
					  width: max-content;
				}
				.getcode:after{
					border: none;
				}
			}
			.loginbtn{
				font-size: 35upx;
				display: flex;
				align-items: center;
				text-align: center;
				margin-top: 120upx;
				color: #fff;
				background-image: linear-gradient(to right, #a9b7ff , #3e5eff);
				background-size: 100% 100%;
				text{
					margin: 0 auto;
				}
			}
			.info{
				margin-top: 30upx;
				text-align: center;
				font-size: 30upx;
			}
			.regbtn{
				color:#3e5eff;
			}
		}
		.bottom{
			margin-top: 160upx;
			.logintype{
				text-align: center;
				font-size: 30upx;
			}
			.wechat-login{
				border: none;
				background-color: transparent;
				outline: none;
				margin-top: 30upx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 94upx;
					height: 94upx;
				}
			}
			.wechat-login::after{
				border: none;
				outline: none;
			}
		}

	}
</style>

<template>
	<view class="container">
	<view class="header">
		<image src="../../static/back.png" mode="aspectFit"></image>
		<text>注册登录</text>
		<text> </text>
	</view>
	<view class="container1">
		<view class="container1-img1">
			<image src="../../static/top-c1.png" mode="aspectFit"></image>
		</view>
		<view class="container1-img2">
			<image src="../../static/bot-c2.png" mode="aspectFit"></image>
		</view>
		<view class="middle">
			<view class="middle-item">
				<image src="../../static/account-icon.png" mode="aspectFit"></image>
				<input type="text" value="" placeholder="请输入您的手机号" placeholder-class="placeholder" @input="phoneinput"/>
			</view>
			<view class="middle-item" v-if="reg || bindphone">
				<image src="../../static/code.png" mode="aspectFit"></image>
				<input class="code" type="text" value="" placeholder="请输入您的验证码" placeholder-class="placeholder" @input="change_code"/>
				<button class="getcode" @click="getcode" :disabled="flag">{{timetext}}</button>
			</view>
			<view class="middle-item" v-if="!bindphone">
				<image src="../../static/password-icon.png" mode="aspectFit"></image>
				<input type="password" value="" placeholder="请输入您的登录密码" placeholder-class="placeholder" @input="change_password"/>
			</view>
			<view class="middle-item" v-if="reg">
				<image src="../../static/password-icon.png" mode="aspectFit"></image>
				<input type="password" value="" placeholder="请再次输入您的密码" placeholder-class="placeholder" @input="change_repassword"/>
			</view>
			<view class="middle-item loginbtn" v-if="reg || bindphone" @click="regbtn">
				<text v-if="!bindphone">立即注册</text>
				<text v-if="bindphone">绑定手机号</text>
			</view>
			<view class="middle-item loginbtn" v-if="!reg &&!bindphone" @click="login">
				<text>立即登录</text>
			</view>
			<view class="info" v-if="reg &&!bindphone">
				<text class="regbtn" @click="login_now">返回登录</text>
			</view>
			<view class="info" v-if="!reg &&!bindphone">
				<text>还没有账号？点击</text><text class="regbtn" @click="reg_now">立即注册</text>
			</view>
			<view class="info" v-if="bindphone">
				<text>如手机号已被占用,请点击</text><text class="regbtn" @click="qhzh">切换账号</text>
			</view>
		</view>
		<view class="bottom" v-if="!reg &&!bindphone">
			<view class="logintype">
				更多登录方式
			</view>
			<button class="wechat-login" @click="wxlogin" open-type="getUserInfo">
				<image src="../../static/wechat.png" mode="aspectFit"></image>
			</button>
		</view>
	</view>
	</view>
</template>

<script>
	import {wx_login} from '@/request/checkUserinfo'
	export default {
		
		data() {
			return {
				reg:false,
				phonenum:'',
				code:'',
				password:'',
				repassword:'',
				flag:false,
				timetext:'获取验证码',
				bindphone:false
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
			var bindphone1=e.bindphone
			if(bindphone1==1){
				this.bindphone=true
			}
		},
		onShow() {
			// #ifdef H5
			   //wx_login()
			// #endif
		},
		methods: {
			qhzh(){
				uni.showModal({
				    title: '提示',
				    content: '确定要切换账号吗？',
				    success: function (res) {
				        if (res.confirm) {
									uni.removeStorageSync('userinfo')
									uni.switchTab({
										url:'/pages/index/index'
									})
								} else if (res.cancel) {
										console.log('用户点击取消');
								}
				    }
				});
			},
			wxlogin(){
				wx_login()
			},
			phoneinput(e){
				this.phonenum=e.detail.value
			},
			reg_now(){
				this.reg=true;
			},
			login_now(){
				this.reg=false;
			},
			change_code(e){
				this.code=e.detail.value
			},
			change_password(e){
				this.password=e.detail.value
			},
			change_repassword(e){
				this.repassword=e.detail.value
			},
			login(){
				const BASE_URL=uni.BASE_URL
				var that=this;
				let phone = that.phonenum;
				let password = that.password;
				if(phone==''){
				  uni.showToast({
				      title: '手机号码不能为空',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
				    uni.showToast({
				        title: '手机号码格式不正确,请重试',
				        duration: 2000,
						icon:'none'
				    });
				    return false;
				}
				if(password==''){
				  uni.showToast({
				      title: '密码不能为空',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}
				uni.request({
					url: BASE_URL+'index/user/login',
					data: {
						phone:phone,
						password:password
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data);
						if(res.data.code=="0"){
							uni.showToast({
								title: res.data.msg,
								duration: 1500
							});
							uni.setStorageSync('userinfo',res.data.data);
							uni.navigateBack();
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon:'none'
							});
						}
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
			regbtn(){
				const BASE_URL=uni.BASE_URL
				var that=this;
				const userinfo= uni.getStorageSync('userinfo');
				let phone = that.phonenum;
				let code = that.code;
				let password = that.password;
				let repassword = that.repassword;
				if(phone==''){
				  uni.showToast({
				      title: '手机号码不能为空',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
				    uni.showToast({
				        title: '手机号码格式不正确,请重试',
				        duration: 2000,
						icon:'none'
				    });
				    return false;
				}
				if(code==''){
				  uni.showToast({
				      title: '验证码不能为空',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}else{
					var re=/^\d{6}$/;
					if(!re.test(code)){
						uni.showToast({
						    title: '验证码格式不正确',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
				}
				if(that.bindphone==false){
				if(password==''){
				  uni.showToast({
				      title: '密码不能为空',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}else{
					var  re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
					if(!re.test(password)){
						uni.showToast({
						    title: '密码至少包含大写字母，小写字母，数字，且不少于8位',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
				}
				if(repassword==''){
				  uni.showToast({
				      title: '确认密码不能为空',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}else{
					var  re =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
					if(!re.test(repassword)){
						uni.showToast({
						    title: '密码至少包含大写字母，小写字母，数字，且不少于8位',
						    duration: 2000,
							icon:'none'
						});
						return false;
					}
				}
				if(repassword!=password){
				  uni.showToast({
				      title: '两次密码不一致,请重试',
				      duration: 2000,
					  icon:'none'
				  });
				  return false;
				}
				uni.request({
					url: BASE_URL+'index/user/reg',
					data: {
						phone:phone,
						code:code,
						password:password
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data);
						if(res.data.code=="0"){
							uni.showToast({
								title: res.data.msg,
								duration: 1500
							});
							setTimeout(function(){
								uni.showModal({
								    title: res.data.msg,
								    content: '是否立即登录？',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('用户点击确定');
											that.reg=false;
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
								});
							},1500)
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon:'none'
							});
						}
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
				}
				else{
					uni.request({
						url: BASE_URL+'index/user/bindphone',
						data: {
							uid:userinfo.userdata.id,
							phone:phone,
							code:code,
						},
						method:'POST',
						success:(res) =>{
							console.log(res.data);
							if(res.data.code=="0"){
								uni.showToast({
									title: res.data.msg,
									duration: 1500
								});
								userinfo.phone=phone
								uni.setStorageSync('userinfo',userinfo)
								setTimeout(function(){
									uni.navigateBack()
								},1000)
								
							}else{
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
									icon:'none'
								});
							}
						},
						fail:(res)=> {
							console.log(res.data);
						}
					});
				}
			},
			//发送验证码
			getcode(){
				var that=this
				var time = 60;
			   //设置点击标记，防止60内再次点击生效
				var phone = that.phonenum;
				const BASE_URL=uni.BASE_URL
				if(phone==''){
				  uni.showToast({
					  title: '手机号码不能为空',
					  duration: 2000,
					  icon:'none'
				  });
				  return false;
				}
				else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
					uni.showToast({
						title: '手机号码格式不正确,请重试',
						duration: 2000,
						icon:'none'
					});
					return false;
				}else{
					that.flag = true;
				}
				if(that.flag){
					var timer = setInterval(function () {
						if(time == 60 && that.flag){
							that.flag = false;
							uni.request({
								url: BASE_URL+'index/user/sendcode',
								data: {
									phone:phone
								},
								method:'POST',
								success:(res) =>{
									console.log(res.data);
									if(res.data.data.Code=='OK'){
										uni.showToast({
											title: '已发送',
											duration: 2000
										});
									}else{
										uni.showToast({
											title: '发送失败',
											duration: 2000,
											icon:'none'
										});
									}
								},
								fail:(res)=> {
									console.log(res.data);
								}
							});
						}else if(time == 0){
							clearInterval(timer);
							time = 60;
							that.flag = false;
							that.timetext="获取验证码"
						}else {
							that.flag = true;
							that.timetext=time+' s'
							time--;
						}
					},1000);
				}
			}
		}
	}
</script>

