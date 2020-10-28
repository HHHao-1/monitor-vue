<template>
  <div class="analyse">
    <slot name="title"></slot>
    <div class="col-left">
      <el-card class="box-card" v-show="isShowCounts">
        <h3 class="header">地址数据</h3>
        <el-divider class="divider"></el-divider>
        <p class="address">{{ address }}</p>
        <table border="0">
          <tr>
            <td class="left-th">输入次数</td>
            <td class="right-th">{{ inCount }}</td>
          </tr>
          <tr>
            <td class="left-th">输出次数</td>
            <td class="right-th">{{ outCount }}</td>
          </tr>
          <tr>
            <td class="left-th">输入额度</td>
            <td class="right-th" id="green">{{ inValue }}</td>
          </tr>
          <tr>
            <td class="left-th">输出额度</td>
            <td class="right-th" id="red">{{ outValue }}</td>
          </tr>
          <tr>
            <td class="left-th">余额</td>
            <td class="right-th" id="blue">{{ value }}</td>
          </tr>
        </table>
      </el-card>
    </div>
    <div class="col-right">
      <div class="bar">
        <el-button @click="open" type="primary" plain>导入</el-button>
        <input ref="filElem" type="file" class="upload-file" @change="getFile" multiple="multiple" accept=".csv"
               style="display: none">
        <el-button type="primary" plain class="shield" @click="select(1)">屏蔽</el-button>
        <el-button type="primary" plain @click="select(2)">标注</el-button>
        <el-button type="primary" plain @click="select(3)">设定</el-button>

        <div class="shield—card">
          <el-card class="box-card" v-show="isShowShield">
            <h3 class="header">屏蔽</h3>
            <el-divider class="divider"></el-divider>
            <div class="main">
              <el-scrollbar style="height: 245px;">
                <el-form class="form" label-width="15px" size="mini" label-position="left">
                  <el-form-item v-for="(line,index) in lines1" :key="line"
                                :label="(index+1).toString()">
                    <el-input class="input1" v-model="identificationShield[index]"></el-input>
                    <el-button class="sub" icon="el-icon-remove-outline" circle
                               @click="decr(1,index)"></el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="plus" icon="el-icon-circle-plus-outline" circle
                               @click="incr(1)"></el-button>
                  </el-form-item>
                  <el-form-item class="btn">
                    <el-button class="btn-c empty" @click="empty(1)">清空</el-button>
                    <el-button class="btn-c" type="primary" @click="identificationConfirm(1)">确认
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-scrollbar>
            </div>
          </el-card>
        </div>
      </div>

      <div class="mark—card">
        <el-card class="box-card" v-show="isShowMark">
          <h3 class="header">标注</h3>
          <el-divider class="divider"></el-divider>
          <div class="main">
            <el-scrollbar style="height: 245px;">
              <el-form class="form" label-width="15px" size="mini" label-position="left">
                <el-form-item v-for="(line,index) in lines2" :key="line" :label="(index+1).toString()">
                  <el-input class="input1" v-model="identificationMark1[index]"></el-input>
                  <el-input class="input2" v-model="identificationMark2[index]"></el-input>
                  <el-button class="sub" icon="el-icon-remove-outline" circle
                             @click="decr(2)"></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button class="plus" icon="el-icon-circle-plus-outline" circle
                             @click="incr(2)"></el-button>
                </el-form-item>
                <el-form-item class="btn">
                  <el-button class="btn-c empty" @click="empty(2)">清空</el-button>
                  <el-button class="btn-c" type="primary" @click="identificationConfirm(2)">确认
                  </el-button>
                </el-form-item>
              </el-form>
            </el-scrollbar>
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
                <el-button class="btn-c empty" @click="empty(3)">清空</el-button>
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

      //#region 行数
      lines1: 1,
      lines2: 1,
      //#endregion

      //#region 显示、隐藏
      isShowShield: false,
      isShowMark: false,
      isShowSet: false,
      isShowCounts: false,
      //#endregion

      //#region 上传参数
      // files: FileList,
      max: '',
      min: '',
      addressBits: '',
      identificationShield: [],
      identificationMark1: [],
      identificationMark2: [],
      identification: '',
      identification1: '',
      identification2: '',
      //#endregion

      //#region 地址数据
      address: '',
      inCount: Number,
      outCount: Number,
      inValue: BigDecimal,
      outValue: BigDecimal,
      value: BigDecimal,
      //#endregion
    }
  },
  methods: {
    //取消按键重置功能
    empty(id) {
      switch (id) {
        case 1:
          this.identificationShield = [];
          this.identification1 = '';
          this.lines1 = 1;
          // this.select(1);
          break;
        case 2:
          this.identificationMark1 = [];
          this.identificationMark2 = [];
          this.identification2 = '';
          this.lines2 = 1;
          // this.select(2);
          break;
        case 3:
          this.max = '';
          this.min = '';
          this.addressBits = '';
          // this.select(3);
          break;
      }
    },

    //设定信息
    setConfirm() {
      this.getFile()
    },

    //标注信息
    identificationConfirm(id) {
      switch (id) {
        case 1:
          this.identificationShield = this.identificationShield.filter(s => s != '')
          this.identificationT()
          break;
        case 2:
          this.identificationMark1 = this.identificationMark1.filter(s => s != '')
          this.identificationMark2 = this.identificationMark2.filter(s => s != '')
          this.identificationT()
          break;
      }
    },
    identificationT() {
      let tem = '';
      for (let i = 0; i < this.identificationShield.length; i++) {
        tem = tem + this.identificationShield[i] + ',- ';
      }
      this.identification1 = tem;
      tem = '';
      for (let i = 0; i < this.identificationMark1.length; i++) {
        tem = tem + this.identificationMark1[i] + ',' + this.identificationMark2[i] + ' ';
      }
      this.identification2 = tem;
      tem = '';
      this.identification = this.identification1 + this.identification2;
      this.getFile();
    },

    //button选择
    select(id) {
      switch (id) {
        case 1:
          this.isShowShield = !this.isShowShield;
          this.isShowMark = false;
          this.isShowSet = false;
          break;
        case 2:
          this.isShowMark = !this.isShowMark;
          this.isShowShield = false;
          this.isShowSet = false;
          break;
        case 3:
          this.isShowSet = !this.isShowSet;
          this.isShowMark = false;
          this.isShowShield = false;
          break;
      }

    },

    //box-card增加行
    incr(id) {
      switch (id) {
        case 1:
          this.lines1++;
          break;
        case 2:
          this.lines2++;
          break;
      }
    },

    //box-card减少行
    decr(id,index) {
      switch (id) {
        case 1:
          this.lines1--;
          this.identificationShield.splice(index,1)
          break;
        case 2:
          this.lines2--;
          this.identificationMark1.splice(index,1)
          this.identificationMark2.splice(index,1)
          break;
      }
    },

    //选择文件
    open() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },

    //上传文件
    getFile() {
      const that = this;
      if (this.$refs.filElem.files.length != 0) {
        this.$store.commit("updateCurrentLocalFile", this.$refs.filElem.files)
      }
      if (this.$store.state.graphLocalFile.length != 0) {
        let param = new FormData();
        for (let i = 0; i < this.$store.state.graphLocalFile.length; i++) {
          param.append("selectFiles", this.$store.state.graphLocalFile[i]);
        }
        param.append("min", this.min);
        param.append("max", this.max);
        param.append("identification", this.identification);

        axios.post('/api/dealDrawData', param)
            .then(function (res) {
              if (res.data.code == 1000) {
                try {
                  sessionStorage.setItem("response", JSON.stringify(res.data));
                } catch (e) {
                  console.log(e)
                }
                that.$store.commit('getData', res.data)
                that.$parent.getList()
              } else {
                that.$message.error('输入错误')
              }
            })
            .catch(function (error) {
              console.log(error);
              that.$message.error('请求失败');
            });
      } else {
        this.$message.error('请重新导入文件')
      }
    },

  }
}

