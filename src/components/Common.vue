<template>
  <div class="common">
    <div class="banner">
      <embed id="logoimg" :src="url.logoimg" type="image/svg+xml" v-show="true"/>
      <!--    <span class="word">{{ pageName }}</span>-->
      <span class="word">数字货币监控系统</span>
      <span class="tab1" @click="tabStyle(1)" v-show="tabFlag[0]">监控消息</span>
      <span class="tab1" @click="tabStyle(1)" v-show="tabFlag[1]" style="color: #166BD6;">监控消息</span>
      <span class="tab2" @click="tabStyle(2)" v-show="tabFlag[2]">监控规则管理</span>
      <span class="tab2" @click="tabStyle(2)" v-show="tabFlag[3]" style="color: #166BD6;">监控规则管理</span>
      <!--      <span class="tab2">监控规则管理</span>-->
      <span class="right-user">
      <a :href="url.login" class="userControl" :underline="false">退出登录</a>
            <span class="userControl admin">{{ userName }}</span>
      </span>
    </div>
    <div class="bar">
      <span class="tab3" @click="tabStyle(3)" v-show="tabFlag[4]">地址异动监控</span>
      <span class="tab3" @click="tabStyle(3)" v-show="tabFlag[5]"
            style=" color: #166BD6;border-bottom-style: solid;border-bottom-color: #166BD6;border-bottom-width: 2px;">地址异动监控</span>
      <span class="tab4" @click="tabStyle(4)" v-show="tabFlag[6]">交易监控</span>
      <span class="tab4" @click="tabStyle(4)" v-show="tabFlag[7]"
            style=" color: #166BD6;border-bottom-style: solid;border-bottom-color: #166BD6;border-bottom-width: 2px;">交易监控</span>
    </div>
    <div class="content">
      <div class="table">
        <el-table :data="tableData" :highlight-current-row=true :header-cell-style="{background:'#ECF6FA'}"
                  style="width: 100%">
          <el-table-column prop="unusualTime" show-overflow-tooltip width="200px" label="异动时间"></el-table-column>
          <el-table-column prop="eventName" show-overflow-tooltip width="130px" label="监控事件"
                           :render-header="renderHeader"></el-table-column>
          <!--          <el-table-column prop="coinKind" show-overflow-tooltip width="100px" label="币种"-->
          <!--                           :filters="filter"-->
          <!--                           :filter-method="filterHandler"></el-table-column>-->
          <el-table-column prop="coinKind" show-overflow-tooltip width="100px" label="币种">
            <!--            <template slot="header" slot-scope="scope">-->
            <!--              <el-popover-->
            <!--                  placement="right"-->
            <!--                  width="400"-->
            <!--                  trigger="click"-->
            <!--                  v-for="item in coinKind">-->
            <!--                <div style="text-align: right; margin: 0">-->
            <!--                  <el-checkbox>{{ item }}</el-checkbox>-->
            <!--                </div>-->
            <!--                <span class="el-dropdown-link">-->
            <!--                  币种<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
            <!--                </span>-->
            <!--              </el-popover>-->
            <!--            </template>-->
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
                <sppan slot="reference">币种<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></sppan>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="address" show-overflow-tooltip label="地址"></el-table-column>
          <el-table-column prop="addressMark" show-overflow-tooltip width="130px" label="地址标注"
                           :render-header="renderHeader"></el-table-column>
          <el-table-column prop="unusualCount" show-overflow-tooltip label="异动额度"></el-table-column>
          <el-table-column prop="transHash" show-overflow-tooltip label="交易哈希"></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
              background
              layout="prev, pager, next"
              :total=100>
          </el-pagination>
        </div>
      </div>
    </div>
    <!--    <div class="feet"></div>-->
  </div>
</template>

<script>
import axios from "axios"
import moment from 'moment'

