<template>
	 <view class="pageContain">
		   <view @click="fristCurrent(item)"  class="row right-border">{{firstTitle}}</view>
		   <view @click="upCurrent(item)" class="row right-border">{{upTitle}}</view>
		   <view class="midClass">
			   <view @click="handleCurrent(item)" class="item right-border" :class="[chooseIndex===item?'active':'']" v-for="(item,index) in pageArr" :key="index" >{{item}}</view>
		   </view>
		   <view @click="downCurrent(item)" class="row">{{downTitle}}</view>
		   <view @click="endCurrent(item)" class="row  left-border">{{endTitle}}</view>
	 </view>
	
</template>

<script>
	export default{
		"name":'ZhiniPagination',
		"props":{
			"currentPage":{
				type:Number,
				default:1
			},
			"totalPage":{
			
					type:Number,
					default:12
			
			},
			"showPage":{
				
					type:Number,
					default:3
				
			},
			"firstTitle":{
				
					type:String,
					default:'首页'
				
			},
			"endTitle":{
				
					type:String,
					default:'尾页'
			
			},
			"upTitle":{
			
				type:String,
				default:'上一页'
			
			},
			"downTitle":{
				
				type:String,
				default:'下一页'
				
			}
		},
		data(){
			return{
				
				chooseIndex:1,
				item:0
			}
		},
		mounted() {
		
		},
		
		computed:{
		   pageArr(){
				const totalPage=this.totalPage;       //总页码
				const currentPage=this.currentPage;   //当前页码
				let pageArr=[]                      //初始化页码数组
				const showPage=this.showPage;         //指的是在...和...之间所有的方块view的数目
				
				
				//1. 当最大页码 小于 showPage时
				if(totalPage<=showPage){
					for(let x=1;x<=totalPage;x++){
						pageArr.push(x);
					}
					
					
					return  pageArr
				}
				
				// 2. 当最大页码 大于 showPage时
				
			   if(totalPage>showPage){
				const leftArr=[];
				const isEven=showPage%2;
				const rightArr=[];
				const midArr=[];
				// showPage 为奇数时
				
					let startNum=1;
					let endNum=0;
					const flagNum=isEven?(showPage-1)/2:showPage/2;
					if(currentPage-flagNum>2){
						leftArr.push(1);
						leftArr.push('...');
						startNum=currentPage-flagNum;
					}		
						
						endNum=currentPage+flagNum;
						if(endNum>totalPage-2 ){
							endNum=totalPage
						}
						
						if(endNum<=totalPage-2){
							rightArr.push('...');
							rightArr.push(totalPage);
						}
						
						for(let x=startNum;x<=endNum;x++){
							midArr.push(x);
						}
						
						
				    pageArr=leftArr.concat(midArr,rightArr);		
						
				}
		   		
				return pageArr
		   }	
		},
		methods:{
		
			handleCurrent(item){
				console.log(111);
				
				if(item=='...'){
					return;
				}
				
				
				this.chooseIndex=item;
				// this.currentPage=item;
				this.$emit('pageNum',item);
				this.$emit('update:currentPage', item);
					
				
			},
			fristCurrent(){
				this.handleCurrent(1);
			},
			endCurrent(){
				this.handleCurrent(this.totalPage);
			},
			upCurrent(){
				if(this.currentPage==1){
					return
				}
				this.handleCurrent(this.currentPage-1);
			},
			downCurrent(){
				if(this.currentPage==this.totalPage){
					return
				}
				this.handleCurrent(this.currentPage+1);
			}
		}
		
	}
		
</script>

<style>
	.pageContain{
		display:flex;
		justify-content: center;
	}
	.midClass{
		display: flex;
	}
	.row{
		background: #efefef;
		font-size: 24rpx;
		text-align: center;
		line-height:56rpx;
		height: 56rpx;
		padding: 2rpx 6rpx;
		border: 1rpx solid #c1c1c1;
	}
	.left-radius{
		border-top-left-radius: 4rpx;
		border-bottom-left-radius: 4rpx;
	}
	.right-radius{
		border-top-right-radius: 4rpx;
		border-bottom-right-radius: 4rpx;
	}
	.left-border{
		border-left:none !important;
	}
	.right-border{
		border-right:none !important;
	}
	.item{
		width:52rpx;
		height:60rpx;
		line-height: 60rpx;
		text-align:center;
		border: 1rpx solid #c1c1c1;
		font-size:28rpx;
		background:#EFEFEF;
	}
	.active{
		background:#2C405A;
		color:#fff;
	}
</style>
