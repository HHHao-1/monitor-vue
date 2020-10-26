<template>
  <div class="banner">
    <embed id="logoimg" :src="url.logoimg" type="image/svg+xml"/>
    <span class="word"><b>{{ pageName }}</b></span>
    <span>
      <el-link :href="url.login" class="userControl" :underline="false">退出登录</el-link>
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
      userName: '用户名预留',
    }
  }
}
</script>

<style scoped lang="scss">
.banner {

  #logoimg {
    margin-top: 5px;
    width: 300px;
    padding-left: 10px;
  }

  a {
    color: #000;
  }

  .word {
    margin-top: 10px;
    position: absolute;
    font-size: 23px;
    left: 70px;
    color: black;
  }

  .userControl {
    margin: 5px;
    float: right;
    padding: 12px;
    font-size: 15px;
    color: #4F4F4F;
  }

}

</style>
