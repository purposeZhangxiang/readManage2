import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'


//全局导入ElementUI模块和CSS样式并使用
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
//引入font-face
import './assets/font_face/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
