<template>
  <div>
    <div class="col-left">
      <!--      <p class="name">导入图谱名称</p>-->
      <el-card class="box-card">
        <h3 class="header">地址数据</h3>
        <el-divider class="divider"></el-divider>
        <div class="left">
          <p>输入次数</p>
          <p>输出次数</p>
          <p>输入额度</p>
          <p>输出额度</p>
          <p>余额</p>
        </div>
        <div class="right">
          <p>1</p>
          <p>2</p>
          <p class="green">3</p>
          <p class="red">4</p>
          <p class="blue">5</p>
        </div>
      </el-card>
    </div>
    <div class="col-right">
      <el-button @click="open" type="primary" plain>导入</el-button>
      <input ref="filElem" type="file" class="upload-file" @change="getFile" multiple="multiple" accept=".csv"
             style="display: none">
      <el-button type="primary" plain class="shield" @click="isShow=!isShow">屏蔽</el-button>
      <el-button type="primary" plain @click="isShow=!isShow">标注</el-button>
      <el-button type="primary" plain @click="isShow=!isShow">设定</el-button>

      <div class="shield—card">
        <el-collapse-transition>
          <el-card class="box-card" v-show="isShow">
            <h3 class="header">屏蔽</h3>
            <el-divider class="divider"></el-divider>
            <div class="main">
              <el-form class="form" label-width="15px" size="mini" label-position="left">
                <el-form-item v-for="(line,index) in lines" :key="line" :label="(index+1).toString()">
                  <el-input></el-input>
                  <el-button class="sub" icon="el-icon-remove-outline" circle @click="decr"></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button class="plus" icon="el-icon-circle-plus-outline" circle @click="incr"></el-button>
                </el-form-item>
                <el-form-item class="btn">
                  <el-button class="btn-c">取消</el-button>
                  <el-button class="btn-c" type="primary">确认</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--            <div class="right">-->
            <!--              <el-button class="sub" icon="el-icon-remove-outline" circle @click="decr"></el-button>-->
            <!--            </div>-->
          </el-card>
        </el-collapse-transition>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      lines: 1,
    }
  },
  methods: {
    incr() {
      this.lines++;
    },
    decr() {
      this.lines--;
    },
    open() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    getFile() {
      const selectedFile = this.$refs.filElem.files;
      selectedFile.forEach(item => {
        var name = item.name; //选中文件的文件名
        var size = item.size; //选中文件的大小
        console.log("文件名:" + name + "大小:" + size);
      })
    },
  }
}

</script>

<style lang="scss">
.col-left {
  margin: 20px 30px;
  display: inline-block;

  //.name {
  //  margin:0 0 40px;
  //  font-family: Avenir, Helvetica, Arial, sans-serif;
  //}

  .box-card {
    font-size: 12px;
    width: 240px;
    height: 195px;
    //resize: horizontal;

    .el-card__body {
      padding: 10px;
    }

    .header {
      margin: 0 auto;
      text-align: center;
    }

    .divider {
      margin: 10px 0 0;
      background: 0 0;
      border-top: 1px dashed #e8eaec;
    }

    .left {
      display: inline-block;
    }

    .right {
      display: inline-block;
      float: right;

      .green {
        color: green;
      }

      .red {
        color: red;
      }

      .blue {
        color: blue;
      }
    }
  }
}

.col-right {
  margin: 20px 10px;
  display: inline-block;
  position: absolute;
  right: 10px;


  .shield {
    margin-left: 10px;
  }

  .el-button {
    padding: 10px 20px;
    font-size: 10px;
    border-radius: 6px;
  }

  .el-button--primary.is-plain {
    color: #409EFF;
    background: #FFFF;
    border-color: #409EFF;
  }

  .el-card__body {
    padding: 10px;
  }

  .box-card {
    width: 320px;
    position: absolute;

    left: 8px;
    top: 50px;
    font-size: 12px;
    width: 278px;
    height: 280px;
    resize: vertical;

    .header {
      margin: 0 auto;
      text-align: center;
    }

    .divider {
      margin: 10px 0 10px;
      background: 0 0;
      border-top: 1px dashed #e8eaec;
    }

    .main {
      display: inline-block;

      .el-input {
        width: 220px;
      }

      .btn{
        position: absolute;
        right: 33px;
        .btn-c {
          padding: 7px 15px;
        }
      }

      .plus {
        width: 220px;
        font-size: 17px;
        color: gray;
        padding: 5px;
        border: 1px dashed #e8eaec;
      }

      .sub {
        margin-top: 5px;
        margin-left: 5px;
        font-size: 17px;
        color: gray;
        padding: 0;
        border-width: 0;
      }
    }

    //.right {
    //  display: inline-block;
    //  float: right;
    //
    //  .sub {
    //    margin-top: 5px;
    //    font-size: 17px;
    //    color: gray;
    //    padding: 0;
    //    border-width: 0;
    //  }
    //}

  }
}


</style>