<template>
  <div class="transDataUpload">

    <div class="transDataUpload">
      <div class="titleS">
        <embed class="logo" :src="url.logo" type="image/svg+xml"/>
        <p class="word"><b>—— 交易关系图谱</b></p>
      </div>
      <el-upload
          class="upload"
          action
          drag
          accept=".csv"
          :file-list="fileList"
          :on-change="change"
          multiple
          :http-request="uploadFile"
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
import axios from "axios";

export default {
  data() {
    return {
      url: {
        logo: require("../assets/logo.svg"),
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
        axios.post('/api/dealDrawData', param)
            .then(function (res) {
              console.log(res.data);
              if (res.data.code == 1000) {
                sessionStorage.setItem("response", JSON.stringify(res.data));
                that.$store.commit('getData', JSON.parse(sessionStorage.getItem("response")))
                that.$router.push('/drawAtlas')
              } else {
                that.$message.error('输入错误')
              }
            })
            .catch(function (error) {
              console.log(error);
              that.$message.error('请求失败');
            });
    },
    change() {
      //判断上传文件数量
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
      return false;
    },
    download() {
      window.location.href = "/modelFile.csv";
    }
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

    .titleS {
      .logo {
        width: 370px;
        margin: 0 5px;
      }

      .word {
        margin: 0 0 30px 40px;
        color: #696969;
        font-size: 22px;
        padding-left: 150px;
      }
    }

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