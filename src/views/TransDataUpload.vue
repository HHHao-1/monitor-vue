<template>
  <div class="transDataUpload">
    <div class="titleS">
      <embed class="logo" :src="url.logo" type="image/svg+xml"/>
      <p class="word"><b>—— 交易关系图谱</b></p>
    </div>
    <div class="transDataUpload">
      <el-upload
          class="upload"
          :action="url.post"
          name="selectFiles"
          drag
          accept=".csv"
          multiple
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
      >
        <i class="el-icon-upload"></i>
        <el-button type="primary">选择文件</el-button>
        <br/>
        <el-button @click="download()">下载模板</el-button>
        <div class="el-upload__text">请先选择要导入的文件,并确保文件格式准确无误</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: {
        logo: require("../assets/logo.svg"),
        post: "/api/dealDrawData"
      }
    }
  },
  methods: {
    handleUploadSuccess(response) {
      sessionStorage.setItem("response", JSON.stringify(response))
      this.$store.commit('getData', JSON.parse(sessionStorage.getItem("response")))
      this.$router.push('/drawAtlas')
    }
    ,
    handleUploadError(err) {
      //文件上传失败后的操作
      console.log(err)
    }
    ,
    download() {
      window.location.href = "/modelFile.csv";
    }
  }
}
</script>

<style lang="scss">
.transDataUpload {

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
      margin: 0 0 30px 40px;
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
        margin: 80px 0 50px;
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