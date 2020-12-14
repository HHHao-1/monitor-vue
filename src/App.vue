<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;

  .el-popover {
    min-width: 0;
  }
}


#app {
  background-color: #f5f5f5;
  height: 100%;
  margin: 0;
  font-family: PingFangSC-Mediu;

  //.btn.active, .btn:active {
  //  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
  //  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
  //}
}
</style>
