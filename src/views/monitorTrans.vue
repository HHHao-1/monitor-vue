<template>
  <common>
    <template v-slot:content>
      <div class="content">
        <div class="table">
          <el-table :data="tableData" :highlight-current-row=true
                    :header-cell-style="{background:' #ECF6FA'}"
                    style="width: 100%">
            <el-table-column prop="unusualTime" show-overflow-tooltip width="200px" label="异动时间"></el-table-column>
            <el-table-column prop="coinKind" show-overflow-tooltip width="100px" label="币种">
              <template slot="header" slot-scope="scope">
                <el-popover
                    placement='bottom-start'
                    width="65"
                    trigger='click'
                    class="el-pop-width"
                >
                  <div style="text-align: left; margin: 0" v-for="item in coinKind" class="coinKind">
                    <el-checkbox>{{ item }}</el-checkbox>
                  </div>
                  <el-divider class="divider"></el-divider>
                  <el-button class="coinKind-button">确认</el-button>
                  <span slot="reference">币种<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="fromAddress" show-overflow-tooltip label="发送地址"></el-table-column>
            <el-table-column prop="toAddress" show-overflow-tooltip label="接收地址"></el-table-column>
            <el-table-column prop="unusualCount" show-overflow-tooltip label="异动额度"></el-table-column>
            <el-table-column prop="transHash" show-overflow-tooltip
                             label="交易哈希"></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
                background
                layout="prev, pager, next"
                :total='child.total'
                :page-size='child.pageSize'
                @current-change="handleCurrentChange"
                @prev-click="handlePrevChange"
                @next-click="handleNextChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </template>
  </common>
</template>
<script>
import Common from "@/components/Common";

export default {
  components: {
    Common
  },
  name: "monitor",
  data() {
    return {
      tableData: [],
      value1: '',
      value2: '',
      visible1: null,
      visible2: null,
      coinKind: [],
      child: {
        pageSize: 8,
        currentPage: 0,
        total: 0,
      }
    }
  },
  methods: {
    renderHeader(h, {column, $index}, index) {
      switch ($index) {
        case 1:
          return h('span', {}, [
            h('span', {}, '监控事件'),
            h('el-popover', {
                  style: ':hover{background-color:yellow}',
                  props: {
                    placement: 'bottom',
                    width: '160',
                    trigger: 'click',
                    value: this.visible1,
                    offset: 30
                  },
                },
                [h('div', {
                      style: "text-align:center;",
                      class: 'monitorEvent',
                    },
                    [
                      h('input', {
                        style: 'border: 1px solid #DBDBDB;border-radius: 4px;' +
                            'width:142px;height:30px;',
                        class: 'popInput',
                        domProps: {
                          value: this.value1,
                        },
                        on: {
                          input: (event) => {
                            this.value1 = event.target.value;
                          }
                        }
                      }, ''),
                      h('el-button', {
                        style: 'background: #166BD6;border-radius: 4px;border-radius: 4px;' +
                            'width:66px;height:30px;margin-top:10px;' +
                            'font-size: 14px;' +
                            'color: #FFFFFF;' +
                            'letter-spacing: 0;' +
                            'text-align: center;' +
                            'line-height: 7px;',
                        class: 'confirm',
                        on: {
                          click: () => {
                            alert(this.value1)
                          }
                        }
                      }, '搜索'),
                      h('el-button', {
                        style: 'background: #DBDBDB;border-radius: 4px;border-radius: 4px;' +
                            'width:66px;height:30px;margin-top:10px;' +
                            'font-size: 14px;' +
                            'color: #666666;' +
                            'letter-spacing: 0;' +
                            'text-align: center;' +
                            'line-height: 7px;',
                        class: 'cancel',
                        on: {
                          click: () => {
                            this.visible1 = !this.visible1
                            this.value1 = ''
                          }
                        }
                      }, '取消')
                    ]
                ),
                  h('i', {slot: 'reference', class: 'el-icon-search'}, '')
                ])
          ])
        case 4:
          return h('span', {}, [
            h('span', {}, '地址标注'),
            h('el-popover', {
                  props: {
                    placement: 'bottom',
                    width: '251',
                    trigger: 'click',
                    value: this.visible2,
                    offset: 70
                  },
                },
                [h('div', {
                      style: "text-align:right;",
                      class: 'monitorEvent',
                    },
                    [
                      h('input', {
                        style: 'border: 1px solid #DBDBDB;border-radius: 4px;' +
                            'width:232px;height:30px;margin-right:7px',
                        class: 'popInput',
                        domProps: {
                          value: this.value2,
                        },
                        on: {
                          input: (event) => {
                            this.value2 = event.target.value;
                          }
                        }
                      }, ''),
                      h('el-button', {
                        style: 'background: #166BD6;border-radius: 4px;border-radius: 4px;' +
                            'width:66px;height:30px;margin-top:10px;' +
                            'font-size: 14px;' +
                            'color: #FFFFFF;' +
                            'letter-spacing: 0;' +
                            'text-align: center;' +
                            'line-height: 7px;',
                        class: 'confirm',
                        on: {
                          click: () => {
                            alert(this.value2)
                          }
                        }
                      }, '确认'),
                      h('el-button', {
                        style: 'background: #DBDBDB;border-radius: 4px;border-radius: 4px;' +
                            'width:66px;height:30px;margin-top:10px;' +
                            'font-size: 14px;' +
                            'color: #666666;' +
                            'letter-spacing: 0;' +
                            'text-align: center;' +
                            'line-height: 7px;' +
                            'margin-right:7px',
                        class: 'cancel',
                        on: {
                          click: () => {
                            this.visible2 = !this.visible2
                            this.value2 = ''
                          }
                        }
                      }, '取消')
                    ]
                ),
                  h('i', {slot: 'reference', class: 'el-icon-search'}, '')
                ])
          ])
      }
    },
    handleCurrentChange(val) {
      this.child.currentPage = val
      this.$children[0].table(this.monitorKind)
    },
    handlePrevChange(val) {
      this.child.currentPage = val
      this.$children[0].table(this.monitorKind)
    },
    handleNextChange(val) {
      this.child.currentPage = val
      this.$children[0].table(this.monitorKind)
    }
  }
}
</script>

<style scoped lang="scss">

.content {
  //position: relative;
  overflow: auto;
  //overflow: hidden; //做笔记，解决遮盖问题
  margin-top: 15px;
  margin-left: 6%;
  width: 88%;
  height: calc(100% - 220px);
  background-color: white;

  .table {
    width: 94%;
    margin-left: 3%;
    padding-top: 35px;

    .coinKind {
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      line-height: 14px;
    }


    &::v-deep .el-table_1_column_1 > .cell {
      margin-left: 10%;

    }

    &::v-deep .el-table_1_column_7 > .cell {
      padding-right: 10%;

    }

    &::v-deep th > .cell {
      border-left-style: solid;
      border-left-color: #C1C1C1;
      border-left-width: 1px;
    }


  }

  .page {
    //height: 100%;
    margin-top: 35px;
    float: right;
  }

}

.divider {
  margin: 10px 0 0 0;
  background: 0 0;
  border-top: 2px dashed #e8eaec;
}

.coinKind-button {
  background: #166BD6;
  border-radius: 4px;
  width: 66px;
  height: 30px;
  margin-top: 10px;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 7px;
}


</style>