<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body{
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
  margin: 0;
  font-family: PingFangSC-Medium;
  .btn.active, .btn:active {
    -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
