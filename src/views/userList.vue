<template>
  <div class="userList">
    {{ userList }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userList",
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    const that = this
    axios({
      method: 'get',
      url: "/monitor/admin/ding/userList"
    }).then(res => {
      that.userList = res.data.data.users[0]
      console.log(that.userList)
    })
  }
}
</script>

