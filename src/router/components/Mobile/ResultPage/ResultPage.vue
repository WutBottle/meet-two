<style scoped lang="scss">
  .ResultPage {
    width: 100%;
    background-color: #e8e8e8;
    min-height: 100vh;
    .heart-wrapper {
      text-align: center;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      .heart {
        margin-top: 25vh;
        display: inline-block;
        width: 100px;
        height: 100px;
        /* border: 1px solid #0094ff; */
        animation-name: shake;
        animation-duration: 1s;
        animation-iteration-count: infinite;

        .topLeft {
          width: 100%;
          height: 88%;
          position: absolute;
          background: pink;
          animation-name: shadow;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          transform: translate(-50px, 0) rotate(-45deg);
          border-radius: 100px 100px 0 0;
        }

        .topRight {
          width: 100%;
          height: 102%;
          position: absolute;
          background: pink;
          animation-name: shadow;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          transform: translate(50px, 0) rotate(45deg);
          border-radius: 100px 100px 0 0;
        }

        .bottom {
          width: 100%;
          height: 88%;
          position: absolute;
          background: pink;
          animation-name: shadow;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          transform: translate(0, 64px) rotate(45deg) scale(.9, .9);
        }
      }

    }

    @keyframes shake {
      0% {
        transform: scale(.9, .9);
      }

      100% {
        transform: scale(1.1, 1.1);
      }
    }
    @keyframes shadow {
      0% {}
      100% {
        box-shadow: 0 0 50px pink;
      }
    }
  }
</style>

<template>
  <div class="ResultPage">
    <transition name="van-fade">
      <div v-if="showCover" class="heart-wrapper" :style="'background-color: ' + bgColor">
        <div class="heart">
          <div class="topLeft"></div>
          <div class="topRight"></div>
          <div class="bottom"></div>
        </div>
        <transition name="van-slide-up">
          <van-button v-if="showButton" style="width: 80vw;margin-top: 25vh;" type="primary" round size="large"
                      color="linear-gradient(to right, #FF618B, #A63E3E)"
                      @click="handleEnter"
          >
            和我一起吧
          </van-button>
        </transition>
      </div>
      <div v-else>
        <van-nav-bar
                title="最佳对象"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-notice-bar color="#ff4141" background="#f5d6d6" :scrollable="true" left-icon="info-o">
          请在1个工作日时间内联系对方，确定是否组队参与接下来的7天打卡任务活动！(已确认好的匹配人员请联系管理员进行报备)
        </van-notice-bar>
        <PersonalCard :cardData="personalData"/>
      </div>
    </transition>
    <van-dialog v-model="specialShow" title="想对你说" show-cancel-button
                confirmButtonText="我愿意"
                cancelButtonText="我可以"
                :close-on-click-overlay="false"
    >
      <van-image width="100%" height="200" fit="contain" src="http://49.234.136.242:8082/wish/hbj.jpg" />
    </van-dialog>
  </div>
</template>

<script>
  import PersonalCard from "../PersonalCard/PersonalCard";
  import api from '@api/apiSugar';
  const colorArray = ['#BF9CA2', '#A63E51', '#FFF4DC', '#C7D3FF', '#BFB49C'];
  let index = 0;
  export default {
    name: "ResultPage",
    components: {
      PersonalCard,
    },
    data() {
      return {
        bgColor: '#BF9CA2',
        timer: '',
        showButton: false,
        showCover: true,
        personalData: {},
        specialShow: false,
        userId: '',
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.bgColor = colorArray[index];
        index === 4 ? index = 0 : index++;
      }, 1000);
      setTimeout(() => {
        this.showButton = true;
      }, 5000);
      api.userController.getUserData().then(res => {
        this.userId = res.data.data.userId;
      })
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      onClickLeft() {
        this.$router.push({path: '/mobile/stage'})
      },
      handleEnter() {
        clearInterval(this.timer);
        this.showCover = false;
        api.userController.getMatch().then(res => {
          if (this.userId === 58) {
            this.specialShow = true;
          }
          if (res.data.data && res.data.meta.success) {
            this.personalData = res.data.data;
            this.personalData.hobby = this.personalData.hobby.split(',');
          } else {
            this.$toast.fail(res.data.meta.message);
          }
        })
      },
    },
  }
</script>

