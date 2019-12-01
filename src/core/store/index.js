import Vue from "vue";
import Vuex from "vuex";
import  apis from "@/core/api/apis";
import Router from "storejs"

Vue.use(Vuex);       //this.$store.state




export default new Vuex.Store({
  state: {    
    city:"上海",
    cartList:Router.get('cartList')||[],
    temp:[],
    arr:[],
    // mainlist:[],
  },
  mutations:{
    addcart(state,data){
       var boo = true;
       state.cartList.map((item)=>{
      if(item.ID == data.ID){
        // 同一ID
        if(data.num>1){
          item.num=item.num+data.num;
          boo=false;
          return;
       }
        item.Num++;
        boo=false;
      }
 })  
      if(boo){
        data.Num = data.Num||1;
        state.cartList.push(data);

      }  
      // console.log(state.cartList)
      Router.set("cartList",state.cartList);

      
      // Router.remove("temp"); 
      //存入store
    },
    // BtnClick(){
    //   Router.set("temp");
    // },
    // BtnClickNone(){
    //   Router.clear('cartList',state.cartList);   
    // }
   
  },
  getters:{
     

  },
  actions:{
     
  }


})
