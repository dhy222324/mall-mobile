<template>
  <div class="about">
    <div class="banner">
       <swiper :config="{id:'banner',info:{pagination: '.swiper-pagination',}}" >
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">
              <img  class="banner_img" :src="bannners+item+'.jpg'" >
            </div>
        </swiper>
    </div>
    <div class="more" @click="toPath">
      更多商品
    </div>
    <div class="main">
      <h1>{{informa.Name}}</h1>
      <div class="new-cut">
        <div class="new">新</div>
        <div class="cut">折</div>
      </div>
      <div class="black">
      </div>                                                                                                                                                                        
      <!-- 商品信息 -->
      <div class="content" v-if="isLoad">
         <div class="sweet" >
           <span>甜度</span>
           <img :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${informa.Sweet||informa.CakeType[0].Sweet||3}.png`" alt="">
         </div>
         <div class="test">
           <span>口味</span>
           <i>{{currentType.CategoryName||informa.CategoryName||乳品}}</i>
         </div>
         <div class="test">
           <span>原材料</span>
           <i>{{currentType.Resource||informa.Resourse||见详情页}}</i>
         </div>
          <div class="test" >
           <span>适合人群</span>
           <!-- <i>{{JSON.parse(this.types[0].Details).details_tips}}</i> -->
           <i>所有人群</i>
         </div>
          <div class="test">
           <span>保鲜条件</span>
           <i>最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。</i>
         </div>
      </div>
      <!-- 商品评价 -->
      <div class="views">
        <div class="left"> <span class="fa fa-envelope-open-o fa-lg"></span>商品评价</div>
        <div is-link @click="showPopup" class="right">(0)条 ></div>
        <!-- <van-cell is-link @click="showPopup" class="right">(0)条  ></van-cell> -->
        <van-popup v-model="show" class="show">暂无评价哦！</van-popup>
      </div>
      <!-- 商品规格选项 -->
      <div class="detail"  v-if="isLoad" >
         <div class="info" v-for="(item,index) in types" :key="index" >
            <div class="title">
              <div @click="userSelct(index)" class="buttem">{{item.Size}}</div>
            </div>
          </div>
      </div>
      <!-- 商品规格详情 -->
      <div class="main-product" v-if="isLoad">
        <div class="list">
            <span class="fa fa-clone fa-lg"></span> 
            {{ProductConfig.configsize||`13.5*13.5cm`}}
        </div>
        <div class="list">
            <span class="fa fa-arrow-circle-o-right fa-lg"></span>
            {{ProductConfig.configpeople||`适合4-5人分享`}}
        </div>
        <div class="list">
            <span class="fa fa-cutlery fa-lg"></span> 
            {{ProductConfig.configware||`含5人份餐具`}}
        </div>
        <div class="list">
            <span class="fa fa-user-o fa-lg"></span> 
            {{ProductConfig.configtips||`至少需要提前一天预定`}}
        </div>
      </div>
      <div class="num">
        <div class="left">
          购买数量
        </div>
        <div class="right">
          <div class="add" @click="cut()">-</div>
            <span>{{num}}</span>
           <div class="add" @click="add()">+</div>
        </div>
      </div>
    </div>
    <div class="buttom">
        <div class="bottom-top">
          <div class="bottom-left">
            划线价格
          </div>
           <div class="bottom-right">
             商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。 
          </div>
        </div>
         <div class="bottom-bottom">
            <div class="bottom-left">
              未划线价格
            </div>
            <div class="bottom-right">
              商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。 
            </div>
        </div>
      </div>
    <!-- 加购 -->
    <div class="add-cart"  v-if="isLoad">
         <van-goods-action>
            <div class="money-now">{{(currentType.CurrentPrice*0.5+'.00')*num||currentType.CakeType[0].CurrentPrice*0.5+'.00'}}</div>
            <div class="money-cut">已优惠:{{(currentType.CurrentPrice*0.5+20+'.00')*num||currentType.CakeType[0].CurrentPrice*0.5+20+'.00'}}</div> 
            <van-goods-action-button color="rgb(104, 218, 224)" type="warning" text="加入购物车" @click="addcart(currentType)"/>
            <van-goods-action-button color="rgb(56, 208, 216)" type="danger" text="立即购买" @click="gonow()"/>
          </van-goods-action>
         
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
  data(){
    return{
      // 轮播
       params:{},
       bannners:"",
       list:[1,2,3,4],
      //  满足地区的商品信息
       types:[],
      //  商品价格
       informa:{},
       isLoad:false,
      //  当前选中规格
       currentType:{},
      //  架构数量
       num:1,
      //  当前选中规格信息
       ProductConfig:[],
      
      // 购买
    
    
       show: false,
    
    }
  },
  mounted(){
    this.params =this.$route.query;
    this.params.city = this.$store.state.city;
    // console.log(this.params);
    this.pageInt()
  },
  methods:{
  // 初始化
    pageInt(){
       if(this.params.SupplyNo.indexOf("NS")!==-1){
          this.bannners= this.setImgURL("ns-detail");
          var nourl = this.$apis.getShowDataOne({Name:this.params.Name,m:"GetNSCakeByName"}) ;
        }else if(this.params.SupplyNo.indexOf("KSK")!==-1){
          this.bannners=this.setImgURL("jd-detail");
          var nourl =this.$apis.getShowDataTwo({City:this.params.city,ProName:this.params.Name,c:'Product',m:"GetCakeByName"});
        }else if(this.params.SupplyNo.indexOf("JZ")!==-1){
          this.bannners=this.setImgURL("jz-detail");
           var nourl =this.$apis.getShowDataTwo({City:this.params.city,ProName:this.params.Name,c:'IndexCenter',m:"GetjzCakeInfo"});
        }else{
          this.bannners=this.setImgURL("rp-detail");
           var nourl =this.$apis.getShowDataOne({Name:this.params.Name,m:"GetRuPCakeByName"}
           );
        }
         nourl.then((res)=>{
            var res = res.data.Tag;         
             if (res.length) {
                res.map(item => {
                  if (item.City == this.params.city) {
                    this.types.push(item);
                  }
                });
                if (this.types.length === 0) {
                  this.types = res;
                }
                this.informa = this.types[0];
              } else {
                this.types = res.infos.CakeType;
                this.informa = res.infos;
              }
          this.isLoad=true;
          this.userSelct(0);
         })
    },
    setImgURL(de){
        return `https://res.bestcake.com/m-images/${de}/${this.params.Name}/${this.params.Name}-`
    },

    // 改变路径
  toPath(){
     this.$router.push({path:"/list"})
     },
   userSelct(index){
     this.currentType=this.types[index];
     if(this.currentType.ProductConfig){
       this.ProductConfig = JSON.parse(this.currentType.ProductConfig).pc
     }
    //  console.log(this.currentType)
    },
    // 加入购物车
   addcart(currentType){
      var temp = {
        ID: this.currentType.Id||this.currentType.ID,
        Name: this.params.Name,
        price: this.currentType.CurrentPrice*0.5,
        ImgUrl: this.params.ImgUrl,
        Size: this.currentType.Size,
        Num:this.num
      };
      
       MessageBox.confirm("确认加入购物车?").then(action => {
        // console.log("run");
        this.$store.commit("addcart",temp);
        Toast({
              message: '加购成功,即将进入购物车',
              iconClass: 'icon icon-success',
              duration: 1000
            });
              }).catch(() => {
          // on cancel
               });
        setTimeout(()=>{
            this.$router.push({path:"/cart"})
        },3000)
         },
  // 购买
  gonow(){
     Indicator.open('Loading...');
     setTimeout(()=>{
       Indicator.close();
       MessageBox('抱歉', '抱歉购买失败，请重新购买');
     },2000)
  },
  // 加
    add(){
      this.num++;
    },
  // 减
    cut(){
      if(this.num>1){
        this.num--
      }else{
        this.num = 1
      }
    },
    // 评价点击提示信息
     showPopup() {
      this.show = true;
    },
 
  }
}
</script>
<style lang="scss" scoped>
  .swiper-container{
    height: r(440);
    width: 100%;
  }
  .banner img{
    width:100%; 
    // height:100%;
  }
