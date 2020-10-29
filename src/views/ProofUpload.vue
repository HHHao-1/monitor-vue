<template>
  <div class="proofUpload">
    <div class="transDataUpload">
      <div class="titleS">
        <embed class="logo" :src="url.logo" type="image/svg+xml"/>
        <p class="word"><b>—— 调证文件解析工具</b></p>
      </div>
      <el-upload
          class="upload"
          :action="url.post"
          name="selectFile"
          :drag="true"
          :multiple="false"
          accept=""
          :on-progress="openFullScreen"
          :on-success="handleUploadSuccess"
          :on-error="failToUpload"
      >
        <embed class="icon" :src="url.upload" type="image/svg+xml"/>
        <el-button class="selectFile" type="primary"><span class="buttonWordUp">选择文件</span></el-button>
        <br/>
        <el-button @click="download()"><span class="buttonWordDown">下载模板</span></el-button>
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
        upload: require("../assets/upload.svg"),
        post: "/api/huobiStat"
      }
    }
  },
  methods: {
    handleUploadSuccess(response) {
      const loading = this.$loading();
      loading.close();
      if(response.code === 1001){
        this.$alert('解析失败，表格字段缺失', '提示', {
          confirmButtonText: '确定'
        });
      }else if(response.code === 1000) {
        this.$store.commit("updateResult", response.data)
      };

      this.$router.push('/proofAnalyze')
    },
    failToUpload(){
      const loading = this.$loading();
      loading.close();
      this.$alert('文件上传失败', '提示', {
        confirmButtonText: '确定'
      });
    },
    download(){
      window.location.href = "/调证数据模板.xlsx";
    },
    openFullScreen(){
      const loading = this.$loading({
        lock: true,
        text: '处理中，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  }
}
</script>

<style lang="scss">
  .proofUpload {

    .transDataUpload {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%); /* IE 9 */
      -moz-transform: translate(-50%, -50%); /* Firefox */
      -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
      -o-transform: translate(-50%, -50%); /* Opera */

      .titleS {
        text-align: center;

        .logo {
          width: 435px;
        }

        .word {
          font-family: PingFangSC-Medium;
          font-size: 26px;
          color: #717171;
          letter-spacing: 0.16px;
          text-align: right;
          line-height: 26px;
          margin-right: 40px;
          margin-bottom: 71px;
          margin-top: 12px;
        }
      }

      .upload {

        .icon {
              width:164px;
              height:164px;
              margin: 52px 0 36px 0;
        }
        .el-icon-upload {
          font-size: 165px;
          margin-top: 92px;
          margin-bottom: 99px;
        }

        .el-upload-dragger {
          width: 500px;
          height: 480px;
        }

        .el-button--default {
          color: #409EFF;
          border-color: #409EFF;
        }

        .el-button {
          width: 400px;
          height: 56px;
          margin: 12px 0;
        }

        .selectFile{
          background: #166BD6;
          border-radius: 4px;
        }

        .buttonWordUp{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: right;
          line-height: 18px;
        }

        .buttonWordDown{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #166BD6;
          letter-spacing: 0;
          text-align: right;
          line-height: 18px;
        }

        .el-upload__text {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          line-height: 16px;
          margin-top: 12px;

        }
      }
    }
  }
</style>
