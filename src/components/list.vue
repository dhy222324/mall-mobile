<template>
  <div>
    <div class="btn" >
      <div @click=" selectData(1)" class="left" :class="{active:num1}">自营</div>
      <div @click=" selectData(2)" class="right" :class="{active:num2}">美式严选</div>
    </div> 
    <div class="under">
    </div>
      <div class="list-title">
        <ul class="tab-control">
          <li class="tab-control-item"  @click="itenClick(iten,imdex)" v-for="(iten, imdex) in title" :key="imdex"  :class="{actives: currentIndex === imdex}">
               <span>{{iten}}</span>
          </li>
        </ul>
      </div>
      <div class="list-goods">
         <div class="product" v-for="(item, index) in lists" :key="index" >
            <img :src="item.ImgUrl" alt="" @click="toPath(item)">
            <h1>{{item.Name}}</h1>
            <p>{{item.Means}}</p>
            <div class="money">
                <em>￥{{item.CurrentPrice*0.5}}</em> &nbsp;&nbsp; 
                   <del>￥{{item.CurrentPrice}}</del>/{{item.LabelText}} 
                   <i class="fa fa-cart-plus fa-lg" is-link @click="addcart(item)"></i>  
                   <van-popup v-model="show" class="show" >加购成功！</van-popup>
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
  </div>   
</template>

<script>
export default {
  data(){
    return{
      goodList:[
        {title:"女神",mark:"NS",list:[]},
        {title:"经典",mark:"KSK",list:[]},
        {title:"伴手礼",mark:"JZ",list:[]},
        {title:"乳品",mark:"RP",list:[]}
      ],
      listDate:[],
      num1:null,
      num2:null,
      title:[],
      currentIndex: 0,
      lists:[],
      show: false
    }
  },
mounted(){
  this.pageInt();
},
methods:{
  // 初始化
  pageInt(){
    this._getListData((res)=>{
      var res = res.data.Tag.cakelist;
      this.goodList.map((item)=>{
        res.map((it)=>{
          if(it.SupplyNo.indexOf(item.mark)!==-1){
            item.list.push(it);
             it.ImgUrl = this.$glope.setImgURL(it);
             this.selectData(1);
          }
        })
      })
      // console.log(this.goodList)
    })
  },
  selectData(num){
    if(num===1){
      this.listDate = this.goodList.slice(0,3);      
      this.num1 = 1;
      this.num2 = null;
      this.title = ["女神","经典","伴手礼"]
      this.lists = this.listDate.slice(0)[0].list;
    }else{
      this.listDate = this.goodList.slice(3);
      this.num2 = 1;
      this.num1 = null;
      this.title = ["乳品"]
      this.lists = this.listDate.slice(0)[0].list;
    }
  },
  itenClick (iten,index) {
    // 1.改变currentIndex
    this.currentIndex = index;
    // 2.发出事件
    this.$emit('itenClick', index)

     this.listDate.map((item,index)=>{
       if(item.title === iten ){
         this.lists = this.listDate.slice(index,index+1)[0].list;
        //  console.log(this.lists)
       }
     })
   },
   toPath(item){
     this.$router.push({path:"/show",query:{SupplyNo:item.SupplyNo,Name:item.Name,ID:item.ID,ImgUrl:item.ImgUrl}})
   },

  //  加购
  addcart(item){
    console.log(item)
    var temp = {
      Name : item.Name,
      Size : item.Size,
      price : item.CurrentPrice*0.5,
      ID : item.ID,
      ImgUrl : item.ImgUrl
    }
    this.$store.commit("addcart",temp);
    this.show = true;
  },
   
  // 调接口
  _getListData(callback){
    this.$apis.getListData().then((res)=>{
      callback(res);
    })
  }

}

  }
 
</script>

<style lang="scss" scoped>
// 导航栏顶部
  .btn div{
    display: inline-block;
    font-weight: 600;
    // border-bottom: 1px solid gray;
  }
  .btn .left,.btn .right{
    width: 50%;
    height: r(45);
    line-height: r(45);
    text-align: center;
    font-size: r(18);
  }
  .active{
     color: #34B8BF;
     border-bottom: 2px solid #34B8BF;
  }
  .under{
    height: 0;
    width: 100%;
    border-bottom: 1px solid rgb(163, 162, 162);
  }
  // 导航栏中间
  .tab-control {
    margin: r(30) 0 0;
    display: flex;
    text-align: center;
    line-height: r(30);
    font-size: r(16);
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item {
    flex: 1;
  }
  // .tab-control-item span {
  //   padding: 5px;
  // }
  .actives {
    color:black ;
    font-weight: 900;
  }

  .actives span {
    border-bottom: 5px solid #34B8BF;
    border-radius: 5px;
  }

  // 商品
  .list-goods{
    width: 100%;
  }
  .product{
    width: 50%;
    display: inline-block;
    margin-top: r(25);
    font-size: 12px;
  }
  .product img{
    width: r(160);
    height: r(160);
    margin-left: 5%;
  }
  .product h1{
    font-weight: 600;
    font-size: r(14);
    // height: r(20);
    // line-height: r(20);
  }
  .product p{
    width: 95%;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    color: rgb(77, 75, 75);
    height: r(30);
    line-height: r(30)
  }
  .product .money{
   height: r(30);
    line-height: r(30);
     color: rgb(77, 75, 75);
     width: 97%;
  }
  .product .money em{
    color: red;
    font-size: 14px;
  }
  .product .money i{
    float: right;
    color: #34B8BF;
    font-size: r(16);
  }
  .product .money .show{
   text-align: center;
   line-height: r(100);
   width: r(200);
   height: r(100);
   font-size: r(18);
   color: #34B8BF;
 }
  // 最下方
.buttom{
  margin: r(20) 0 r(60);
  color: rgb(77, 75, 75);
  height: r(20);
  line-height: r(20)
}
.buttom .bottom-left{
  display: inline-block;
  width: 30%;
  font-size: 14px;
  font-weight: 600;
}
.buttom .bottom-right{
  display: inline-block;
  width: 70%;
}
.bottom-bottom{
  margin: r(20) 0 r(60);
}
</style>