// 更多商品
  .more{
    width: r(80);
    height: r(30);
    line-height: r(30);
    text-align: center;
    border-radius: r(5);
    font-size: 16px;
    color: #34B8BF;
    border:1px solid rgb(104, 218, 224);
    font-weight: 600;
    position:fixed;
    right:0;
    top: r(30);
    z-index: 100;
  }

// 商品信息
  .main h1{
    text-align: center;
    font-size: r(16);
  }
// 折
  .main{
   .new-cut{
    width: 100%;
    display: inline-block;
    text-align: center;
    margin: r(20) 0;
    .new,.cut{
      display: inline-block;
      width: 10%;
      height: r(30);
      line-height: r(30);
      background-color: rgb(250, 65, 65);
      color: white;
      font-size: r(16);
      border-radius: r(3);
    }
    .new{
      margin-right: r(10);
    }
  }
  .black{
    height: r(10);
    background-color: aliceblue;
  }

  // 甜度
   .content .sweet,.test{
     margin-top: r(20);
     vertical-align: top;
   }
   .content span{
     font-size: r(14);
     display: inline-block;
     color: gray;
     width: 30%;
     line-height: r(20);
     vertical-align: top;     
    //  margin-top: -r(10);
   }
   .content i{
     display: inline-block;
     width: 70%;
     line-height: r(20);
     color: black;
     font-size: r(14);
   }
   .content .sweet img{
     width: 30%;
     height: r(20);
   }
 }

