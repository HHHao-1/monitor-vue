<template>
  <div class="banner">
    <embed id="logoimg" :src="url.logoimg" type="image/svg+xml"/>
    <span class="word"><b>{{ pageName }}</b></span>
    <span>
      <a :href="url.login" class="userControl">退出登录</a>
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
  background-color: white;

  #logoimg {
    margin-top: 5px;
    width: 300px;
    padding-left: 10px;
  }

  a {
    color: #000;
  }

  .word {
    margin-top: 15px;
    position: absolute;
    left: 60px;
    font-size: 20px;
    color: #2E2F2E;
    letter-spacing: 0.12px;
    line-height: 20px;
  }

  .userControl {
    font-size: 16px;
    color: #333333;
    margin: 5px;
    float: right;
    padding: 12px;
  }

}

</style>
