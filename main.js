/**
 * 知识付费在线课程v2.0.0
 * Author: 山西匠言网络科技有限公司
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
import Vue from 'vue'
import App from './App'
// #ifdef H5
import jwx from '@/request/jwx.js'
Vue.prototype.$jwx = jwx
// #endif
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
