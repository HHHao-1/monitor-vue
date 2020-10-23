<template>
  <div id="proof">

    <el-upload
        class="upload"
        :action="url.post"
        name="selectFile"
        :drag="true"
        :multiple= "false"
        accept=".xlsx"
        :on-success="handleUploadSuccess"

    >
      <i class="el-icon-upload"></i>
      <el-button  type="primary">选择文件</el-button>
      <br/>
      <div class="el-upload__text">请先选择要导入的文件,并确保文件格式准确无误</div>
    </el-upload>
    <div id="title">
      <embed class="logo" :src="url.logo" type="image/svg+xml"/>
      <p class="word"><b>—— 调证文件解析工具</b></p>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      url:{
        logo: require("../assets/logo.svg"),
        post: "/api/huobiStat"
      }
    }
  },
  methods: {
    handleUploadSuccess(response) {
      if(response.code === 1003){
        alert("解析失败，表格字段缺失");
      }else if(response.code === 1000) {
        this.$store.commit("updateResult", response.data)
      }
      this.$router.push('/proofAnalyze')
    }
  }
}
</script>

<style lang="scss">

  html,#app {
    height: 100%;
    width: 100%;
  }

  #title{
    padding-top: 8%;
    text-align: center;
  }

  .upload {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); /* IE 9 */
    -moz-transform: translate(-50%, -50%); /* Firefox */
    -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
    -o-transform: translate(-50%, -50%); /* Opera */
      .el-icon-upload {
        font-size: 120px;
        margin: 115px 0 75px;
      }

      .el-upload-dragger {
        width: 380px;
        height: 360px;
        transform: scale(1.3);

      }

      .el-button--default {
        color: #409EFF;
        border-color: #409EFF;

      }

      .el-button {
        width: 80%;
        margin: 10px 0;
      }

      .el-upload__text {
        margin: 10px 0 30px;
        font-size: 5px;
        color: #9C9C9C;

      }
  }
  .upload .el-upload__text{
    /*-webkit-transform: scale(2);*/
  }


  .logo {
    width: 500px;
  }

  .word {
    margin: 0;
    padding: 0;
    color: #696969;
    font-size: 35px;
    margin-left: 100px;
  }

</style>
