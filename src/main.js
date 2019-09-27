import Vue from 'vue'
import App from './App'
import Bar from '@/components/liuhe-cs/bar.vue'
import mixin from '@/mixins/mixin'
import my_global from '@/utils/my_global'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.component('Bar', Bar)
Vue.prototype.my_global = my_global
Vue.mixin(mixin)

const app = new Vue({
    ...App
})
app.$mount()