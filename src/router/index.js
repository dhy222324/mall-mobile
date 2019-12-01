import Vue from "vue";
import VueRouter from "vue-router";
import params from "@/core/api/params";
Vue.use(VueRouter);

import { Button } from 'vant';
import 'vant/lib/index.css';

Vue.use(Button);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/components/index.vue"),
        // redirect: "/index",
        meta: {
          title: "漫食光首页"
        }
      },
      {
        path: "list",
        name:"list",
        component: () => import("@/components/list.vue"),
        meta: {
          title: "美食美客商品页",
        }
      },
      {
        path: "cart",
        name:"cart",
        component: () => import("@/components/cart.vue"),
        meta: {
          title: "漫食光购物车页"
        }
      },
      {
        path: "Profile",
        name:"profile",
        component: () => import("@/components/Profile.vue"),
        meta: {
          title: "漫食光用户页"
        }
      }
    ] 
    // ,redirect: "/index",
  },
  {
    path: "/show",
    name: "show",
    component: () => import("@/views/show.vue"),
    meta: {
      title: "漫食光商品页"
    }
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user.vue"),
    meta: {
      title: "漫食光商品页"
    }
  },
  {
    path: "/address",
    name:"address",
    component: () => import("@/components/address.vue"),
    meta: {
      title: "漫食光用户页"
    }
  },
  {
    path: "/add",
    name:"add",
    component: () => import("@/components/add.vue"),
    meta: {
      title: "漫食光用户页"
    }
  }
];
const router = new VueRouter({
  // mode:"history",
  routes
});
//全局的路由钩子函数
router.beforeEach((to, from, next) => {
  // console.log(params.userType)
  //from  从哪来
  //to    到哪去
  //next(); 是否到下一个路由
  // console.log(to.path);
  // if(to.path=="/"){
  //   next({path:"/index"})
  // }else{
  //   next();
  // }
  if (to.path == "/") {
    if (params.userType === "index") {
      next({
        path: "/index"
      });
    } else if (params.userType === "list") {
      next({
        path: "/list"
      });
    } else if (params.userType === "test") {
      next({
        path: "/test"
      });
    }else{
      next();
    }
  }else{
    next();
  } 
});

router.afterEach((to, from) => {
  // console.log("路由跳转完毕")
});

export default router;
