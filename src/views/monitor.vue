<template>
  <common>
    <template v-slot:content>
      <div class="content">
        <el-button v-show="monitorKind===2 || monitorKind===3" @click="addA" type="primary"
                   style="float: right;margin: 15px 50px 15px 0;width: 100px;height: 36px;">
          添加
        </el-button>
        <div class="table">
          <el-table class="table1" v-show="monitorKind===0" :data="tableData" :highlight-current-row=true
                    :header-cell-style="{background:'#ECF6FA'}"
                    style="width: 100%">
            <el-table-column prop="unusualTime" show-overflow-tooltip width="200px" label="异动时间"></el-table-column>
            <el-table-column prop="eventName" show-overflow-tooltip width="130px" label="监控事件"
                             :render-header="renderHeader"></el-table-column>
            <el-table-column prop="coinKind" show-overflow-tooltip width="100px" label="币种">
              <template slot="header" slot-scope="scope">
                <el-popover
                    placement='bottom-start'
                    width="65"
                    trigger='click'
                    class="el-pop-width"
                    :ref="`popover-${scope.$index}`"
                >
                  <div style="text-align: left; margin: 0" class="coinKind">
                    <el-checkbox-group v-model="checkGroup">
                      <el-checkbox :label="item" v-for="(item,index) in coinKind" :key="index">{{
                          item
                        }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <el-divider class="divider"></el-divider>
                  <el-button class="coinKind-button" @click="coinKindFilter(scope)">确认</el-button>
                  <span slot="reference">币种<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="address" show-overflow-tooltip label="地址"></el-table-column>
            <el-table-column prop="addressMark" show-overflow-tooltip width="130px" label="地址标注"
                             :render-header="renderHeader"></el-table-column>
            <el-table-column prop="unusualCount" show-overflow-tooltip label="异动额度"></el-table-column>
            <el-table-column prop="transHash" show-overflow-tooltip
                             label="交易哈希"></el-table-column>
          </el-table>
          <el-table class="table2" v-show="monitorKind===1" :data="tableData" :highlight-current-row=true
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
                    :ref="`popover-${scope.$index}`"
                >
                  <div style="text-align: left; margin: 0" class="coinKind">
                    <el-checkbox-group v-model="checkGroup">
                      <el-checkbox :label="item" v-for="(item,index) in coinKind" :key="index">{{
                          item
                        }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <el-divider class="divider"></el-divider>
                  <el-button class="coinKind-button" @click="coinKindFilter(scope)">确认</el-button>
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
          <el-table class="table3" v-show="monitorKind===2" :data="tableData" :highlight-current-row=true
                    :header-cell-style="{background:'#ECF6FA'}"
                    style="width: 100%">
            <el-table-column prop="id" show-overflow-tooltip label="序号"></el-table-column>
            <el-table-column prop="eventName" show-overflow-tooltip label="监控事件"></el-table-column>
            <el-table-column prop="noticeWay" show-overflow-tooltip label="通知方式"></el-table-column>
            <el-table-column prop="createTime" show-overflow-tooltip label="添加时间"></el-table-column>
            <el-table-column prop="operation" show-overflow-tooltip label="操作">
              <template slot-scope="scope">
                <el-button class="opbl" @click="addrEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-dialog class="di1"
                           :title="addrTitle"
                           :visible.sync="dialogVisible"
                           top="30vh"
                           :show-close=false
                           :append-to-body=true
                >
                  <hr class="edit-divider"/>
                  <div style="margin: 20px 0 30px 0">
                    监控事件：
                    <el-input v-model="addr.event" max="100" style="width:362px;height:34px"></el-input>
                  </div>
                  <div style="display:flex; margin-bottom: 20px">
                    <div>通知方式：</div>
                    <div>
                      <el-checkbox-group v-model="checkList" style="padding-left: 10px;">
                        <el-checkbox label="短信"></el-checkbox>
                        <el-checkbox label="邮件"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                  <div style="margin-bottom: 20px;">
                    <div class="for" style="margin-bottom: 20px; display:inline-block;" v-for="(item,index) in addrAdd">
                      <div style="display:inline-block;" v-show="index===0">地址信息：</div>
                      <div style="display:inline-block; width: 70px" v-show="index!==0"></div>
                      <el-select class="pcolor" v-model="value[index]" placeholder="请选择币种"
                                 style="width: 140px;height: 34px">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      -
                      <el-input v-show="isAdd" class="pcolor" v-model="addr.addInfo.address[index]" placeholder="请输入地址"
                                max="100"
                                style="width: 180px;height: 34px"></el-input>
                      <el-input v-show="!isAdd" class="pcolor" v-model="addr.addInfo.address[index]" placeholder="请输入地址"
                                max="100"
                                style="width: 210px;height: 34px"></el-input>
                      -
                      <el-input v-model="addr.addInfo.mark[index]" placeholder="请输入地址标注" max="100"
                                style="width: 140px;height: 34px"></el-input>
                      -
                      <el-input v-model="addr.addInfo.miniValue[index]" placeholder="请输入监控阈值" max="100"
                                style="width: 140px;height: 34px"></el-input>
                      <el-button v-show="isAdd" class="sub" @click="addrSub(index)" icon="el-icon-remove-outline"
                                 circle></el-button>
                    </div>
                    <el-button v-show="isAdd" class="plus" circle
                               @click="addrAdd++">+ 添加
                    </el-button>
                  </div>

                  <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="editorAddr">确 定</el-button>
                      <el-button @click="cancel">取 消</el-button>
                    </span>
                </el-dialog>
                <el-button class="opbd" type="text" size="small" @click="delook(scope.row)"
                           style="margin-left: 10px">删除
                </el-button>
                <el-dialog
                    class="di2"
                    :visible.sync="centerDialogVisible1"
                    width="190px"
                    center
                    top="40vh"
                    :show-close=false
                    :append-to-body=true
                >
                  <span>确认删除？</span>
                  <span slot="footer" class="dialog-footer">
                    <div style="display: flex;">
                    <el-button type="primary" @click="del(0)">确 定</el-button>
                  <el-button @click="centerDialogVisible1 = false">取 消</el-button>
                    </div>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
          <el-table class="table4" v-show="monitorKind===3" :data="tableData" :highlight-current-row=true
                    :header-cell-style="{background:' #ECF6FA'}"
                    style="width: 100%">
            <el-table-column prop="id" show-overflow-tooltip label="序号"></el-table-column>
            <el-table-column prop="coinKind" show-overflow-tooltip label="币种"></el-table-column>
            <el-table-column prop="monitorMinVal" show-overflow-tooltip label="监控阈值"></el-table-column>
            <el-table-column prop="noticeWay" show-overflow-tooltip label="通知方式"></el-table-column>
            <el-table-column prop="createTime" show-overflow-tooltip label="添加时间"></el-table-column>
            <el-table-column prop="operation" show-overflow-tooltip label="操作">
              <template slot-scope="scope">
                <el-button class="opbl" @click="transEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-dialog class="di1"
                           :title="transTitle"
                           :visible.sync="dialogVisible1"
                           top="30vh"
                           :show-close=false
                           :append-to-body=true
                           width="500px"
                >
                  <hr class="edit-divider"/>
                  <div style="margin: 20px 0 30px 25px">
                    币种：
                    <el-select class="pcolor" v-model="value[0]" placeholder="请选择币种"
                               style="width: 210px;height: 34px">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div style="display:flex; margin-bottom: 20px">
                    <div>通知方式：</div>
                    <div>
                      <el-checkbox-group v-model="checkList" style="padding-left: 10px;">
                        <el-checkbox label="短信"></el-checkbox>
                        <el-checkbox label="邮件"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                  <div style="margin-bottom: 20px;">
                    <div class="for" style="margin-bottom: 20px; display:inline-block;">
                      监控阈值：
                      <el-input v-model="trans.miniValue" placeholder="请输入监控阈值" max="100"
                                style="width: 210px;height: 34px"></el-input>
                    </div>
                  </div>

                  <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="editorTrans">确 定</el-button>
                      <el-button @click="cancel1">取 消</el-button>
                    </span>
                </el-dialog>
                <el-button class="opbd" type="text" size="small" @click="delook1(scope.row)"
                           style="margin-left: 10px">删除
                </el-button>
                <el-dialog
                    class="di2"
                    :visible.sync="centerDialogVisible2"
                    width="190px"
                    center
                    top="40vh"
                    :show-close=false
                    :append-to-body=true
                >
                  <span>确认删除？</span>
                  <span slot="footer" class="dialog-footer">
                    <div style="display: flex;">
                    <el-button type="primary" @click="del(1)">确 定</el-button>
                  <el-button @click="centerDialogVisible2 = false">取 消</el-button>
                      </div>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
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
import axios from "axios";
import moment from "moment";
import qs from 'qs';

export default {
  components: {
    Common
  },
  name: "monitor",
  data() {
    return {
      monitorKind: 0,
      tableData: [],
      value1: '',
      value2: '',
      visible1: false,
      visible2: false,
      coinKind: [],
      child: {
        pageSize: 8,
        currentPage: 1,
        total: 0,
      },
      checkGroup: [],
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      dialogVisible: false,
      dialogVisible1: false,
      editor1: {
        event: ''
      },
      options: [],
      addrAdd: 1,
      addr: {
        event: '',
        addInfo:
            {
              address: [],
              mark: [],
              miniValue: []
            }
      },
      trans: {
        miniValue: ''
      },
      value: [],
      checkList: [],
      isAdd: false,
      isTrans: false,
      currentUid: 0,
      addrTitle: '',
      transTitle: '',
      judgePage: 0
    }
  },
  methods: {
    addrSub(index) {
      this.addrAdd--
      this.value.splice(index, 1)
      this.addr.addInfo.address.splice(index, 1)
      this.addr.addInfo.mark.splice(index, 1)
      this.addr.addInfo.miniValue.splice(index, 1)
    }
    ,
    delook(row) {
      this.centerDialogVisible1 = true
      this.currentUid = row.uid
      this.judgePage = row.id
    }
    ,
    delook1(row) {
      this.centerDialogVisible2 = true
      this.currentUid = row.uid
      this.judgePage = row.id
    }
    ,
    addA() {
      this.empty()
      if (!this.isTrans) {
        this.cancel()
        this.addrTitle = '添加地址异动监控'
        this.dialogVisible = true
        this.isAdd = true
      } else {
        this.cancel1()
        this.transTitle = '添加交易监控'
        this.dialogVisible1 = true
        this.isAdd = true
      }
      let coinK = []
      this.coinKind.forEach(s => {
        let item = {
          value: s,
          label: s
        }
        coinK.push(item)
      })
      this.options = coinK
    }
    ,
    editorAddr() {
      if (this.value.length === 0 || this.addr.addInfo.address.length === 0) {
        this.$message.warning('请选择币种、输入地址');
        return
      }
      let noticeWay
      switch (this.checkList.length) {
        case 1:
          if (this.checkList[0] === '短信') {
            noticeWay = 0
          } else {
            noticeWay = 1
          }
          break
        case 2:
          noticeWay = 3
          break
      }
      if (this.isAdd) {
        let list = []
        for (let i = 0; i < this.addrAdd; i++) {
          let addrRule = new this.AddrRule(null, this.$children[0].userId, this.addr.event, this.value[i], this.addr.addInfo.address[i], noticeWay, this.addr.addInfo.miniValue[i], this.addr.addInfo.mark[i])
          list.push(addrRule)
        }
        const that = this
        axios.post('/monitor/user-api/addr-rules', JSON.stringify(list), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.data.code === 1001) {
            this.$children[0].table(2)
          }
        }).catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });
      } else {
        let addrRule2 = new this.AddrRule(this.currentUid, this.$children[0].userId, this.addr.event, this.value[0], this.addr.addInfo.address[0], noticeWay, this.addr.addInfo.miniValue[0], this.addr.addInfo.mark[0])
        const that = this
        axios.put('/monitor/user-api/addr-rules', JSON.stringify([addrRule2]), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.data.code === 1001) {
            this.$children[0].table(2)
          }
        }).catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });
      }
      this.dialogVisible = false
      this.checkList = []
      this.value = []
      this.addr = {
        event: '',
        addInfo:
            {
              address: [],
              mark: [],
              miniValue: []
            }
      }
    }
    ,
    editorTrans() {
      if (this.value.length === 0 || this.trans.miniValue === 0) {
        this.$message.warning('请选择币种、输入阈值');
        return
      }
      let noticeWay
      switch (this.checkList.length) {
        case 1:
          if (this.checkList[0] === '短信') {
            noticeWay = 0
          } else {
            noticeWay = 1
          }
          break
        case 2:
          noticeWay = 3
          break
      }
      if (this.isAdd) {
        let transRule = new this.TransRule(null, this.$children[0].userId, this.value[0], noticeWay, this.trans.miniValue)
        const that = this
        axios.post('/monitor/user-api/trans-rules', JSON.stringify([transRule]), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.data.code === 1001) {
            this.$children[0].table(3)
          }
        }).catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });
      } else {
        let transRule2 = new this.TransRule(this.currentUid, this.$children[0].userId, this.value[0], noticeWay, this.trans.miniValue)
        const that = this
        axios.put('/monitor/user-api/trans-rules', JSON.stringify([transRule2]), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.data.code === 1001) {
            this.$children[0].table(3)
          }
        }).catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });
      }
      this.dialogVisible1 = false
      this.checkList = []
      this.value = []
      this.trans = {
        miniValue: ''
      }
    }
    ,
    cancel() {
      this.dialogVisible = false
      this.checkList = []
      this.value = []
      this.addr = {
        event: '',
        addInfo:
            {
              address: [],
              mark: [],
              miniValue: []
            }
      }
      this.addrAdd = 1
    }
    ,
    empty() {
      this.checkList = []
      this.value = []
      this.addr = {
        event: '',
        addInfo:
            {
              address: [],
              mark: [],
              miniValue: []
            }
      }
      this.addrAdd = 1

      this.checkList = []
      this.value = []
      this.trans = {
        miniValue: ''
      }
    }
    ,
    cancel1() {
      this.dialogVisible1 = false
      this.checkList = []
      this.value = []
      this.trans = {
        miniValue: ''
      }
    }
    ,
    addrEdit(row) {
      this.empty()
      this.dialogVisible = true
      this.isAdd = false
      this.addrTitle = '编辑地址异动监控'
      this.currentUid = row.uid
      let coinK = []
      this.coinKind.forEach(s => {
        let item = {
          value: s,
          label: s
        }
        coinK.push(item)
      })
      this.options = coinK
      const that = this
      axios.get('/monitor/user-api/addr-rules/id', {
        params: {
          id: row.uid
        }
      }).then(res => {
        if (res.data.code === 1001) {
          let {eventName, coinKind, address, noticeWay, monitorMinVal, addressMark} =
              res.data.data
          this.addr = {
            event: eventName,
            addInfo: {
              address: [address],
              mark: [addressMark],
              miniValue: [monitorMinVal],
            }
          }
          switch (noticeWay) {
            case 0:
              that.checkList = ['短信']
              break
            case 1:
              that.checkList = ['邮件']
              break
            case 3:
              that.checkList = ['短信', '邮件']
              break
          }
          this.value = [coinKind]
        }
      }).catch(function (error) {
        console.log(error);
        that.$message.error('请求失败');
      });
      this.centerDialogVisible1 = false
    }
    ,
    transEdit(row) {
      this.empty()
      this.dialogVisible1 = true
      this.isAdd = false
      this.transTitle = '编辑交易监控'
      this.currentUid = row.uid
      let coinK = []
      this.coinKind.forEach(s => {
        let item = {
          value: s,
          label: s
        }
        coinK.push(item)
      })
      this.options = coinK
      const that = this
      axios.get('/monitor/user-api/trans-rules/id', {
        params: {
          id: row.uid
        }
      }).then(res => {
        if (res.data.code === 1001) {
          let {coinKind, noticeWay, monitorMinVal} =
              res.data.data
          this.trans = {
            miniValue: monitorMinVal,
          }
          switch (noticeWay) {
            case 0:
              that.checkList = ['短信']
              break
            case 1:
              that.checkList = ['邮件']
              break
            case 3:
              that.checkList = ['短信', '邮件']
              break
          }
          this.value = [coinKind]
        }
      }).catch(function (error) {
        console.log(error);
        that.$message.error('请求失败');
      });
      this.centerDialogVisible1 = false
    }
    ,
    del(index) {
      const that = this
      switch (index) {
        case 0:
          axios.delete('/monitor/user-api/addr-rules', {
            params: {
              id: this.currentUid
            }
          }).then(res => {
            if (res.data.code === 1001) {
              if (this.judgePage === this.child.pageSize + 1) {
                this.child.currentPage--
              }
              this.$children[0].table(2)
            }
          }).catch(function (error) {
            console.log(error);
            that.$message.error('请求失败');
          });
          this.centerDialogVisible1 = false
          break
        case 1:
          axios.delete('/monitor/user-api/trans-rules', {
            params: {
              id: this.currentUid
            }
          }).then(res => {
            if (res.data.code === 1001) {
              if (this.judgePage === this.child.pageSize + 1) {
                this.child.currentPage--
              }
              this.$children[0].table(3)
            }
          }).catch(function (error) {
            console.log(error);
            that.$message.error('请求失败');
          });
          this.centerDialogVisible2 = false
          break
      }

    }
    ,
    coinKindFilter(scope) {
      if (this.monitorKind === 0) {
        if (this.checkGroup.length === 0) {
          scope._self.$refs[`popover-${scope.$index}`].doClose()
          this.$children[0].table(0)
          return
        }
        scope._self.$refs[`popover-${scope.$index}`].doClose()
        let coin = []
        this.checkGroup.forEach(s => {
          coin.push(s)
        })
        const that = this;
        axios.get('/monitor/user-api/monitor-addr/coin-kind', {
          params: {
            id: this.$children[0].id,
            currentPage: this.child.currentPage,
            pageSize: this.child.pageSize,
            coinKinds: coin
          }, paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
          }
        }).then(res => {
              this.checkGroup = []
              if (res.data.code === 1001) {
                that.child.total = res.data.data.total
                let tableData = []
                res.data.data.data.forEach(s => {
                  let {eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime} = s
                  unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                  const addrMonitor = new this.$children[0].AddrMonitorVO(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime)
                  tableData.push(addrMonitor)
                })
                that.tableData = tableData
              }
            })
            .catch(function (error) {
              console.log(error);
              that.$message.error('请求失败');
            });
      }
      if (this.monitorKind === 1) {
        if (this.checkGroup.length === 0) {
          scope._self.$refs[`popover-${scope.$index}`].doClose()
          this.$children[0].table(1)
          return
        }
        scope._self.$refs[`popover-${scope.$index}`].doClose()
        let coin = []
        this.checkGroup.forEach(s => {
          coin.push(s)
        })
        const that = this;
        axios.get('/monitor/user-api/monitor-trans/coin-kind', {
          params: {
            id: this.$children[0].id,
            currentPage: this.child.currentPage,
            pageSize: this.child.pageSize,
            coinKinds: coin
          }, paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
          }
        }).then(res => {
              this.checkGroup = []
              if (res.data.code === 1001) {
                that.child.total = res.data.data.total
                let tableData = []
                res.data.data.data.forEach(s => {
                  let {coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime} = s
                  unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                  const transMonitor = new this.$children[0].TransMonitorVO(coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime)
                  tableData.push(transMonitor)
                })
                that.tableData = tableData
              }
            })
            .catch(function (error) {
              console.log(error);
              that.$message.error('请求失败');
            });
      }
    }
    ,
    renderHeader(h, {column, $index}, index) {
      switch ($index) {
        case 1:
          return h('span', {}, [
            h('span', {}, '监控事件'),
            h('el-popover', {
                  on: {
                    show: () => {
                      this.visible1 = true
                    }
                  },
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
                            this.visible1 = !this.visible1
                            let inputValue = this.value1 || 'blank'
                            if (inputValue !== 'blank') {
                              this.value1 = ''
                              const that = this;
                              axios.get('/monitor/user-api/monitor-addr/event', {
                                params: {
                                  id: this.$children[0].id,
                                  currentPage: this.child.currentPage,
                                  pageSize: this.child.pageSize,
                                  event: this.value1
                                }, paramsSerializer: params => {
                                  return qs.stringify(params, {indices: false})
                                }
                              }).then(res => {
                                    if (res.data.code === 1001) {
                                      that.child.total = res.data.data.total
                                      let tableData = []
                                      res.data.data.data.forEach(s => {
                                        let {eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime} = s
                                        unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                                        const addrMonitor = new this.$children[0].AddrMonitorVO(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime)
                                        tableData.push(addrMonitor)
                                      })
                                      that.tableData = tableData
                                    }
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                    that.$message.error('请求失败');
                                  });
                            } else {
                              this.$children[0].table(0)
                            }
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
                  on: {
                    show: () => {
                      this.visible2 = true
                    }
                  },
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
                            this.visible2 = !this.visible2
                            let inputValue = this.value2 || 'blank'
                            if (inputValue !== 'blank') {
                              this.value2 = ''
                              console.log(inputValue)
                              const that = this;
                              axios.get('/monitor/user-api/monitor-addr/mark', {
                                params: {
                                  id: this.$children[0].id,
                                  currentPage: this.child.currentPage,
                                  pageSize: this.child.pageSize,
                                  mark: this.value2
                                }, paramsSerializer: params => {
                                  return qs.stringify(params, {indices: false})
                                }
                              }).then(res => {
                                    this.value1 = ''
                                    if (res.data.code === 1001) {
                                      that.child.total = res.data.data.total
                                      let tableData = []
                                      res.data.data.data.forEach(s => {
                                        let {eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime} = s
                                        unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                                        const addrMonitor = new this.$children[0].AddrMonitorVO(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime)
                                        tableData.push(addrMonitor)
                                      })
                                      that.tableData = tableData
                                    }
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                    that.$message.error('请求失败');
                                  });
                            } else {
                              this.$children[0].table(0)
                            }
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
    }
    ,
    handleCurrentChange(val) {
      this.child.currentPage = val
      this.$children[0].table(this.monitorKind)
    }
    ,
    handlePrevChange(val) {
      this.child.currentPage = val
      this.$children[0].table(this.monitorKind)
    }
    ,
    handleNextChange(val) {
      this.child.currentPage = val
      this.$children[0].table(this.monitorKind)
    }
    ,
    AddrRule(uid, id, eventName, coinKind, address, noticeWay, monitorMinVal, addressMark) {
      this.uid = uid
      this.id = id
      this.eventName = eventName
      this.coinKind = coinKind
      this.address = address
      this.noticeWay = noticeWay
      this.monitorMinVal = monitorMinVal
      this.addressMark = addressMark
    }
    ,
    TransRule(uid, id, coinKind, noticeWay, monitorMinVal) {
      this.uid = uid
      this.id = id
      this.coinKind = coinKind
      this.noticeWay = noticeWay
      this.monitorMinVal = monitorMinVal
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

    &::v-deep .el-table_2_column_8 > .cell {
      margin-left: 10%;
    }

    &::v-deep .el-table_1_column_7 > .cell {
      padding-right: 10%;
    }

    &::v-deep .el-table_2_column_13 > .cell {
      padding-right: 10%;
    }

    &::v-deep .el-table_3_column_14 > .cell {
      margin-left: 10%;
    }

    &::v-deep .el-table_3_column_18 > .cell {
      padding-right: 10%;
    }

    &::v-deep .el-table_4_column_19 > .cell {
      margin-left: 10%;
    }

    &::v-deep .el-table_4_column_24 > .cell {
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

.opbl {
  font-size: 14px;
  color: #166BD6;
  letter-spacing: 0;
  line-height: 14px;
}

.opbd {
  font-size: 14px;
  color: #ED1835;
  letter-spacing: 0;
  line-height: 14px;
}

.sub {
  margin-left: 5px;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0);
  padding: 0;
  border-width: 0;
  width: 30px;
}

.plus {
  width: 655px;
  height: 30px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  line-height: 14px;
  color: gray;
  padding: 5px;
  border: 1px dashed #DBDBDB;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0);
  margin: 5px 0 0 70px;
}


</style>