</script>

<style lang="scss">

.analyse {
  height: 100%;

  .col-left {
    position: fixed;
    top: 70px;
    z-index: 1;
    margin: 20px 30px;
    display: inline-block;
    left: calc(50vw - 640px);

    .box-card {
      font-size: 12px;
      width: 260px;
      height: 270px;

      .el-card__body {
        padding: 10px;
      }

      .header {
        margin: 0 auto;
        text-align: center;
        color: #3A3A3A;
        font-size: 15px;
      }

      .address {
        width: 226px;
        word-break: break-all;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 20px;
      }

      .divider {
        margin: 10px 0 0;
        background: 0 0;
        border-top: 1px dashed #e8eaec;
      }

      table {
        height: 150px;
        width: 240px;

        .left-th {
          text-align: left;
          color: #666666;
          font-size: 14px;
        }

        .right-th {
          text-align: right;
          font-size: 14px;
        }

        #green {
          color: #23A346;
        }

        #red {
          color: #ED1835;
        }

        #blue {
          color: #166BD6;
        }

      }
    }
  }


  .col-right {
    position: absolute;
    top: 70px;
    right: calc(50vw - 640px);
    z-index: 1;
    margin: 20px 10px;
    display: inline-block;

    .shield {
      margin-left: 10px;
    }

    .el-button {
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 6px;
    }

    .el-button--primary.is-plain {
      color: #166BD6;
      background: #FFFF;
      border-color: #409EFF;
    }

    .el-card__body {
      padding: 10px;
    }

    .bar {
      position: fixed;
      right: calc(50vw - 600px);
    }

    .shield—card {
      .box-card {
        margin: 10px 0 0 5px;
        font-size: 12px;
        height: 280px;

        .header {
          margin: 0 auto;
          text-align: center;
          font-size: 15px;
          color: #565656;
        }

        .divider {
          margin: 10px 0 10px;
          background: 0 0;
          border-top: 1px dashed #DBDBDB;
        }

        .main {
          display: inline-block;

          .el-scrollbar__bar {
            &.is-vertical {
              width: 0; //滚动条宽度
            }
          }

          .el-input {
            width: 245px;
          }

          .btn {
            position: relative;
            left: 105px;

            .btn-c {
              padding: 7px 15px;
              background: #166BD6;
              border-radius: 4px;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FFFFFF;
              letter-spacing: 0;
              line-height: 14px;
            }

            .empty {
              background: #FFFFFF;
              border: 1px solid #166BD6;
              border-radius: 4px;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #166BD6;
              letter-spacing: 0;
              line-height: 14px;
            }
          }

          .plus {
            width: 245px;
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
      top: 125px;
      right: calc(50vw - 600px);

      .box-card {
        margin: 10px 0 0 5px;
        font-size: 12px;
        height: 280px;

        .header {
          margin: 0 auto;
          text-align: center;
          font-size: 15px;
          color: #565656;
        }

        .divider {
          margin: 10px 0 10px;
          background: 0 0;
          border-top: 1px dashed #DBDBDB;
        }

        .main {
          display: inline-block;

          .el-scrollbar__bar {
            &.is-vertical {
              width: 0; //滚动条宽度
            }
          }

          .el-input {
            width: 220px;
          }

          .input2 {
            width: 100px;
            margin-left: 5px;
          }

          .btn {
            position: relative;
            left: 185px;

            .btn-c {
              padding: 7px 15px;
              background: #166BD6;
              border-radius: 4px;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FFFFFF;
              letter-spacing: 0;
              line-height: 14px;
            }

            .empty {
              background: #FFFFFF;
              border: 1px solid #166BD6;
              border-radius: 4px;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #166BD6;
              letter-spacing: 0;
              line-height: 14px;
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
      top: 125px;
      right: calc(50vw - 600px);

      .box-card {
        margin: 10px 0 0 5px;
        font-size: 12px;
        width: 230px;
        height: 240px;

        .header {
          margin: 0 auto;
          text-align: center;
          font-size: 15px;
          color: #565656;
        }

        .divider {
          margin: 10px 0 10px;
          background: 0 0;
          border-top: 1px dashed #DBDBDB;
        }

        .main {
          display: inline-block;

          .el-input {
            width: 110px;
          }

          .btn {
            position: absolute;
            right: 3px;

            .btn-c {
              padding: 7px 15px;
              background: #166BD6;
              border-radius: 4px;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FFFFFF;
              letter-spacing: 0;
              line-height: 14px;
            }

            .empty {
              background: #FFFFFF;
              border: 1px solid #166BD6;
              border-radius: 4px;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #166BD6;
              letter-spacing: 0;
              line-height: 14px;
            }
          }
        }
      }
    }
  }

}

</style>