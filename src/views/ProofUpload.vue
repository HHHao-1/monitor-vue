<template>
  <div class="proofUpload">
    <div class="titleS">
      <embed class="logo" :src="url.logo" type="image/svg+xml"/>
      <p class="word"><b>—— 调证文件解析工具</b></p>
    </div>
    <div class="transDataUpload">
      <el-upload
          class="upload"
          :action="url.post"
          name="selectFile"
          :drag="true"
          multiple
          accept=".xlsx"
          :on-success="handleUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <el-button type="primary">选择文件</el-button>
        <div class="el-upload__text">请先选择要导入的文件,并确保文件格式准确无误</div>
      </el-upload>
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
.proofUpload {
  .titleS {
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); /* IE 9 */
    -moz-transform: translate(-50%, -50%); /* Firefox */
    -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
    -o-transform: translate(-50%, -50%); /* Opera */
    .logo {
      width: 370px;
      margin: 120px 20px 0;
    }

    .word {
      margin: 0 0 30px 10px;
      color: #696969;
      font-size: 22px;
      padding-left: 150px;
    }
  }

  .transDataUpload {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); /* IE 9 */
    -moz-transform: translate(-50%, -50%); /* Firefox */
    -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
    -o-transform: translate(-50%, -50%); /* Opera */
    .upload {
      .el-icon-upload {
        font-size: 120px;
        margin: 120px 0 50px;
      }

      .el-upload-dragger {
        width: 380px;
        height: 360px;
        transform: scale(1);

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
  }
}
</style>