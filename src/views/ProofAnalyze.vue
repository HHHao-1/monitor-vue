<template>
  <div class="analyzes">
    <title-s class="title" :page-name="pageName"></title-s>
    <input type="file" id="uploadFile" ref="selectFile" @change="getDataAndDeal()" accept=".xlsx"
           style="display: none;">
    <div class="lucky-container">
      <div id="luckysheet"></div>
    </div>
    <div class="down-panel">
      <el-button class="functionButton" id="download" @click="downloadFile()">下载文件</el-button>
      <el-button type="primary" class="functionButton" id="upload" onclick="uploadFile.click()">重新上传</el-button>
    </div>
    <div class="sheet-action">
      <el-scrollbar
          wrapClass="scrollbar"
          viewClass="sheetName"
          wrapStyle="color:'#fff';fontSize:'16px';"
          viewStyle="color:'#fff';fontSize:'16px';width:max-content;"
          :native="true"
          tag="ul"
      >
        <el-button class="sheetName" v-for="(item,index) in sheetList" @click="sheetActive(index)" :key="index">
          {{ item }}
        </el-button>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import XLSX from 'xlsx';
import TitleS from "../components/TitleS";

export default {

  name: 'Analyze',
  components: {
    TitleS
  },

  data() {
    return {
      file: null,
      sheetList: [],
      pageName: '调证文件解析工具',
    }
  },

  mounted() {
    this.dealData()
  },

  methods: {
    //传数据到后台处理
    getDataAndDeal() {
      const loading = this.$loading({
        lock: true,
        text: '处理中，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.file = this.$refs.selectFile.files[0];
      var param = new FormData();
      param.append('selectFile', this.file);
      var that = this;
      axios.post('/api/huobiStat', param, {
        timeout: 1000000
      }).then(res => {
        loading.close();
        var results = res.data.data;
        if (res.data.code === 1001) {
          that.$alert('解析失败，表格字段缺失', '提示', {
            confirmButtonText: '确定'
          });
        } else if (res.data.code === 1000) {
          this.$store.commit("updateResult", results);
          this.dealData();
        }
      }).catch(function (error) {
        loading.close();
        that.$alert('文件上传失败', '提示', {
          confirmButtonText: '确定'
        });
      })
    },
    dealData() {
      luckysheet.destroy();
      var results = this.$store.state.results;
      //整体配置
      var options = {
        container: 'luckysheet', //luckysheet为容器id
        title: '',
        lang: "zh",
        data: [],
        showGridLines: 1,
        showtoolbar: false,
        showinfobar: false,
        showstatisticBar: false,
        allowEdit: false,
      };
      this.sheetList = [];
      //设置表格名称
      let n = 0;
      let m = 0;
      for (let i = 0; i < results.length - 1; i++) {
        if (i % 2 === 0) {
          options.data[i] = {
            "name": results[0][n++][1] + "_ " + "流水",
          };
          this.sheetList.push(options.data[i].name)
        } else {
          options.data[i] = {
            "name": results[0][m++][1] + "_ " + "统计",
          };
          this.sheetList.push(options.data[i].name)
        }

        options.data[i].zoomRatio = 1.5;
        options.data[i].defaultColWidth = 140;
        options.data[i].defaultRowHeight = 25;
        options.data[i].celldata = [];
        options.data[i].index = i;
        options.data[i].order = i;
        options.data[i].column = results[1][0].length;
        options.data[i].row = results[i + 1].length;
        //特定列格式处理
        for (let j = 0; j < results[i + 1].length; j++) {
          for (let k = 0; k < results[1][0].length; k++) {
            if (i % 2 === 0 && k === 1) {
              options.data[i].celldata.push({
                "r": j,
                "c": k,
                "v": {
                  "v": results[i + 1][j][k],
                  "ct": {
                    "fa": "0",
                    "t": "n"
                  }
                }
              })
            } else {
              options.data[i].celldata.push({
                "r": j,
                "c": k,
                "v": {
                  "v": results[i + 1][j][k],
                  "ct": {
                    "fa": "General",
                    "t": "g"
                  }
                }
              })
            }
          }
        }
      }
      luckysheet.create(options);
    },
    //生成Excel文件
    downloadFile() {
      var results = this.$store.state.results;
      var newbook = XLSX.utils.book_new();
      let n = 0;
      let m = 0;
      for (var i = 0; i < results.length - 1; i++) {
        if (i % 2 === 0) {
          var wooksheet0 = XLSX.utils.aoa_to_sheet(results[i + 1]);
          XLSX.utils.book_append_sheet(newbook, wooksheet0, results[0][n][1] + "_ " + results[0][n++][0] + "流水");
        } else {
          var wooksheet1 = XLSX.utils.aoa_to_sheet(results[i + 1]);
          XLSX.utils.book_append_sheet(newbook, wooksheet1, results[0][m][1] + "_ " + results[0][m++][0] + "统计");
        }
      }
      XLSX.writeFile(newbook, "火币调证整理.xlsx");
    },
    //设定表格激活状态
    sheetActive(order) {
      luckysheet.setSheetActive(order)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
body {
  margin: 0;
}

.analyzes {

  background-color: #f5f5f5;

  .el-scrollbar {
    height: 70px;
  }


  .lucky-container {
    position: absolute;
    background-color: #f5f5f5;
    padding: 0 6%;
    height: calc(100% - 200px);
    width: 88%;
    left: 0;
    right: 0;
    top: 197px;
  }

  #luckysheet {
    height: 100%;
    position: relative;
  }

  .el-button {
    border-style: none none none none;
  }

  .sheetName:focus {
    border-style: none none solid none;
    border-color: #166BD6;
    color: #166BD6;
  }

  .sheetName:hover {
    color: #409eff;
    border-style: none none solid none;
  }

  .sheetName {
    float: left;
    padding-top: 4px;
    padding-bottom: 15px;
    border-width: 2px;
    background-color: white;
    border-radius: 0;
    color: #7D7D7D;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 15px;
  }

  .down-panel {
    width: 100%;
    display: flex;
    height: 68px;
    flex-direction: row-reverse;
    background-color: #f5f5f5;
  }

  .sheet-action {
    height: 60px;
    background-color: white;
    border: 9px solid #f5f5f5;
    border-style: none none solid none;
    margin: 0px 6% 0 6%;
  }

  .functionButton {
    margin: 16px 6px 0px 6px;
    width: 100px;
    height: 36px;
    position: relative;
    right: 6%;
  }

  #upload {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 14px;
    background: #166BD6;
    border-radius: 4px;
  }

  #download {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #166BD6;
    letter-spacing: 0;
    line-height: 14px;
    background: #FFFFFF;
    border: 1px solid #166BD6;
    border-radius: 4px;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }


  /*隐藏左上角返回图标*/
  #luckysheet_info_detail_title {
    display: none;
  }

  /*隐藏顶部表名*/
  .sheet-name {
    display: none;
  }

  #luckysheet_info_detail_update {
    display: none;
  }

  #luckysheet_info_detail_save {
    display: none;
  }

  /*隐藏复制按钮*/
  #luckysheet-copy-btn {
    display: none;
  }

  /*隐藏标题栏*/
  .luckysheet_info_detail {
    display: none;
  }

  /*隐藏公式栏*/
  #luckysheet-wa-calculate {
    display: none;
  }

  /*隐藏底部控制栏*/
  #luckysheet-bottom-controll-row {
    display: none;
  }

  /*隐藏sheet增加栏*/
  #luckysheet-sheets-add {
    display: none;
  }

  /*隐藏sheet管理栏*/
  #luckysheet-sheets-m {
    display: none;
  }

  /*隐藏sheet右键菜单*/
  .luckysheet-sheet-area div.luckysheet-sheets-item .luckysheet-sheets-item-menu {
    display: none;
  }

  /*隐藏右键菜单*/
  .luckysheet-cols-menu {
    display: none !important;
  }

  /*隐藏右键菜单按钮*/
  .luckysheet-cols-menu-btn {
    display: none !important;
  }

  /*隐藏底部sheet页*/
  .luckysheet-sheet-container {
    display: none !important;
  }
}

</style>
