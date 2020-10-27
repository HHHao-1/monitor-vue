<template>
  <div class="transDataUpload">

    <div class="transDataUpload">
      <div class="titleS">
<!--        <embed class="logo" :src="url.logo" type="image/svg+xml"/>-->
<!--        <p class="word"><b>—— 交易关系图谱</b></p>-->
        <p style="text-align: center; color: #717171; font-size: 35px;"><b>交易关系图谱</b></p>
      </div>
      <el-upload
          class="upload"
          ref="upload"
          action
          drag
          accept=".csv"
          :file-list="fileList"
          :on-change="change"
          multiple
          :http-request="uploadFile"
      >
        <embed class="icon" :src="url.upload" type="image/svg+xml"/>
        <el-button class="select-btn" type="primary">选择文件</el-button>
        <br/>
<!--        <el-button @click="download()">下载模板</el-button>-->
        <div class="el-upload__text">请先选择要导入的文件,并确保文件格式准确无误</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      url: {
        logo: require("../assets/logo.svg"),
        upload: require("../assets/upload.svg"),
        post: "/api/dealDrawData"
      },
      fileList: [],
      res: "",
      result: ""
    }
  },
  methods: {
    uploadFile() {
      const that = this;
      let param = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        param.append("selectFiles", this.fileList[i]);
      }
      this.$refs.upload.clearFiles();
      axios.post('/api/dealDrawData', param)
          .then(function (res) {
            console.log(res)
            if (res.data.code == 1000) {
              try {
                sessionStorage.setItem("response", JSON.stringify(res.data));
              }catch (e) {
                console.log(e)
              }
              that.$store.commit('getData', res.data)
              that.$router.push('/drawAtlas')
            } else {
              that.$message.error('输入错误')
            }
          })
          .catch(function (error) {
            this.$refs.upload.clearFiles();
            console.log(error);
            that.$alert('文件上传失败', '提示', {
              confirmButtonText: '确定'
            });
          });
    },
    change() {
      //判断上传文件数量
      this.$refs.upload.clearFiles();
      this.length = document.querySelector("input[type=file]").files.length;
      if (this.length > 0) {
        Array.from(document.querySelector("input[type=file]").files).forEach(
            file => {
              if (this.fileList.indexOf(file) == -1) {
                this.fileList.push(file);
              }
            }
        );
      }
      this.$store.commit("updateCurrentLocalFile", this.fileList)
      return false;
    },
    // download() {
    //   window.location.href = "/modelFile.csv";
    // }
  }
}
</script>

<style lang="scss">
.transDataUpload {
  .transDataUpload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); /* IE 9 */
    -moz-transform: translate(-50%, -50%); /* Firefox */
    -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
    -o-transform: translate(-50%, -50%); /* Opera */
    text-align: center;

    .titleS {
      .logo {
        display: inline-block;
        height:60px;
        width: 413px;
        margin: 0 5px;
      }

      .word {
        font-size: 26px;
        margin: 0 0 65px 0;
        color: #717171;
        letter-spacing: 0.16px;
        text-align: right;
        line-height: 26px;
        width: 220px;
        padding-left: 230px;
      }
    }

    .upload {
      .icon {
        width:164px;
        height:164px;
        margin: 50px 0 0;
      }

      .el-upload-dragger {
        width: 500px;
        height: 400px;
        transform: scale(1);
        border: 1px dashed #C5C5C5;
        border-radius: 8px;
      }

      .el-button--default {
        color: #409EFF;
        border-color: #409EFF;

      }

      .el-button {
        width:400px;
        height:56px;
        //width: 80%;
        margin: 45px 0 25px;
        background: #166BD6;
        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 18px;
      }

      .el-upload__text {
        margin: 0 0 30px;
        font-size: 16px;
        color: #999999;

      }
    }
  }
}
</style>