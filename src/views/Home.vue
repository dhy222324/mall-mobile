<template>
  <div class="home">
    <!-- 切换路由组件 -->
     <keep-alive>
          <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"  />
    </keep-alive>  
          <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"  />
     <div class="btm_bar">      
         <main-tab-bar /> 
     </div> 

    
  </div>
</template>

 <script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
export default {
    name: "app",
  components: {
    MainTabBar
  },
};
</script>
<style lang="scss" scoped>
.btm_bar{
  position:fixed;
  bottom: 0;
  z-index: 100;
}

</style>
