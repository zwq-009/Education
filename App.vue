/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<script>
export default {
	onLaunch: function(e) {
		if(e.query){
			console.log(e.query)
			const scene = decodeURIComponent(e.query.scene)
			if(e.query.pid && e.query.pid!=''){
				uni.setStorageSync('pid',e.query.pid)
			}else if(scene && scene!=''){
				uni.setStorageSync('pid',scene)
			}
		}
		uni.HOST_URL = 'https://zsff.sxjiangyan.com'
		uni.H5_URL = 'https://h5.sxjiangyan.com'
		uni.BASE_URL='https://zsff.sxjiangyan.com/index.php/'
		uni.WSS_URL = 'wss://zsff.sxjiangyan.com/wss'
		const BASE_URL = uni.BASE_URL
		uni.request({
			url: BASE_URL+'index/set/base_set',
			method:'GET',
			success:(res) =>{
				console.log(res.data);
				if(res.data.data.title==''){
					res.data.data.title='知识付费在线课程'
				}
				uni.setStorageSync('base_set',res.data.data)
			},
			fail:(res)=> {
				console.log(res.data);
			}
		});
		// #ifdef H5
		var set=uni.getStorageSync('base_set')
		var that=this
		var userinfo=uni.getStorageSync('userinfo')
		const HOST_URL=uni.HOST_URL
		
		if(userinfo && userinfo.uid){
			var link=uni.H5_URL+'?pid='+userinfo.uid
		}else{
			var link=uni.H5_URL
		}
		if (this.$jwx && this.$jwx.isWechat()) {
			this.$jwx.share({
				'title': set.share_title,
				'desc': set.share_desc,
				'link': link,
				'img_url': HOST_URL+set.share_icon,
			})
			this.$jwx.sharepyq({
				'title': set.share_title,
				'link': link,
				'img_url': HOST_URL+set.share_icon,
			})
		}
		// #endif
		// 学习时间
		const formatDate = (date, fmt) => {
		 date = new Date(date);
		 if (typeof (fmt) === "undefined") {
		  fmt = "yyyy-MM-dd HH:mm:ss";
		 }
		 if (/(y+)/.test(fmt)) {
		  fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		 }
		 let o = {
		  'Y': date.getFullYear(),
		  'M+': date.getMonth() + 1,
		  'd+': date.getDate(),
		  'H+': date.getHours(),
		  'm+': date.getMinutes(),
		  's+': date.getSeconds()
		 }
		 for (let k in o) {
		  if (new RegExp(`(${k})`).test(fmt)) {
		   let str = o[k] + ''
		   fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
		  }
		 }
		 return fmt
		}
		var date=formatDate(+new Date(), 'dd')
		var atime=uni.getStorageSync('atime')
		if(atime){
			var Adate=formatDate(atime.nowtime, 'dd')
			if(Adate!=date){
				uni.removeStorageSync('atime')
			}
		}
		var vtime=uni.getStorageSync('vtime')
		if(vtime){
			var Vdate=formatDate(vtime.nowtime, 'dd')
			if(Vdate!=date){
				uni.removeStorageSync('vtime')
			}
		}
		var tutime=uni.getStorageSync('tutime')
		if(tutime){
			var Tudate=formatDate(tutime.nowtime, 'dd')
			if(Tudate!=date){
				uni.removeStorageSync('tutime')
			}
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
body {
	background-color: #f6f6f6;
}

/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
/* #ifdef H5 */
    uni-page-head {
        display: none;
    }
/* #endif */

</style>
