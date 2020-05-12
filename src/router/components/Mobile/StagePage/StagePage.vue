<style scoped lang="scss">
  .StagePage {
    overflow: hidden;
    .list-style {
      height: 150px;
      border-radius: 12px;
      color: white;
      font-size: 42px;
      line-height: 150px;
      text-align: center;
      font-family: 'AJC',serif;
      margin-bottom: 12px;
    }
  }
</style>

<template>
  <div class="StagePage">
    <van-nav-bar
            title="活动阶段"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="list-style" @click="jumpToStage1" style="background-color: #09c2ff">
      我的档案
    </div>
    <div class="list-style" @click="showTips" style="background-color: #29e024">
      倾心互评
    </div>
    <div class="list-style" @click="showTips" style="background-color: #ff2245">
      匹配结果
    </div>
    <div class="list-style" @click="showTips" style="background-color: #ffd12f">
      打卡任务
    </div>
  </div>
</template>

<script>
  export default {
    name: "StagePage",
    methods: {
      jumpToStage1() {
        this.$router.push({path: '/mobile/stage1'})
      },
      showTips() {
        this.$notify({type: 'warning', message: '该阶段暂未开放，敬请期待'});
      },
      onClickLeft() {
        this.$router.push({path: '/mobile/login'})
      }
    }
  }
</script>

