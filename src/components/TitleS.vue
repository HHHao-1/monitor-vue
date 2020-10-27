<template>
  <div class="banner">
    <embed id="logoimg" :src="url.logoimg" type="image/svg+xml" v-show="false"/>
<!--    <span class="word">{{ pageName }}</span>-->
    <span class="word" style="line-height: 60px; color: #333; margin-left: calc(50vw - 630px);">{{ pageName }}</span>
    <span>
      <a :href="url.login" class="userControl" :underline="false">退出登录</a>
            <span class="userControl">{{ userName }}</span>
        </span>
  </div>

</template>

<script>
export default {
  name: "Title",
  props: ['pageName'],
  data() {
    return {
      url: {
        logoimg: require("../assets/logoimg.svg"),
        login: '/login'
      },
      userName: 'Admin',
    }
  }
}
</script>

<style scoped lang="scss">
.banner {

  display: block;
  height: 60px;
  background-color: white;
  z-index: 999;

  #logoimg {
    position: relative;
    top: 14px;
    padding-left: 6%;
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
    margin: 22px 18.5px 0 18.5px;
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0.1px;
    line-height: 16px;
    position: relative;
    right: 3%;
  }

}

</style>
