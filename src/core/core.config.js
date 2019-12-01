import directive from "./directive.js"
import Apis from "@/core/api/apis.js"
import Glope from "@/core/glope/index.js";
import Common from "@/components/common" //fn(){}
// import swiper from "@/components/comment/swiper"

// import { Button } from 'mint-ui';


export default (Vue)=>{
    directive(Vue);
    Common(Vue);
    Vue.prototype.$eventBus=new Vue();  //$on $emit  {$on:fn(),$emit:fn}
    Vue.prototype.$apis=Apis;       //Apis->   {fn(){}};
    // Vue.prototype.uname="Msea____";        测试  this.uname
    Vue.prototype.$glope=Glope;
}