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
      <a href="" class="userControl" :underline="false">退出登录</a>
        <!--            <span class="userControl admin">{{ userName }}</span>-->
       <div style="width: 100px;float: right;padding-right: 120px;padding-top: 10px;"><el-input v-model="userId"
                                                                                                style="width: 100px"
                                                                                                label="uid"></el-input></div>
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
    <slot name="content"></slot>
  </div>
</template>

<script>
import axios from "axios"
import moment from 'moment'

export default {
  name: "common",
  props: ['child'],
  data() {
    return {
      url: {
        logoimg: require("@/assets/logoimg.svg"),
        login: '/login'
      },
      userId: 2,
      userName: 'Admin',
      tabOneLevel: 0,
      tabFlag: {0: true, 1: false, 2: true, 3: false, 4: true, 5: false, 6: true, 7: false},
      coinSearch: []
    }
  },
  mounted() {
    this.tabStyle(1)
    this.coinList()
    // this.table(0)
  },
  methods: {
    // tab转换
    tabStyle(index) {
      switch (index) {
        case 1:
          this.tabFlag[0] = false
          this.tabFlag[1] = true
          this.tabFlag[2] = true
          this.tabFlag[3] = false
          this.tabFlag[4] = false
          this.tabFlag[5] = true
          this.tabFlag[6] = true
          this.tabFlag[7] = false
          this.tabOneLevel = 0
          this.$parent.monitorKind = 0
          this.$parent.child = {
            pageSize: 8,
            currentPage: 1,
            total: 0,
          }
          this.table(0)
          this.$parent.value1 = ''
          this.$parent.value2 = ''
          this.$parent.checkGroup = []
          this.$parent.coinKindSelect = []
          break
        case 2:
          this.tabFlag[0] = true
          this.tabFlag[1] = false
          this.tabFlag[2] = false
          this.tabFlag[3] = true
          this.tabFlag[4] = false
          this.tabFlag[5] = true
          this.tabFlag[6] = true
          this.tabFlag[7] = false
          this.tabOneLevel = 1
          this.$parent.monitorKind = 2
          this.$parent.isTrans = false
          this.$parent.child = {
            pageSize: 8,
            currentPage: 1,
            total: 0,
          }
          this.table(2)
          this.$parent.value1 = ''
          this.$parent.value2 = ''
          this.$parent.checkGroup = []
          this.$parent.coinKindSelect = []
          break
        case 3:
          this.tabFlag[4] = false
          this.tabFlag[5] = true
          this.tabFlag[6] = true
          this.tabFlag[7] = false
          if (this.tabOneLevel === 0) {
            this.$parent.monitorKind = 0
            this.table(0)
          } else {
            this.$parent.monitorKind = 2
            this.$parent.isTrans = false
            this.table(2)
          }
          this.$parent.child = {
            pageSize: 8,
            currentPage: 1,
            total: 0,
          }
          this.$parent.value1 = ''
          this.$parent.value2 = ''
          this.$parent.checkGroup = []
          this.$parent.coinKindSelect = []
          break
        case 4:
          this.tabFlag[4] = true
          this.tabFlag[5] = false
          this.tabFlag[6] = false
          this.tabFlag[7] = true
          if (this.tabOneLevel === 0) {
            this.$parent.monitorKind = 1
            this.table(1)
          } else {
            this.$parent.monitorKind = 3
            this.$parent.isTrans = true
            this.table(3)
          }
          this.$parent.child = {
            pageSize: 8,
            currentPage: 1,
            total: 0,
          }
          this.$parent.value1 = ''
          this.$parent.value2 = ''
          this.$parent.checkGroup = []
          this.$parent.coinKindSelect = []
          break
      }
    },
    //coin-list
    coinList() {
      const that = this;
      axios.get('/monitor/user-api/coins').then(res => {
            if (res.data.code === 1001) {
              let tableData = []
              that.coinSearch = res.data.data
              res.data.data.forEach(s => {
                tableData.push(s.coinName)
              })
              that.$parent.coinKind = tableData
            }
          })
          .catch(function (error) {
            console.log(error);
            that.$message.error('请求失败');
          });
    },
    // table-content
    table(index) {
      const that = this;
      switch (index) {
        case 0:
          axios.get('/monitor/user-api/monitor-addr', {
            params: {
              userId: this.userId,
              page: that.$parent.child.currentPage - 1,
              size: that.$parent.child.pageSize,
            }
          }).then(res => {
                if (res.data.code === 1001) {
                  that.$parent.child.total = res.data.data.totalElements
                  let tableData = []
                  res.data.data.content.forEach(s => {
                    let {eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime} = s
                    unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                    try {
                      coinKind = that.coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
                    } catch (e) {
                    }
                    unusualCount = unusualCount.replace(/^\"|\"$/g, '')
                    const addrMonitor = new this.AddrMonitorVO(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime)
                    tableData.push(addrMonitor)
                  })
                  that.$parent.tableData = tableData
                } else {
                  that.$parent.tableData = []
                }
              })
              .catch(function (error) {
                console.log(error);
                that.$message.error('请求失败');
              });
          break
        case 1:
          axios.get('/monitor/user-api/monitor-trans', {
            params: {
              userId: this.userId,
              page: that.$parent.child.currentPage - 1,
              size: that.$parent.child.pageSize,
            }
          }).then(res => {
                if (res.data.code === 1001) {
                  that.$parent.child.total = res.data.data.totalElements
                  let tableData = []
                  res.data.data.content.forEach(s => {
                    let {coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime} = s
                    unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                    try {
                      coinKind = that.coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
                    } catch (e) {
                    }
                    unusualCount = unusualCount.replace(/^\"|\"$/g, '')
                    const addrMonitor = new this.TransMonitorVO(coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime)
                    tableData.push(addrMonitor)
                  })
                  that.$parent.tableData = tableData
                } else {
                  that.$parent.tableData = []
                }
              })
              .catch(function (error) {
                console.log(error);
                that.$message.error('请求失败');
              });
          break
        case 2:
          axios.get('/monitor/user-api/events', {
            params: {
              userId: this.userId,
              page: that.$parent.child.currentPage - 1,
              size: that.$parent.child.pageSize,
            }
          }).then(res => {
                if (res.data.code === 1001) {
                  that.$parent.child.total = res.data.data.totalElements
                  let tableData = []
                  let num = []
                  for (let i = 1; i <= res.data.data.totalElements; i++) {
                    num[i] = i
                  }
                  let flag = 1
                  res.data.data.content.forEach(s => {
                    let noticeWay = ''
                    switch (s.noticeWay) {
                      case 0:
                        noticeWay = '短信'
                        break
                      case 1:
                        noticeWay = '邮件'
                        break
                      case 2:
                        noticeWay = '客户端'
                        break
                      case 3:
                        noticeWay = '短信、邮件'
                        break
                      case 4:
                        noticeWay = '短信、客户端'
                        break
                      case 5:
                        noticeWay = '邮件、客户端'
                        break
                      case 6:
                        noticeWay = '短信、邮件、客户端'
                        break
                    }
                    let id = (that.$parent.child.currentPage - 1) * that.$parent.child.pageSize + num[flag]
                    ++flag
                    let eventName = s.eventName
                    let createTime = s.eventAddTime
                    let uid = s.id
                    createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss');
                    const addrMonitor = new this.AddrVO(id, eventName, noticeWay, createTime, uid)
                    tableData.push(addrMonitor)
                  })
                  that.$parent.tableData = tableData
                } else {
                  that.$parent.tableData = []
                }
              })
              .catch(function (error) {
                console.log(error);
                that.$message.error('请求失败');
              });
          break
        case 3:
          axios.get('/monitor/user-api/trans-rules', {
            params: {
              id: this.userId,
              currentPage: that.$parent.child.currentPage,
              pageSize: that.$parent.child.pageSize,
            }
          }).then(res => {
                if (res.data.code === 1001) {
                  that.$parent.child.total = res.data.data.total
                  let tableData = []
                  let num = []
                  for (let i = 1; i <= res.data.data.total; i++) {
                    num[i] = i
                  }
                  let flag = 1
                  res.data.data.data.forEach(s => {
                    let noticeWay = ''
                    switch (s.noticeWay) {
                      case 0:
                        noticeWay = '短信'
                        break
                      case 1:
                        noticeWay = '邮件'
                        break
                      case 2:
                        noticeWay = '客户端'
                        break
                      case 3:
                        noticeWay = '短信、邮件'
                        break
                      case 4:
                        noticeWay = '短信、客户端'
                        break
                      case 5:
                        noticeWay = '邮件、客户端'
                        break
                      case 6:
                        noticeWay = '短信、邮件、客户端'
                        break
                    }
                    let id = (that.$parent.child.currentPage - 1) * that.$parent.child.pageSize + num[flag]
                    ++flag
                    let coinKind = s.coinKind
                    let monitorMinVal = s.monitorMinVal
                    let createTime = s.eventAddTime
                    let uid = s.id
                    createTime = moment(createTime).format('YYYY-MM-DD HH:mm:ss');
                    try {
                      coinKind = that.coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
                    } catch (e) {
                    }
                    const addrMonitor = new this.TransVO(id, coinKind, monitorMinVal, noticeWay, createTime, uid)
                    tableData.push(addrMonitor)
                  })
                  that.$parent.tableData = tableData
                } else {
                  that.$parent.tableData = []
                }
              })
              .catch(function (error) {
                console.log(error);
                that.$message.error('请求失败');
              });
          break
      }

    },
    //填充对象
    //地址监控
    AddrMonitorVO(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime) {
      this.unusualTime = unusualTime;
      this.eventName = eventName;
      this.coinKind = coinKind;
      this.address = address;
      this.addressMark = addressMark;
      this.unusualCount = unusualCount;
      this.transHash = transHash;
    },
    //大额交易监控
    TransMonitorVO(coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime) {
      this.unusualTime = unusualTime;
      this.coinKind = coinKind;
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.unusualCount = unusualCount;
      this.transHash = transHash;
    },
    //地址监控规则
    AddrVO(id, eventName, noticeWay, createTime, uid) {
      this.id = id;
      this.eventName = eventName;
      this.noticeWay = noticeWay;
      this.createTime = createTime;
      this.uid = uid;
    },
    //大额交易监控规则
    TransVO(id, coinKind, monitorMinVal, noticeWay, createTime, uid) {
      this.id = id;
      this.coinKind = coinKind;
      this.monitorMinVal = monitorMinVal;
      this.noticeWay = noticeWay;
      this.createTime = createTime;
      this.uid = uid;
    },
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
</style>
