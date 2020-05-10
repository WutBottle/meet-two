<style scoped lang="scss">
  .StagePage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    width: 75vw;
    background-color: transparent;
    overflow: hidden;

    .gutter-row {
      color: #fff;

      .stage-style {
        position: relative;
        height: 60vh;
        border-radius: 12px;
        
        &:hover {
          cursor: pointer;
        }
      }

      .stage1 {
        background-color: #09c2ff;
      }

      .stage2 {
        background-color: #29e024;
      }

      .stage3 {
        background-color: #ff2245;
      }

      .stage4 {
        background-color: #ffd12f;
      }

      .center {
        text-align: center;
        font-size: 36px;
      }

      .mask {
        z-index: 900;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 8px 0 8px;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background-image: url("~@assets/lock.png");
        background-size: 100% 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>

<template>
  <div class="StagePage">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6">
        <div class="stage1 center stage-style" @click="jumpToStage1">
          我的档案
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="stage2 center stage-style">
          <div class="mask" @click="maskTips"></div>
          倾心互评
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="stage3 center stage-style">
          <div class="mask" @click="maskTips"></div>
          匹配结果
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="stage4 center stage-style">
          <div class="mask" @click="maskTips"></div>
          打卡任务
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "StagePage",
    methods: {
      jumpToStage1() {
        this.$router.push({path: '/pc/stage1'})
      },
      maskTips() {
        this.$message.warning('该阶段暂未开放，敬请期待');
      }
    }
  }
</script>
