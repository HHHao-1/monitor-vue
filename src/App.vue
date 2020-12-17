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
  font-family: PingFangSC-Mediu;

  input {
    border: 1px solid #DBDBDB;
    border-radius: 4px;
  }

  .el-popover {
    min-width: 0;
  }

  .el-dialog {
    border-radius: 6px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  }

  .el-dialog__title {
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 16px;
  }

  .el-button--primary {
    width: 70px;
    height: 34px;
    color: #FFFFFF;
    background: #166BD6;
    border-radius: 4px;
    line-height: 8px;
  }

  .el-button--default {
    width: 70px;
    height: 34px;
    color: #666666;
    background: #CDCDCD;
    border-radius: 4px;
    line-height: 8px;
  }

  .di1 .el-dialog {
    width: 800px;
  }

  .di1 .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .di2 .el-dialog {
    height: 124px;
  }

  .di2 .el-dialog__body {
    text-align: center;
    padding-bottom: 10px;
    padding-top: 15px;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 16px;
  }

  .di2 .el-dialog__header {
    padding-top: 10px;
  }

  .di2 .dialog-footer {
    font-size: 14px;
    letter-spacing: 0.09px;
    line-height: 14px;
    margin-right: 5px;
  }
}


#app {
  background-color: #f5f5f5;
  height: 100%;
  margin: 0;
}
</style>
