<template>
  <common-container container-title="用户管理">
    <div slot="body">
      <div class="users-container">
        <a-tabs defaultActiveKey="1" @change="tabsChange">
          <a-tab-pane tab="用户列表" key="1">
            <div class="user-list">
              <a-table
                  :columns="userListTitle"
                  :dataSource="userList"
                  :pagination="false"
                  :rowKey="data => data.userId"
              >
                <template slot="admin" slot-scope="text, record">
                  <div style="display: flex">
                    <span style="width: 55px"><a-tag color="green" v-if="record.admin">admin</a-tag></span>
                    <span style="width: 50px"><a-tag color="blue" v-if="record.sender">发货</a-tag></span>
                    <span style="width: 50px"><a-tag color="red" v-if="record.finance">财务</a-tag></span>
                  </div>
                </template>
                <template slot="forbidden" slot-scope="text">
                  <span><i
                      :class="text ? 'forbidden-label' : 'forbidden-show'">•</i>&nbsp;{{ text | changeForbiddenShow }}</span>
                </template>
                <template slot="cz" slot-scope="text, record">
                  <div class="action-buttons">
                    <span>
                    <li @click="editUserPromiseClickHandle(record)">编辑角色</li>
                    <li v-if="!record.forbidden" @click="forbiddenUserPromise(record)">停用</li>
                    <li v-if="record.forbidden" @click="forbiddenUserPromise(record)">启用</li>
                    <li @click="deleteUserClickHandle(record.userId)">删除用户</li>
                    </span>
                  </div>
                </template>
              </a-table>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="申请列表" key="2" forceRender>
            <div class="user-list">
              <a-table
                  :columns="userApplyListTitle"
                  :dataSource="applyUserList"
                  :pagination="false"
                  :rowKey="data => data.userId"
              >
                <template slot="cz" slot-scope="text, record">
                  <div class="action-buttons">
                    <span>
                      <li @click="updateUserPromiseClickHandle(record.userId)">通过</li>
                    </span>
                  </div>
                </template>
              </a-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <user-promise :modal-title="showModalTitle" :has-selected-values="userHasPromise"
                    :show-modal-view="showUserPromiseView"
                    @updateUserPromise="updateUserPromise"
                    @closeUserPromiseView="closeUserPromiseView"/>
    </div>
  </common-container>
</template>

<script>
import CommonContainer from "../../components/CommonContainer";
import {createNamespacedHelpers} from "vuex"
import UserPromise from "./user-promise";
import {removeToken} from "../../utils/auth";

const {mapState, mapActions, mapMutations} = createNamespacedHelpers("user")

export default {
  name: "user-manager-list",
  components: {UserPromise, CommonContainer},
  data() {
    return {
      showUserPromiseView: false,
      showModalTitle: '通过用户',
      currentUserId: '',
      currentTabsIndex: 1,
      userHasPromise: []
    }
  },
  methods: {
    ...mapActions(["fetchUserListTitle", "fetchApplyUserTitleList", "updateUserPromiseState", "fetchDeleteUser",
      "fetchUserList", "fetchApplyUserList", "fetchUserPromise"]),
    ...mapMutations([]),
    tabsChange(index) {
      this.currentTabsIndex = inde
      if (index == 1) {
        this.fetchUserListInfo()
      } else if (index == 2) {
        this.fetchApplyUserListInfo()
      }
    },
    createTableName() {
      this.fetchUserListTitle();
      this.fetchApplyUserTitleList();
    },
    // 获取用户列表
    fetchUserListInfo() {
      this.fetchUserList()
    },
    // 获取申请用户列表
    fetchApplyUserListInfo() {
      this.fetchApplyUserList()
    },
    updateUserPromiseClickHandle(userId) {
      this.currentUserId = userId
      this.showModalTitle = "通过用户"
      this.showUserPromiseView = true
    },
    editUserPromiseClickHandle(user) {
      this.currentUserId = user.userId
      this.showModalTitle = "编辑角色"
      if (user.admin) {
        this.userHasPromise.push(0)
      }
      if (user.sender) {
        this.userHasPromise.push(1)
      }
      if (user.finance) {
        this.userHasPromise.push(2)
      }
      this.showUserPromiseView = true
    },
    closeUserPromiseView() {
      this.showUserPromiseView = false
      this.currentUserId = ''
      this.userHasPromise.splice(0, this.userHasPromise.length)
    },
    updateUserPromise(values) {
      const tmpUserId = this.currentUserId
      this.updateUserPromiseState({
        ...values,
        userId: this.currentUserId,
        isForbidden: false
      }).then(() => {
        this.userHasPromise.splice(0, this.userHasPromise.length)
        this.closeUserPromiseView()
        if (!this.checkUserIsSelf(tmpUserId)) {
          this.tabsChange(this.currentTabsIndex)
        }
        this.checkChangeSelfPromise(tmpUserId)
      })
    },
    forbiddenUserPromise(user) {
      const userInfo = user
      userInfo.isAdmin = userInfo.admin
      userInfo.isSender = userInfo.sender
      userInfo.isFinance = userInfo.finance
      userInfo.isForbidden = !userInfo.forbidden
      this.updateUserPromiseState({
        ...userInfo
      }).then(() => {
        if (!this.checkUserIsSelf(user.userId)) {
          this.tabsChange(this.currentTabsIndex)
        }
        this.checkChangeSelfPromise(user.userId)
      })
    },
    deleteUserClickHandle(userId) {
      this.fetchDeleteUser(userId).then(() => {
        if (!this.checkUserIsSelf(userId)) {
          this.tabsChange(this.currentTabsIndex)
        }
        this.checkChangeSelfPromise(userId)
      })
    },
    // 修复用户修改自己权限问题
    checkChangeSelfPromise(userId) {
      if (userId == this.$store.state.userInfo.userId) {
        // 退出登录
        this.$nextTick(() => {
          removeToken()
          this.$store.commit("updateLoginState", false)
          this.$router.push("/login")
          this.$message.info("您的权限已经修改，请重新登录", 2, () => {
            this.$router.go(0)
          })
          // this.$nextTick(() => {
          //   this.$router.go(0)
          // })
        })
      }
    },
    checkUserIsSelf(userId) {
      return userId == this.$store.state.userInfo.userId
    }
  },
  filters: {
    changeForbiddenShow(val) {
      return val ? "禁用" : "正常"
    }
  },
  computed: {
    ...mapState(["userListTitle", "userApplyListTitle", "userList", "userListCount", "applyUserList", "applyUserListCount"])
  },
  mounted() {
    this.createTableName()
    this.fetchUserListInfo()
    this.fetchUserPromise()
  }
}
</script>

<style lang="scss" scoped>
.users-container {
  padding: 50px 20px;
  background: white;
}

.forbidden-label {
  color: red;
}

.forbidden-show {
  color: green;
}

.action-buttons span {
  display: flex;
  align-items: center;
  color: #1585ff !important;
  cursor: pointer;
}

.action-buttons span li {
  margin-right: 16px;
}

.action-buttons span li + li {
  margin-right: 16px;
}
</style>