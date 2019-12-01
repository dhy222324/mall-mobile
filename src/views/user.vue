<template>
  <div class="app">
   <div class="main" @click="topath()">
     <van-icon name="arrow-left" />
   </div>
    
    <div class="login-wrap" v-show="showLogin">
      <div class="head">
         <img src="@/assets/img/2.jpg" alt="" srcset="">
    </div>
    <form action="">
      <h3>登录</h3>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
          <p :class="{show:num}">注意：请输入用户名或密码！</p>
      <button v-on:click="login">登录</button>
      <span v-on:click="ToRegister" class="bottom">没有账号？马上注册</span>
    </form>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <div class="head">
          <img src="@/assets/img/2.jpg" alt="" srcset="">
    </div>
    <form action="">
      <h3>注册</h3>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
           <p :class="{show:num}">注意：请输入用户名或密码！</p>
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin" class="bottom">已有账号？马上登录</span>
     </form>
    </div>
    <div class="mainer">

   </div>
  </div>
</template>

<style lang="scss" scoped>
.main{
  font-size: r(40);
}
.head{
  width: 100%;
  height: r(50);
  margin: r(10);
}

.login-wrap,.register-wrap{
   padding: r(50) 0;
  //  background-color: rgb(61, 216, 224);
   color: black;
   margin:r(100) -10px 0;
   flex: 1;
   font-size: r(16);
  //  border: 1px solid   rgb(61, 216, 224)
}
h3,.bottom{
  display: block;
  text-align: center;
}
.box{
  height:r(100) ;
  width: r(100);
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 15px;
  outline: none;
  border: none;
  // color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: red; 
  text-align: center;
}
.show{
  display: none;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background:linear-gradient(90deg,rgb(15, 180, 189),#997dc5,#98ceae,rgb(7, 225, 236));
   background-size: 400%;
  color: #fff;
  font-size: 16px;
   margin-bottom: r(20);
}

span {
  cursor: pointer;
  display: block;
}
span:hover {
  color: #41b883;
}
</style>

<script>
export default {
  data() {
    return {
      showLogin: true,
      showRegister: 0,
      showTishi: 0,
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      num:1
    }
  },
  methods: {
   login() {
      if (this.username === '' || this.password === '') {
        this.num = null;
      }else{
         this.$router.push({path:"/Profile",query:{}})
      }
    },
    register() {
      if (this.newUsername === '' || this.newPassword === '') {
        this.num = null;
      } else {
         this.$router.push({path:"/Profile",query:{}})
      }
    },
    ToLogin() {
      this.showRegister = false
      this.showLogin = true
    },
    ToRegister() {
      this.showRegister = true
      this.showLogin = false
    },
   topath(){
      this.$router.push({path:"/Profile",query:{}})
   }
  }
}
</script>
