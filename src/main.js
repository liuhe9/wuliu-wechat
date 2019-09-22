import Vue from 'vue'
import App from './App'
import Bar from '@/components/liuhe-cs/bar.vue'
import mixin from '@/utils/mixin'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.component('Bar', Bar)
Vue.mixin(mixin)

const app = new Vue({
    ...App
})
app.$mount()