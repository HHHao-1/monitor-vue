<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body{
  height: 100%;
}
#app {
  height: 100%;
  font-family: PingFangSC-Medium;
  .btn.active, .btn:active {
    -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
