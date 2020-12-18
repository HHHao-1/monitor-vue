<template>
  <a-modal
          :title=modalTitle
          width="640px"
          :centered=true
          :visible="showModalView"
          :destroyOnClose=true
          cancelText="取消"
          okText="提交"
          @ok="clickHandle"
          @cancel="$emit('closeUserPromiseView')"
  >
    <p class="modal-body">
      <span>角色 : </span>
      <a-select mode="multiple" style="width: 100%" :defaultValue="hasSelectedValues" @change="changeClickHandle" placeholder="请选择">
        <a-select-option v-for="item in userPromiseList" :key="item.value">{{item.label}}</a-select-option>
      </a-select>
    </p>
  </a-modal>
</template>

<script>
  import { createNamespacedHelpers } from "vuex"
  const { mapState } = createNamespacedHelpers("user")

  export default {
    name: "user-promise",
    props: {
      modalTitle: {
        type: String,
        default: '编辑角色'
      },
      showModalView: {
        type: Boolean,
        default: false
      },
      hasSelectedValues: {
        type: Array
      }
    },
    data() {
      return {
        selectedValue: [],
        promiseValues: [{'admin': true}, {'sender': true}, {'finance': true}]
      }
    },
    methods: {
      clickHandle() {
        if (this.selectedValue.length == 0) {
          this.$message.error('做少需要选择一个角色')
          return
        }

        const promises = {}
        if (this.selectedValue.indexOf(0) > -1) {
          promises.isAdmin = true
        } else {
          promises.isAdmin = false
        }

        if (this.selectedValue.indexOf(1) > -1) {
          promises.isSender = true
        } else {
          promises.isSender = false
        }

        if (this.selectedValue.indexOf(2) > -1) {
          promises.isFinance = true
        } else {
          promises.isFinance = false
        }

        this.$emit("updateUserPromise", promises)
      },
      changeClickHandle(value) {
        this.selectedValue = value
      }
    },
    computed: {
      ...mapState(["userPromiseList"]),
    }
  }
</script>

<style lang="scss" scoped>
  .modal-body {
    display: flex;
    align-items: center;
    margin: 20px;
  }
  .modal-body span {
    width: 80px;
  }
</style>