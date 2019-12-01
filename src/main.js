import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from '@/core/store'

import 'lib-flexible/flexible.js'
import 'font-awesome/css/font-awesome.css'
import "mint-ui/lib/style.css"
import vueWechatTitle from "vue-wechat-title"
import coreConfig from "@/core/core.config.js"  //fn(){} =>fn()


import { Toast } from 'vant';
import { Popup } from 'vant';
import { SubmitBar } from 'vant';
import { Card } from 'vant';
import { Dialog } from 'vant';
import { PasswordInput, NumberKeyboard } from 'vant';
import { AddressList } from 'vant';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.use(AddressList);
Vue.use(PasswordInput).use(NumberKeyboard);
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';
import { Icon } from 'vant';
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Dialog);
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton);


Vue.use(vueWechatTitle)
//use支持传入一个函数,自动在函数内部写入Vue构建函数
Vue.use(coreConfig);//fn(){}

// Vue.use((Vue)=>{
//   // console.log("run11111")
//   console.dir(Vue);
// })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
