/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="https://www.zsffzxkc.cn"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles:
				{
					progress: 
					{
						color: '#FF3333'
					}
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
