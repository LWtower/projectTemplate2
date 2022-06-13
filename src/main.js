import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router, // 路由配置
  store, // 状态管理
}).$mount('#app')
