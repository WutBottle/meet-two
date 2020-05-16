<style scoped lang="scss">
  .StagePage {
    overflow: hidden;

    .list-style {
      margin: 10px;
      height: 150px;
      border-radius: 12px;

      .title-wrapper {
        color: #fff;
        font-size: 26px;
        align-items: center;
        display: flex;
        padding: 8px 10px 0 10px;

        .icon-wrapper {
          display: flex;
        }
      }

      .saying-wrapper {
        font-size: 14px;
        padding: 0 18px;
        margin-top: 10px;
        color: white;
      }

      &:nth-of-type(2) {
        background-image: linear-gradient(to right, #3214F2, #32FBFC);
      }

      &:nth-of-type(3) {
        background-image: linear-gradient(to right, #FC3832, #F2C314);
      }

      &:nth-of-type(4) {
        background-image: linear-gradient(to right, #15EAFA, #FDF70F);
      }

      &:nth-of-type(5) {
        background-image: linear-gradient(to right, #1D1279, #E458FC);
      }
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
    <div class="list-style" @click="jumpToStage1">
      <div class="title-wrapper">
        <van-icon class="icon-wrapper" :name="logo1" size="46"/>
        我的档案
      </div>
      <div class="saying-wrapper">
        人的一生，除了要面对无常带来的跌宕，还有贯穿在其中的平淡和琐碎。
      </div>
    </div>
    <div class="list-style" @click="jumpToStage2">
      <div class="title-wrapper">
        <van-icon class="icon-wrapper" :name="logo2" size="46"/>
        倾心互评
      </div>
      <div class="saying-wrapper">
        这个世界里，虽然没有最美好的相遇，却应该有为了相遇或者重逢，所做的最美好的努力。
      </div>
    </div>
    <div class="list-style" @click="showTips">
      <div class="title-wrapper">
        <van-icon class="icon-wrapper" :name="logo3" size="46"/>
        匹配结果
      </div>
      <div class="saying-wrapper">
        我恨自己别无选择，只能冒险爱你。
      </div>
    </div>
    <div class="list-style" @click="showTips">
      <div class="title-wrapper">
        <van-icon class="icon-wrapper" :name="logo4" size="46"/>
        打卡任务
      </div>
      <div class="saying-wrapper">
        　对于三十岁以后的人来说，十年八年不过是指缝间的事；而对于年轻人而言，三年五年就可以是一生一世。
      </div>
    </div>
  </div>
</template>

<script>
  import {ENABLE, ANSWER} from '@store/mutation-types';
  import {mapMutations} from 'vuex';
  import api from '@api/apiSugar';

  export default {
    name: "StagePage",
    data() {
      return {
        logo1: require('@assets/stageLogo/1c.png'),
        logo2: require('@assets/stageLogo/2c.png'),
        logo3: require('@assets/stageLogo/3c.png'),
        logo4: require('@assets/stageLogo/4c.png'),
      }
    },
    methods: {
      ...mapMutations({
        enableSet: 'tokensOperation/enableSet'
      }),
      jumpToStage1() {
        if (localStorage.getItem(ANSWER) === 'null') {
          this.$router.push({
            path: '/mobile/test'
          });
        } else {
          this.$router.push({path: '/mobile/stage1'})
        }
      },
      jumpToStage2() {
        api.userController.getUserData().then(res => {
          if (res && res.data.data) {
            if (res.data.data.enable === 1) {
              this.$router.push({
                path: '/mobile/evaluate'
              });
            }
            this.enableSet(res.data.data.enable);
          }
        });
      },
      showTips() {
        if (localStorage.getItem(ENABLE) === '1') {
          this.$notify({type: 'warning', message: '该阶段暂未开放，敬请期待'});
        } else {
          this.$notify({type: 'danger', message: '该账户尚未激活，请联系管理员'});
        }
      },
      onClickLeft() {
        this.$router.push({path: '/mobile/login'})
      }
    }
  }
</script>

