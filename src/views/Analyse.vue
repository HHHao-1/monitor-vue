<template>
  <div class="analyse">
    <div class="col-left" style="position:absolute;left:0;top:0">
      <el-card class="box-card" v-show="isShowCounts">
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
          <p>{{ inCount }}</p>
          <p>{{ outCount }}</p>
          <p class="green">{{ inValue }}</p>
          <p class="red">{{ outValue }}</p>
          <p class="blue">{{ value }}</p>
        </div>
      </el-card>
    </div>
    <div class="col-right" style="position:absolute;left:0;top:0">
      <div class="bar">
        <el-button @click="open" type="primary" plain>导入</el-button>
        <input ref="filElem" type="file" class="upload-file" @change="getFile" multiple="multiple" accept=".csv"
               style="display: none">
        <el-button type="primary" plain class="shield" @click="select1">屏蔽</el-button>
        <el-button type="primary" plain @click="select2">标注</el-button>
        <el-button type="primary" plain @click="select3">设定</el-button>

        <div class="shield—card">
          <el-card class="box-card" v-show="isShowShield">
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
          </el-card>
        </div>
      </div>

      <div class="mark—card">
        <el-card class="box-card" v-show="isShowMark">
          <h3 class="header">标注</h3>
          <el-divider class="divider"></el-divider>
          <div class="main">
            <el-form class="form" label-width="15px" size="mini" label-position="left">
              <el-form-item v-for="(line,index) in lines" :key="line" :label="(index+1).toString()">
                <el-input class="input1"></el-input>
                <el-input class="input2"></el-input>
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
        </el-card>
      </div>

      <div class="set—card">
        <el-card class="box-card" v-show="isShowSet">
          <h3 class="header">解析设定</h3>
          <el-divider class="divider"></el-divider>
          <div class="main">
            <el-form class="form" label-width="100px" size="mini" label-position="left">
              <el-form-item label="最大值">
                <el-input class="input1" v-model="max"></el-input>
              </el-form-item>
              <el-form-item label="最小值">
                <el-input class="input1" v-model="min"></el-input>
              </el-form-item>
              <el-form-item label="显示地址位数">
                <el-input class="input1" v-model="addressBits"></el-input>
              </el-form-item>
              <el-form-item class="btn">
                <el-button class="btn-c">取消</el-button>
                <el-button class="btn-c" type="primary" @click="setConfirm">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>

    </div>
    <slot></slot>
  </div>
</template>

<script>
import axios from "axios";
import BigDecimal from "bigdecimal";

export default {
  data() {
    return {
      lines: 1,

      isShowShield: false,
      isShowMark: false,
      isShowSet: false,
      isShowCounts: false,

      files: FileList,
      max: '',
      min: '',
      addressBits: '',
      identification: '',

      inCount: Number,
      outCount: Number,
      inValue: BigDecimal,
      outValue: BigDecimal,
      value: BigDecimal,
    }
  },
  methods: {
    setConfirm() {
        this.$store.state.request.max = this.max;
       this.$store.state.request.min = this.min;
      this.getFile();

    },

    select1() {
      this.isShowShield = !this.isShowShield;
      this.isShowMark = false;
      this.isShowSet = false;
    },
    select2() {
      this.isShowMark = !this.isShowMark;
      this.isShowShield = false;
      this.isShowSet = false;
    },
    select3() {
      this.isShowSet = !this.isShowSet;
      this.isShowMark = false;
      this.isShowShield = false;
    },
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
      this.files = this.$refs.filElem.files;

      let param = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        param.append("selectFiles", this.files[i]);
      }
      param.append("min", this.min);
      param.append("max", this.max);
      param.append("identification", this.identification);

      const that = this;
      axios.post('/api/dealDrawData', param)
          .then(function (res) {
            console.log(res.data);
            if (res.data.code == 1000) {
              sessionStorage.setItem("response", JSON.stringify(res.data));
              that.$store.commit('getData', JSON.parse(sessionStorage.getItem("response")))
              that.$parent.getList()
            } else {
              that.$message.error('输入错误')
            }
          })
          .catch(function (error) {
            console.log(error);
            that.$message.error('请求失败');
          });
    },
  }
}

</script>

<style lang="scss">
//.analyse {
//  height:100%;
//}

.col-left {
  margin: 20px 30px;
  display: inline-block;

  .box-card {
    font-size: 12px;
    width: 240px;
    height: 195px;

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

      p {
        text-align: right;
      }

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
  //right: 10px;


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

  .bar {
    position: fixed;
    right: 10px;
  }

  .shield—card {
    .box-card {
      //position: absolute;
      //left: 8px;
      //top: 50px;
      margin: 10px 0 0 5px;
      font-size: 12px;
      //width: 278px;
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
          width: 230px;
        }

        .btn {
          position: absolute;
          right: 33px;

          .btn-c {
            padding: 7px 15px;
          }
        }

        .plus {
          width: 230px;
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
    }
  }

  .mark—card {
    position: fixed;
    top: 62px;
    right: 10px;

    .box-card {
      margin: 10px 0 0 5px;
      font-size: 12px;
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

        .input2 {
          width: 100px;
          margin-left: 5px;
        }

        .btn {
          position: absolute;
          right: 33px;

          .btn-c {
            padding: 7px 15px;
          }
        }

        .plus {
          width: 325px;
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
    }
  }

  .set—card {
    position: fixed;
    top: 62px;
    right: 10px;

    .box-card {
      margin: 10px 0 0 5px;
      font-size: 12px;
      width: 230px;
      height: 240px;

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
          width: 110px;
        }

        .btn {
          position: absolute;
          right: 12px;

          .btn-c {
            padding: 7px 15px;
          }
        }
      }
    }
  }
}

</style>