//  商品规格
.detail{
    margin: r(20) 0;
.info{
  margin: r(5) 0;
  display: inline-block;
}
.title{
  display: inline-block;
}
.buttem{
  width: r(100);
  margin-right: r(15);
  height: r(30);
  line-height: r(30);
  text-align: center;
  border-radius: 3px;
  border: 1px solid rgb(185, 184, 184);
  font-size: r(14);
  display: inline-block;
}
}
// 商品规格详情
.main-product{
  padding: r(20) 0 r(30) r(10);
  border-bottom: 10px solid aliceblue;
  margin-bottom: r(20);
 .list{
  display: inline-block;
  width: 50%;
  height: r(30);
  line-height: r(30);
  font-size: r(14);
 }
}

 // 最下方
.buttom{
  margin: r(20) 0 r(60);
  color: rgb(77, 75, 75);
  line-height: r(20);
  background-color: rgb(244, 247, 250);
  padding: r(20) r(10) 0;
}
.buttom .bottom-left{
  display: inline-block;
  width: 30%;
  font-size: 14px;
  font-weight: 600;
  vertical-align: top;
}
.buttom .bottom-right{
  padding-bottom: r(10);
  display: inline-block;
  width: 70%;
}

.bottom-bottom{
  margin: r(20) 0 r(60);
}

// 加购
.num {
  height: r(20);
  line-height: r(20);
  .left{
    float: left;
    font-size: r(14);
  }
  .right{
    float: right;
    .add,.cut,span{
      display: inline-block;
      width: r(20);
      text-align: center;
      font-size: r(14);
    }
  }
}

// money-now

.money-now{
 font-size: r(20);
 color: red;
 margin:0 r(10) ;
}
.money-cut{
  font-size: r(10);
  vertical-align: bottom;
}
// 商品评价
.views {
overflow: hidden;
padding:r(20) r(10); 
font-size: r(14);
border-top: 10px solid aliceblue;
border-bottom: 10px solid aliceblue;
margin-top: r(20);
.left{
  float: left;
   span{
     margin-right: r(10);
   }
 }
 .right{
   float: right;
 }
 .show{
   text-align: center;
   line-height: r(50);
   width: r(100);
   height: r(50);
   font-size: r(14);
 }
}

</style>