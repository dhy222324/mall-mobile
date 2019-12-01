<template>
  <div>
    <!-- logo -->
      <div class="logo">
        <p><i class="fa fa-maxcdn fa-lg"></i>漫食光</p>
      </div>
      <!-- 轮播图组件 -->
      <div v-if="SwiperBannerList.length!==0"> 
        <swiper :config="{id:'banner',info:{pagination: '.swiper-pagination',autoplay : 2000,autoplayDisableOnInteraction : true,loop : true,}}">
            <div class="swiper-slide" v-for="(item,index) in SwiperBannerList" :key="index">
              <img class="banner_img" :src="item.ImgUrl" >
            </div>
        </swiper>
      </div>
      <!-- 字 -->
      <div class="title">
        <img src="@/assets/img/home/title.png" alt="" srcset="">
      </div>
      <div class="come" v-for="(item,index) in AbsoluteBannerList" :key="index">
        <img :src="item.ImgUrl" alt="">
      </div>
      <!-- 分类 -->
      <div class="cake">
         <div class="cake-list"  v-for="(it,ind) in TopIconList" :key="ind">
            <img :src="it.ImgUrl" alt="" @click="golist()" >
            <p>{{it.ActName}}</p>
         </div>
      </div>
  
      <!-- 通知 -->
      <div class="notice">
         <span>通知</span>
        <!-- <marquee>美食美客---{{NoticeList}}</marquee> -->
        <marquee>食光烘培屋官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决此问题。我司在此郑重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。​</marquee>
      </div>

      <!-- 四部分 -->
      <div class="content">
        <div class="content-list"  v-for="(item,index) in CenterContentList" :key="index">
            <img :src="item.ImgUrl" alt="" >
            <!-- @click="toPaths(item)" -->
         </div>
      </div>

      <!-- 分栏 -->
      <div class="swiper-main">
      <div class="swiper-slide" v-for="(item,index) in SaleList" :key="index">
        <img class="banner_img big-img" :src="item.TabImgUrl" >
            <div v-if="item.CakeList.length!==0" class="ban"> 
            <swiper :config="{id:'banner'+index,info:{slidesPerView : 2.4,spaceBetween : 10}}">
                <div class="swiper-slide swiper-slide-two" v-for="(iten,imdex) in item.CakeList" :key="imdex">
                  <img class="banner_img" :src="iten.ImgUrl" @click="toPath(iten)">
                    <p>{{iten.Name}}</p>
                    <p><span>￥{{iten.Price}}</span><i>/{{iten.Size}}</i></p>
                </div>
            </swiper>
          </div>
      </div>
      </div>


      <!-- 刷新 -->

       <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <p>刷新次数: {{ count }}</p>
      </van-pull-refresh> -->
  </div>
</template>

<script>
import NavBar from "@/components/comment/navbar/NavBar"
export default {
   components:{
    NavBar,
  },
  data(){
    return {
      SwiperBannerList:[],//ImgUrl
      SaleList:[],
      NoticeList:null,
      TopIconList:[],
      CenterContentList:[],
      AbsoluteBannerList:[],
      // 刷新
      count: 0,
      isLoading: false
    }
  },
  mounted(){
    this.$apis.getIndexData().then((res)=>{
      var res=res.data.Tag.mainresult;
      // console.log(res.AbsoluteBannerList)
      // 轮播图
      this.SwiperBannerList=res.SwiperBannerList;
      // console.log(this.SwiperBannerList);
      // 通知
      this.NoticeList=res.NoticeList;
      // 活动图
      this.AbsoluteBannerList = res.AbsoluteBannerList;
      // 分类
      this.TopIconList=res.TopIconList;
      // 踏雪寻梅
      this.CenterContentList=res.CenterContentList;
      // 分栏
      var SaleList = res.SaleList;
      this.SaleList = SaleList;
      //  console.log(this.SaleList)
      SaleList.map((item)=>{
        // console.log(JSON.parse(item.CakeList))
        item.CakeList = JSON.parse(item.CakeList);
        item.CakeList.map((item)=>{
          // console.log(this.setImgURL(item))
         item.ImgUrl = this.$glope.setImgURL(item)
        }) 
      })
    })
  },
  methods:{
  //   setImgURL(item){
  //     // console.log(item.SupplyNo)
  //     var url = "https://res.bestcake.com/m-images/ww";
  //     if(item.SupplyNo.indexOf("KSK")!==-1){
  //      return url+"/jd/"+item.Name+".png";
  //     }else if(item.SupplyNo.indexOf("NS")!==-1){
  //      return url+"/ns/"+item.Name+".jpg";
  //     }else if(item.SupplyNo.indexOf("JZ")!==-1){
  //      return url+"/jz/"+item.Name+".png";
  //     }else{
  //       return url+"/rp/"+item.Name+".jpg";
  //     }
  //   }

  toPath(iten){
     this.$router.push({path:"/show",query:{SupplyNo:iten.SupplyNo,Name:iten.Name,ID:iten.ID,ImgURL:iten.ImgUrl}})
   },
   toPaths(item){
     this.$router.push({path:"/show",query:{SupplyNo:item.SupplyNo,Name:item.Name,ID:item.ID}})
   },
   golist(){
     this.$router.push({path:"/list",query:{}})
   },
  //  shuax
    //  onRefresh() {
    //   setTimeout(() => {
    //     this.$toast('刷新成功');
    //     this.isLoading = false;
    //     this.count++;
    //   }, 500);
    // }
  }
};
</script>

<style lang="scss" scoped>
// 头部
.logo p{
  color: rgb(142, 203, 207);
  height: r(35);
  line-height: r(35);
  font-size: r(22);
  font-weight: 600;
  font-family: 'Courier New', Courier, monospace
}
.logo p i{
  margin-right: r(5);
}
// 轮播
.banner_img{
  width:100%;
  height:100%;
  border-radius: r(5);
}
// 注意
.notice span{
  display: inline-block;
  color: white;
  text-align: center;
  width: r(35);
  border-radius: r(5);
  height: r(18);
  line-height: r(18);
  background-color: #34B8BF;
}
.notice{
  margin: r(20) 0;
}
.notice marquee{
  font-weight: 600;
  height: r(18);
  line-height: r(18);
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  float: right;
  color: rgb(42, 144, 150);
}
img{
  width: 100%;
}

// .title img{
//   width: 100%；
// }
// .come img{
//   width: 100%；
// }
.ban{
  background-color: rgb(252, 249, 249);
  margin: r(15) 0;
}
// 分类
.cake{
    width: 100%;
}
.cake .cake-list{
   display: inline-block;
   margin-top: r(10);
   width: 25%;
   text-align: center;
}
.cake-list img{
  width: r(50);
  height: r(50);
}
// 踏雪寻梅
.content{
  overflow: hidden;
}
.content-list{
  display: inline-block;
  width: 48%;
}
.content-list:nth-child(n) {
   float: left;
}
.content-list:nth-child(2n) {
   float: right;
}
// .content img{
//   width: 44%
// }
// 分栏
.swiper-main{
  margin: r(30) 0 r(50);
}

.swiper-slide-two{
  border: 1px solid #eee;
  background-color: white;
  border-radius: r(5)
}
.swiper-slide-two img{
  width: r(120);
  height: r(110);
  margin-left: r(15);
}
.swiper-slide-two p{
  height: r(20);
  line-height: r(20);
  margin-top: r(15);
  font-size: r(12);
  font-weight: 600;
  margin-left: r(20);
  color: #666
}
.swiper-slide-two p span{
  color: rgb(211, 100, 137);
}
.swiper-slide-two p i{
  color: #888
}
</style>
