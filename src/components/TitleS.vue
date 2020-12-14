<template>
  <div class="common">
    <div class="banner">
      <embed id="logoimg" :src="url.logoimg" type="image/svg+xml" v-show="true"/>
      <!--    <span class="word">{{ pageName }}</span>-->
      <span class="word" style="line-height: 60px; color: #333;">数字货币监控系统</span>
      <span class="right-user">
      <a :href="url.login" class="userControl" :underline="false">退出登录</a>
            <span class="userControl admin">{{ userName }}</span>
    </span>
    </div>
    <div class="bar">
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ['pageName'],
  data() {
    return {
      url: {
        logoimg: require("@/assets/logoimg.svg"),
        login: '/login'
      },
      userName: 'Admin',
    }
  }
}
</script>

<style scoped lang="scss">
.common {
  height: 100%;
}

.banner {
  display: block;
  height: 60px;
  background-color: white;
  z-index: 999;

  #logoimg {
    position: relative;
    top: 14px;
    margin-left: 6%;
  }

  .word {
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #292929;
    letter-spacing: 0.12px;
    line-height: 20px;
    position: relative;
    top: 3px;
  }

  .userControl {
    //margin: 22px 6% 0 0;
    margin-top: 22px;
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0.1px;
    line-height: 16px;
    position: relative;
    right: 6%;
  }

  .admin {
    margin-right: 2% !important;
  }
}

.bar {
  margin-top: 15px;
  margin-left: 6%;
  background-color: white;
  width: 88%;
  height: 70px;
}

.content {
  margin-top: 15px;
  margin-left: 6%;
  width: 88%;
  //height: 100vw;
  height: calc(100% - 220px);
  background-color: white;
}


</style>
