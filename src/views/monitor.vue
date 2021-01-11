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
                    width="105"
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
                    width="100"
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
                    <el-button type="primary" @click="del(0,scope.row)">确 定</el-button>
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
          <!--地址异动监控添加编辑dialog-->
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
              <el-input v-model="addr.event" max="100" style="width:362px;height:34px;"></el-input>
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
                <el-input class="pcolor" v-model="addr.addInfo.address[index]" placeholder="请输入地址"
                          max="100" style="width: 180px;height: 34px"></el-input>
                -
                <el-input v-model="addr.addInfo.mark[index]" placeholder="请输入地址标注" max="100"
                          style="width: 140px;height: 34px"></el-input>
                -
                <el-input v-model="addr.addInfo.miniValue[index]" placeholder="请输入监控阈值" max="100"
                          style="width: 140px;height: 34px"></el-input>
                <el-button class="sub" @click="addrSub(index)" icon="el-icon-remove-outline"
                           circle></el-button>
              </div>
              <el-button class="plus" circle @click="addrAddFunc">+ 添加
              </el-button>
            </div>

            <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="editorAddr">确 定</el-button>
                      <el-button @click="cancel">取 消</el-button>
                    </span>
          </el-dialog>
          <!--大额交易监控添加编辑dialog-->
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
          <div class="page">
            <el-pagination
                :current-page.sync="child.currentPage"
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
      countAdd: 0,
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
      coinKindSelect: [],
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
      judgePage: 0,
      eventArray: [],
      scopeRowId: 0,
      scopeRowRules: [],
      toDeleteAddrRuleIds: [],
      totoDeleteAddrIds: [],
    }
  },
  methods: {
    addrAddFunc() {
      this.addrAdd++
      this.countAdd++
    }
    ,
    addrCheckoutSure() {
      if (this.checkList.length === 0) {
        this.$message.warning('未填写通知方式')
        return
      }
      if (this.addr.event === '') {
        this.$message.warning('未填写监控事件')
        return
      }
      // if (this.value.length === 0) {
      //   this.$message.warning('未填写监控币种')
      //   return
      // }
      // if (this.addr.addInfo.address.length === 0) {
      //   this.$message.warning('未填写监控地址')
      //   return
      // }
    }
    ,
    transCheckoutSure() {
      if (this.checkList.length === 0) {
        this.$message.warning('未填写通知方式')
      }
      if (this.value.length === 0) {
        this.$message.warning('未填写监控币种')
      }
      if (this.trans.miniValue === '') {
        this.$message.warning('未填写监控监控阈值')
      }
    }
    ,
    addrSub(index) {
      this.addrAdd--
      if (this.addrAdd === 0) {
        this.addrAdd = 1
      }
      this.value.splice(index, 1)
      this.addr.addInfo.address.splice(index, 1)
      this.addr.addInfo.mark.splice(index, 1)
      this.addr.addInfo.miniValue.splice(index, 1)
      this.totoDeleteAddrIds.push(index)
      this.toDeleteAddrRuleIds.push(this.scopeRowRules[index].id)
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
        this.addrTitle = '添加监控事件'
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
      const that = this
      if (this.addr.event === '') {
        this.addrCheckoutSure()
        return
      }
      // if (this.value.length === 0 || this.addr.addInfo.address.length === 0) {
      //   this.$message.warning('请选择币种、输入地址');
      //   return
      // }
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
        let eventArray = {
          eventName: this.addr.event,
          noticeWay: noticeWay,
          userName: this.$children[0].userName,
          userId: this.$children[0].userId,
          state: 1,
        }
        let addrRulesAdd = []
        for (let i = 0; i < this.addrAdd; i++) {
          let addrRule = {
            coinKind: this.value[i],
            address: this.addr.addInfo.address[i],
            addressMark: this.addr.addInfo.mark[i],
            monitorMinVal: this.addr.addInfo.miniValue[i],
            eventName: this.addr.event,
            noticeWay: noticeWay,
            userId: this.$children[0].userId,
            state: 1,
          }
          addrRulesAdd.push(addrRule)
        }

        let addrRule2 = {
          event: eventArray,
          addrRules: addrRulesAdd,
          toDeleteAddrRuleIds: this.toDeleteAddrRuleIds
        }
        axios.post('/monitor/user-api/events', JSON.stringify(addrRule2), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          console.log(res)
          if (res.data.code === 1001) {
            that.$children[0].table(2)
          }
        }).catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });


        // let list = []
        // for (let i = 0; i < this.addrAdd; i++) {
        //   let addrRule = new this.AddrRule(null, this.$children[0].userId, this.addr.event, this.value[i], this.addr.addInfo.address[i], noticeWay, this.addr.addInfo.miniValue[i], this.addr.addInfo.mark[i])
        //   list.push(addrRule)
        // }
        // axios.post('/monitor/user-api/addr-rules', JSON.stringify(list), {
        //   headers: {"Content-Type": "application/json"}
        // }).then(res => {
        //   if (res.data.code === 1001) {
        //     that.$children[0].table(2)
        //   }
        // }).catch(function (error) {
        //   console.log(error);
        //   that.$message.error('请求失败');
        // });
      } else {
        for (let i = 0; i < this.addrAdd; i++) {
          let flag1 = that.value[i] || 'blank'
          let flag2 = that.addr.addInfo.address[i] || 'blank'
          if (flag1 === 'blank' || flag2 === 'blank') {
            this.$message.error('监控币种、监控地址不能为空')
            return
          }
        }
        let index = 0
        let addrRulesMap = this.scopeRowRules
        for (let i = 0; i < this.countAdd; i++) {
          addrRulesMap.push({})
        }
        this.totoDeleteAddrIds.forEach(s => {
          addrRulesMap.splice(s, 1)
        })
        for (let i = 0; i < addrRulesMap.length; i++) {
          addrRulesMap[i].address = that.addr.addInfo.address[i]
          addrRulesMap[i].monitorMinVal = that.addr.addInfo.miniValue[i]
          addrRulesMap[i].addressMark = that.addr.addInfo.mark[i]
          let coinKind
          try {
            coinKind = that.$children[0].coinSearch.filter(x => x.coinName === that.value[i])[0].contractAddr
          } catch (e) {
          }
          addrRulesMap[i].coinKind = coinKind

        }
        let eventArray = this.eventArray[this.scopeRowId - 1]
        delete eventArray.createTime
        delete eventArray.updateTime

        // let addrRulesMap = this.scopeRowRules.map(s => {
        //   if ((that.value.length - 1) >= index) {
        //     s.address = that.addr.addInfo.address[index]
        //     s.monitorMinVal = that.addr.addInfo.miniValue[index]
        //     s.addressMark = that.addr.addInfo.mark[index]
        //     s.acoinKind = that.value[index]
        //     index++
        //   }
        // })
        let addrRule2 = {
          event: eventArray,
          addrRules: addrRulesMap,
          toDeleteAddrRuleIds: this.toDeleteAddrRuleIds
        }
        // let addrRule2 = new this.AddrRule(this.currentUid, this.$children[0].userId, this.addr.event, this.value[0], this.addr.addInfo.address[0], noticeWay, this.addr.addInfo.miniValue[0], this.addr.addInfo.mark[0])
        axios.put('/monitor/user-api/events', JSON.stringify(addrRule2), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          console.log(res)
          if (res.data.code === 1001) {
            that.$children[0].table(2)
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
      this.totoDeleteAddrIds = []
      this.toDeleteAddrRuleIds = []
      this.countAdd = 0
    }
    ,
    editorTrans() {
      const that = this
      if (this.checkList.length === 0 || this.value.length === 0 || this.trans.miniValue === 0) {
        this.transCheckoutSure()
        return
      }
      // if (this.value.length === 0 || this.trans.miniValue === 0) {
      //   this.$message.warning('请选择币种、输入阈值');
      //   return
      // }
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
        let coinKind
        try {
          coinKind = that.$children[0].coinSearch.filter(x => x.coinName === this.value[0])[0].contractAddr
        } catch (e) {
          coinKind = this.value[0]
        }
        let transRule = new this.TransRule(null, this.$children[0].userId, coinKind, noticeWay, this.trans.miniValue)
        axios.post('/monitor/user-api/trans-rules', JSON.stringify([transRule]), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.data.code === 1001) {
            that.$children[0].table(3)
          }
        }).catch(function (error) {
          console.log(error);
          that.$message.error('请求失败');
        });
      } else {
        let coinKind
        try {
          coinKind = that.$children[0].coinSearch.filter(x => x.coinName === this.value[0])[0].contractAddr
        } catch (e) {
          coinKind = this.value[0]
        }
        let transRule2 = new this.TransRule(this.currentUid, this.$children[0].userId, coinKind, noticeWay, this.trans.miniValue)
        axios.put('/monitor/user-api/trans-rules', JSON.stringify([transRule2]), {
          headers: {"Content-Type": "application/json"}
        }).then(res => {
          if (res.data.code === 1001) {
            that.$children[0].table(3)
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
      this.totoDeleteAddrIds = []
      this.countAdd = 0
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
      const that = this
      this.empty()
      this.dialogVisible = true
      this.isAdd = false
      this.addrTitle = '编辑监控事件'
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
      this.addr.event = row.eventName
      let notice = row.noticeWay.split('、')
      this.checkList = notice
      axios.get('/monitor/user-api/events/rules', {
        params: {
          eventId: row.uid
        }
      }).then(res => {
        this.scopeRowId = row.id
        if (res.data.code === 1001) {
          this.addrAdd = res.data.data.length
          this.scopeRowRules = res.data.data
          res.data.data.forEach(s => {
            let {coinKind, address, monitorMinVal, addressMark} = s
            this.addr.addInfo.address.push(address)
            this.addr.addInfo.mark.push(addressMark)
            this.addr.addInfo.miniValue.push(monitorMinVal)
            try {
              coinKind = that.$children[0].coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
            } catch (e) {
            }
            this.value.push(coinKind)
          })
          // switch (noticeWay) {
          //   case 0:
          //     that.checkList = ['短信']
          //     break
          //   case 1:
          //     that.checkList = ['邮件']
          //     break
          //   case 2:
          //     that.checkList = []
          //     break
          //   case 3:
          //     that.checkList = ['短信', '邮件']
          //     break
          //   case 4:
          //     that.checkList = ['短信']
          //     break
          //   case 5:
          //     that.checkList = ['邮件']
          //     break
          //   case 6:
          //     that.checkList = ['短信', '邮件']
          //     break
          //   default:
          //     that.checkList = []
          // }
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
            case 2:
              that.checkList = []
              break
            case 3:
              that.checkList = ['短信', '邮件']
              break
            case 4:
              that.checkList = ['短信']
              break
            case 5:
              that.checkList = ['邮件']
              break
            case 6:
              that.checkList = ['短信', '邮件']
              break
            default:
              that.checkList = []
          }
          try {
            coinKind = that.$children[0].coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
          } catch (e) {
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
    del(index, row) {
      const that = this
      switch (index) {
        case 0:
          let eventData = {
            id: row.uid,
            eventName: row.eventName,
            userName: this.$children[0].userName,
            userId: this.$children[0].userId,
            state: 0,
          }
          axios.put('/monitor/user-api/events/state', JSON.stringify(eventData), {
            headers: {"Content-Type": "application/json"}
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
      const that = this;
      this.child.currentPage = 1
      if (this.monitorKind === 0) {
        if (this.checkGroup.length === 0) {
          scope._self.$refs[`popover-${scope.$index}`].doClose()
          this.$children[0].table(0)
          return
        }
        scope._self.$refs[`popover-${scope.$index}`].doClose()
        let coin = []
        let coinKind
        this.checkGroup.forEach(s => {
          Math.floor
          try {
            coinKind = that.$children[0].coinSearch.filter(x => x.coinName === s)[0].contractAddr
          } catch (e) {
          }
          coin.push(coinKind)
        })
        this.coinKindSelect = coin
        this.child.currentPage = 1
        this.pageDate(this.monitorKind)
      }

      if (this.monitorKind === 1) {
        if (this.checkGroup.length === 0) {
          scope._self.$refs[`popover-${scope.$index}`].doClose()
          this.$children[0].table(1)
          return
        }
        scope._self.$refs[`popover-${scope.$index}`].doClose()
        let coin = []
        let coinKind
        this.checkGroup.forEach(s => {
          try {
            coinKind = that.$children[0].coinSearch.filter(x => x.coinName === s)[0].contractAddr
          } catch (e) {
          }
          coin.push(coinKind)
        })
        this.coinKindSelect = coin
        this.pageDate(this.monitorKind)
      }
    }
    ,
    renderHeader(h, {column, $index}, index) {
      let that = this
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
                            that.renderEvent()
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
                            that.renderMark()
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
    renderEvent() {
      const that = this;
      this.child.currentPage = 1
      this.visible1 = !this.visible1
      let inputValue = that.value1 || 'blank'
      if (inputValue !== 'blank') {
        that.pageDate(this.monitorKind)
      } else {
        this.$children[0].table(0)
      }
    }
    ,
    renderMark() {
      const that = this;
      this.child.currentPage = 1
      this.visible2 = !this.visible2
      let inputValue = this.value2 || 'blank'
      if (inputValue !== 'blank') {
        that.pageDate(this.monitorKind)
      } else {
        this.$children[0].table(0)
      }
    }
    ,

    handleCurrentChange(val) {
      this.child.currentPage = val
      this.pageDate(this.monitorKind)
    }

    ,
    handlePrevChange(val) {
      this.child.currentPage = val
      this.pageDate(this.monitorKind)
    }
    ,
    handleNextChange(val) {
      this.child.currentPage = val
      this.pageDate(this.monitorKind)
    }
    ,
    pageDate(val) {
      let that = this
      let url = ''
      let params = {}
      if (val === 0) {
        params = {
          userId: this.$children[0].userId,
          page: this.child.currentPage - 1,
          size: this.child.pageSize,
          eventName: this.value1 || null,
          addressMark: this.value2 || null,
          coinKinds: this.coinKindSelect.length !== 0 ? this.coinKindSelect : null
        }
        url = '/monitor/user-api/monitor-addr'
      }
      if (val === 1) {
        params = {
          userId: this.$children[0].userId,
          page: this.child.currentPage - 1,
          size: this.child.pageSize,
          coinKinds: this.coinKindSelect.length !== 0 ? this.coinKindSelect : null
        }
        url = '/monitor/user-api/monitor-trans'
      }
      axios.get(url, {
        params: params
        , paramsSerializer: params => {
          return qs.stringify(params, {indices: false})
        }
      }).then(res => {
            if (res.data.code === 1001) {
              that.child.total = res.data.data.totalElements
              let tableData = []
              res.data.data.content.forEach(s => {
                let addrMonitor
                if (val === 0) {
                  let {eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime} = s
                  unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                  try {
                    coinKind = that.$children[0].coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
                  } catch (e) {
                  }
                  unusualCount = unusualCount.replace(/^\"|\"$/g, '')
                  addrMonitor = new this.$children[0].AddrMonitorVO(eventName, coinKind, address, addressMark, transHash, unusualCount, unusualTime)
                }
                if (val === 1) {
                  let {coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime} = s
                  unusualTime = moment(unusualTime).format('YYYY-MM-DD HH:mm:ss');
                  try {
                    coinKind = that.$children[0].coinSearch.filter(x => x.contractAddr === coinKind)[0].coinName
                  } catch (e) {
                  }
                  unusualCount = unusualCount.replace(/^\"|\"$/g, '')
                  addrMonitor = new this.$children[0].TransMonitorVO(coinKind, transHash, fromAddress, toAddress, unusualCount, unusualTime)
                }

                tableData.push(addrMonitor)
              })
              that.tableData = tableData
            } else {
              that.tableData = []
            }
          })
          .catch(function (error) {
            console.log(error);
            that.$message.error('请求失败');
          });
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
  margin-left: 20px;
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