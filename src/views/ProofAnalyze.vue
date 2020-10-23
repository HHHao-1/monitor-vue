<template>
    <div class="Analyze">
        <Title class="title"></Title>
        <input type="file" id="uploadFile" ref="selectFile" @change="getDataAndDeal()" accept=".xlsx"
               style="display: none;">
        <div id="luckysheet"></div>
        <div class="topButton">
            <el-button class="sheetName" v-for="(item,index) in sheetList" @click="sheetActive(index)" :key="index">
                {{item}}
            </el-button>
            <div>
                <el-button class="functionButton" id="download" @click="downloadFile()">下载文件</el-button>
                <el-button type="primary" class="functionButton" id="upload" onclick="uploadFile.click()">重新上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import XLSX from 'xlsx';
    import Title from "../components/Title";

    export default {

        name: 'Analyze',
        components: {
            Title
        },

        data() {
            return {
                file: null,
                sheetList: [],
            }
        },

        mounted() {
            // this.$nextTick(_ => {
            //   this.dealData()
            // })
            this.dealData()
        },

        methods: {
            //传数据到后台处理
            getDataAndDeal() {
                this.file = this.$refs.selectFile.files[0];
                var param = new FormData();
                param.append('selectFile', this.file);
                axios.post('/api/huobiStat', param).then(res => {
                    var results = res.data.data;
                    if (res.data.code === 1003) {
                        alert("解析失败，表格字段缺失");
                    } else if (res.data.code === 1000) {
                        this.$store.commit("updateResult", results);
                        this.dealData()
                    }
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
                for (let i = 0; i < results.length; i++) {
                    if (i % 2 === 0) {
                        options.data[i] = {
                            "name": results[i + 1][2][0] + "_ " + "流水",
                        };
                        this.sheetList.push(options.data[i].name)

                    } else {
                        options.data[i] = {
                            "name": results[i][2][0] + "_ " + "统计",
                            "config": {
                              // "merge":{
                              //   "0_0": {
                              //     "r": 0,
                              //     "c": 0,
                              //     "rs": 1,
                              //     "cs": 9
                              //   }
                              // }
                            }
                        };
                        this.sheetList.push(options.data[i].name)

                    }
                    //工作表配置
                    options.data[i].zoomRatio = 1.5;
                    options.data[i].defaultColWidth = 140;
                    options.data[i].defaultRowHeight = 25;
                    options.data[i].celldata = [];
                    options.data[i].index = i;
                    options.data[i].order = i;
                    options.data[i].column = results[0][0].length;
                    options.data[i].row = results[i].length;
                    //特定列格式处理
                    for (let j = 0; j < results[i].length; j++) {
                        for (let k = 0; k < results[0][0].length; k++) {
                            if (i % 2 === 0 && k === 1) {
                                options.data[i].celldata.push({
                                    "r": j,
                                    "c": k,
                                    "v": {
                                        "v": results[i][j][k],
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
                                        "v": results[i][j][k],
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
                for (var i = 0; i < results.length; i++) {
                    if (i % 2 === 0) {
                        var wooksheet0 = XLSX.utils.aoa_to_sheet(results[i]);
                        XLSX.utils.book_append_sheet(newbook, wooksheet0, results[i + 1][2][0] + "_ " + results[i + 1][2][1] + "流水");
                    } else {
                        var wooksheet1 = XLSX.utils.aoa_to_sheet(results[i]);
                        XLSX.utils.book_append_sheet(newbook, wooksheet1, results[i][2][0] + "_ " + results[i][2][1] + "统计");
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
<style>

  .title{
    display: block;
    height: 100px;
  }

  #luckysheet {
      margin: 0;
      padding: 0;
      position: absolute;
      width: 100%;
      height: calc(100% - 200px);
      left: 0;
      top: 200px;
  }

  .sheetName {
      float: left;
      margin-left: 30px;
      margin-right: 10px;
  }

  .topButton{
    height: 100px;
    background-color: #f5f5f5;
    padding-top: 30px;
  }

  .sheetName{

  }

  .functionButton {
      float: right;
      margin-left: 10px;
      margin-right: 30px;
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

  a {
      color: #42b983;
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

  #luckysheet-sheet-container-c {
      /*修改标签页css*/
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

</style>