export default {
  name: "Title",
  props: ['pageName'],
  data() {
    return {
      url: {
        logoimg: require("@/assets/logoimg.svg"),
        login: '/login'
      },
      userName: 'Admin',
      tabFlag: {0: true, 1: false, 2: true, 3: false, 4: true, 5: false, 6: true, 7: false},

      tableData: [],
      value1: '',
      value2: '',
      visible1: null,
      visible2: null,
      coinKind: []

    }
  },
  mounted() {
    this.tabStyle(1)
    this.table()

    function FilterObject(text, value) {
      this.text = text
      this.value = value
    }

    const that = this;
    axios.get('/monitor/user-api/coinlist').then(res => {
          if (res.data.code === 1001) {
            let tableData = []
            res.data.data.forEach(s => {
              tableData.push(s)
            })
            that.coinKind = tableData
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });
  },
  methods: {
    filterHandler() {
    },
    renderHeader(h, {column, $index}, index) {
      // let that = this
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

    addrMonitorVo(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime) {
      this.unusualTime = unusualTime;
      this.eventName = eventName;
      this.coinKind = coinKind;
      this.address = address;
      this.addressMark = addressMark;
      this.unusualCount = unusualCount;
      this.transHash = transHash;
    },
    // tab转换
    tabStyle(index) {
      switch (index) {
        case 1:
          this.tabFlag[0] = !this.tabFlag[0]
          this.tabFlag[1] = !this.tabFlag[1]
          this.tabFlag[2] = true
          this.tabFlag[3] = false
          this.tabFlag[4] = false
          this.tabFlag[5] = true
          this.tabFlag[6] = true
          this.tabFlag[7] = false
          break
        case 2:
          this.tabFlag[0] = true
          this.tabFlag[1] = false
          this.tabFlag[2] = !this.tabFlag[2]
          this.tabFlag[3] = !this.tabFlag[3]
          this.tabFlag[4] = false
          this.tabFlag[5] = true
          this.tabFlag[6] = true
          this.tabFlag[7] = false
          break
        case 3:
          this.tabFlag[4] = !this.tabFlag[4]
          this.tabFlag[5] = !this.tabFlag[5]
          this.tabFlag[6] = true
          this.tabFlag[7] = false
          break
        case 4:
          this.tabFlag[4] = true
          this.tabFlag[5] = false
          this.tabFlag[6] = !this.tabFlag[6]
          this.tabFlag[7] = !this.tabFlag[7]
          break

      }
    },
    // table-content
    table() {
      const that = this;
      axios.get('/monitor/user-api/monitor-addr', {
        params: {
          id: 2,
          currentPage: 1,
          pageSize: 10
        }
      }).then(res => {
            if (res.data.code === 1001) {
              let tableData = []
              res.data.data.forEach(s => {
                let {eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime} = s
                unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                const addrMonitor = new this.addrMonitorVo(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime)
                tableData.push(addrMonitor)
              })
              this.tableData = tableData
            }
          })
          .catch(function (error) {
            console.log(error);
            that.$message.error('请求失败');
          });
    }
  }
}
</script>

<style scoped lang="scss">
@mixin fontBanner { // 声明col-6()函数;
  font-family: PingFangSC-Semibold;
  color: #292929;
  letter-spacing: 0.12px;
  line-height: 20px;
  position: relative;
  top: 3px;
}

@mixin fontBar { // 声明col-6()函数;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  line-height: 16px;
}

@mixin tab-hover {
  &:hover {
    cursor: pointer;
  }
}

.common {
  height: 100%;
  position: relative;
}

.banner {
  display: block;
  height: 60px;
  background-color: white;
  //z-index: 999;

  #logoimg {
    position: relative;
    top: 14px;
    margin-left: 6%;
  }

  .word {
    @include fontBanner;
    font-size: 20px;
  }

  .tab1 {
    @include fontBanner;
    font-size: 18px;
    margin-left: 15%;

    &:hover {
      cursor: pointer;
    }
  }

  .tab2 {
    @include fontBanner;
    font-size: 18px;
    margin-left: 5%;

    &:hover {
      cursor: pointer;
    }
  }

  .userControl {
    margin-top: 22px;
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0.1px;
    line-height: 16px;
    position: relative;
    right: 6%;
  }

  .admin {
    margin-right: 2% !important;
  }
}

.bar {
  margin-top: 15px;
  margin-left: 6%;
  background-color: white;
  width: 88%;
  height: 70px;

  .tab3 {
    @include fontBar;
    position: relative;
    top: 35%;
    margin-left: 2%;
    margin-right: 1%;
    @include tab-hover;
    padding: 0 20px 20px 20px;

    &:hover {
      cursor: pointer;
    }
  }

  .tab4 {
    @include fontBar;
    position: relative;
    top: 35%;
    @include tab-hover;
    padding: 0 20px 20px 20px;

    &:hover {
      cursor: pointer;
    }
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
      margin-left: 15%;

    }

    &::v-deep .el-table_1_column_7 > .cell {
      padding-right: 15%;

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


</style>
