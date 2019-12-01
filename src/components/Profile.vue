<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center" class="center">漫食光</div></nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
       <UserInfo></UserInfo>
 
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <!-- 收获地址 -->
    <div  @click="topath()" class="address">
      <p>我的收获地址</p>
    </div>
     
    <div  @click="to()" class="address">
      <p>添加收获地址</p>
    </div>

    <!-- 我的消息积分商城购物卡 -->
    <list-view :list-data="orderList" class="order-list"></list-view>

    
    <list-view :list-data="serviceList" class="service-list" ></list-view>
    
  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'
  import NavBar from './comment/navbar/NavBar'

	export default {
		name: "Profile",
    components: {
		  UserInfo, ListView, NavBar
    },
    data: function () {
		  return {
		    orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        // addressList:[
        //   {icon: '#vip', iconColor: '#ffc636', info: '我的收获地址'}, 
          
        // ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ],
       
      }
    },
     methods:{
      topath(){
         this.$router.push({path:"/address",query:{}})
      },
       to(){
         this.$router.push({path:"/add",query:{}})
        },
    }
	}
</script>

<style lang="scss" scoped>
  .center{
    font-size: r(18)
  }

  #profile {
    background-color: rgb(61, 216, 224);
    margin: -10px;
  }
 .address{
   margin-top: r(10);
   height: r(45);
   line-height: r(45);
   background-color: #fff;
   p{
     color: black;
     font-size: 14px;
     margin-left: 48px;
    border-bottom: 1px solid rgb(212, 211, 211);
   }
 }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }

</style>
