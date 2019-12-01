<template>
  <tab-bar>
    <tab-bar-item link="/index">
      <img slot="icon" src="https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png?v=20190620" alt="" />
      <img
        slot="active-icon"
        src="https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png?v=20190620"
        alt=""
      />
      <!-- <div slot="text">首页</div> -->
    </tab-bar-item>
    <tab-bar-item link="/list">
      <img slot="icon" src="https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png?v=20190620" alt="" />
      <img
        slot="active-icon"
        src="https://res.bestcake.com/m-images/ww/foot/foot-menu-b-2.png?v=20190620"
        alt=""
      />
      <!-- <div slot="text">分类</div> -->
    </tab-bar-item>
    <tab-bar-item link="/cart">
      <img slot="icon" src="https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png?v=20190620" alt="" />
      <img
        slot="active-icon"
        src="https://res.bestcake.com/m-images/ww/foot/foot-menu-c-2.png?v=20190620"
        alt=""
      />
      <!-- <div slot="text">购物车</div> -->
    </tab-bar-item>
    <tab-bar-item link="/Profile">
      <img slot="icon" src="https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png?v=20190620" alt="" />
      <img
        slot="active-icon"
        src="https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png?v=20190620"
        alt=""
      />
      <!-- <div slot="text">我的</div> -->
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../comment/tabbar/TabBar";
import TabBarItem from "../../comment/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped></style>
