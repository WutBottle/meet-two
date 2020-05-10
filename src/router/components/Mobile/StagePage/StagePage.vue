<style scoped lang="scss">
  .StagePage {
    padding: 20px 20px 0 20px;
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
        this.$Message.warning('该阶段暂未开放，敬请期待')
      }
    }
  }
</script>

