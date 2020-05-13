<style scoped lang="scss">
  .AdminPage {

  }
</style>

<template>
  <div class="AdminPage">
    <van-nav-bar
            title="管理中心"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="tab-content">
      <keep-alive>
        <component v-bind:is="currentTabComponent"></component>
      </keep-alive>
    </div>
    <van-tabbar v-model="currentTabComponent">
      <van-tabbar-item name="ActivePage" icon="friends" badge="5">激活审核</van-tabbar-item>
      <van-tabbar-item name="ManagementPage" icon="fire">用户管理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import ActivePage from "./ActivePage/ActivePage";
  import ManagementPage from "./ManagementPage/ManagementPage";
  export default {
    name: "AdminPage",
    components: {
      ActivePage,
      ManagementPage
    },
    data() {
      return {
        currentTabComponent: 'ActivePage',
      }
    },
     methods: {
       onClickLeft() {
         this.$router.go(-1);
       },
     }
  }
</script>
