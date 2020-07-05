<style scoped lang="scss">
  .RedeemPage {

  }
</style>

<template>
  <div class="RedeemPage">
    <van-nav-bar
            title="积分兑换"
            left-text="返回"
            left-arrow
            @click-left="() => this.$router.push({path: '/mobile/task'})"
    />
  </div>
</template>

<script>
  export default {
    name: "RedeemPage"
  }
</script>

