<template>
  <div>
    
      <div :class="{main:yes}" class="mainer" >
          您的购物车空空如也~
      </div>
      <!-- 购物车列表页 -->
      <div class="product" v-for="(item,index) in cartList" :key="index">
        <van-card :num="item.Num" :price="item.price" :desc="item.Size" :title="item.Name" :thumb="item.ImgUrl">
            <div slot="footer">
              <input type="checkbox" v-model = "item.bool" class="check" @change="count">
              <van-button size="mini" class="cut" @click="cut(item)">-</van-button>
              <van-button size="mini" class="add" @click="add(item)">+</van-button>
            </div>
        </van-card>
     </div>


     <!-- 商品提交 -->
     <div class="bottom-menu">
       <input  type="checkbox" name="all" value="all"  class="select-all" v-model = "checked"  @change="checkBtnClick"> 
        <span>全选</span>

         <!-- <input type="checkbox" name="none" value="none"  class="select-none" @change="BtnClick" v-model = "nochecked">
        <span>删除</span> -->

        <input type="checkbox"  class="select-no" @change="BtnClickNone" v-model = "nocheck">
        <span>清空</span>

        <span class="total-price">合计: ¥{{allPrice}}</span>
        <span class="buy-product" @click="sub()">去购买({{num}})</span>

      </div>
  </div>  
</template>

<script type="text/javascript" src="dist/store.js"></script>
<script type="text/javascript">
  store("test","tank");
</script> 

<script>
import { MessageBox } from "mint-ui";
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import Router from "storejs"
export default {
  data(){
    return{
      // 加购所有信息
      cartList:[],
      // 总数量
      num:0,
      // 总价
      allPrice:0,
      // 选中部分信息
      isArr:[],
      // 全选
      checked:false,
      arr:[],
      // 删除
      nochecked:false,
       temp:[],
      //  清空
      nocheck:false,
      // 购买提交
      yes:false
    }
  },
  mounted(){
    this.cartList=this.$store.state.cartList;
    this.cartList.map((item)=>{
      item.bool=false;
    })
    if(this.cartList.length!==0){
        this.yes=true
      }
  },
  methods:{
    // 加
    add(item){
      item.Num++;
      console.log(item.Num);
       Router.set("cartList",this.$store.state.cartList);
       this.count();
    },
    // 减
    cut(item){
      if(item.Num>1){
        item.Num--
         Router.set("cartList",this.$store.state.cartList);
         this.count();
      }else{
        item = null
      }
    },
    // 计算
    count(){
        this.allPrice=0;
        this.isArr=[];
        this.cartList.map((item)=>{
          if(item.bool){
            this.allPrice+=item.Num*item.price;
            this.num += item.Num;
            this.isArr.push(item);
          }
        })
        if(this.isArr.length===this.cartList.length){
          this.checked=true;
        }else{
          this.checked=false;
        }
      },

    // 全选
     checkBtnClick() {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.cartList.find(item => !item.bool);
        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.cartList.map(item => {
            item.bool = true;
          });
        } else {
          this.cartList.map(item => {
            item.bool = false;
          });
        }
         Router.set("cartList",this.$store.state.cartList);
         this.count();
      },
    // // 删除
    // BtnClick(){
    //    let arr = [];
    //    this.temp = [];
    //       this.cartList.map((item)=>{
    //           if(!item.bool){
    //               arr.push(item)
    //           }else{
    //               this.temp.push(item);
    //             // 
    //           }
    //       })
    //       this.nochecked = false
    //       this.cartList = arr;
    //       console.log()
    //      Router.set("arr",this.$store.state.cartList);
    //      this.count();

    // },
  // 清空
  BtnClickNone(){
     MessageBox.confirm("确认清空购物车?").then(action => {
          this.cartList = [];
          this.nocheck=false
        Toast({
              message: '清空购物车成功',
              iconClass: 'icon icon-success',
              duration: 1000,
            });
        Router.clear(this.$store.state.cartList);    
        this.yes = true;
        // this.$Router.remove()
        }).catch(() => {
    // on cancel
        });
    },

  //  购买提交 
    sub(){
      Indicator.open('Loading...');
      setTimeout(()=>{
        Indicator.close();
        MessageBox('抱歉', '抱歉购买失败，请重新购买');
      },2000)
    },
    
  }
};
</script>
<style lang="scss" scoped>
.mainer{
  color: #34B8BF;
  width: 100%;
  text-align: center;
  height: r(500);
  line-height: r(500);
  font-size: r(18);
}
.main{
  display: none;
}
.product{
  font-size: r(26);
  // position: absolute;
  // top: 0;
}
.check{
  float: left;
  width: r(20);
  height: r(20);
  opacity: 0.6;
}
// 商品提交
.bottom-menu {
    width: 100%;
    height: 44px;
    background-color:rgb(243, 243, 243);
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
// 全选
  // .bottom-menu .select-all {
  //   position: absolute;
  //   line-height: 0;
  //   left: 12px;
  //   top: 13px;
  // }
// 合计
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
// 购买
  .bottom-menu .buy-product {
    background-color: #34B8BF;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }


</style>
