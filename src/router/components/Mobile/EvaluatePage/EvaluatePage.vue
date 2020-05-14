<style scoped lang="scss">
  .EvaluatePage {
    .card-wrapper {
      height: calc(100vh - 95px);
      overflow-y: visible;
      overflow-x: hidden;
      text-align: center;
    }

    .button-wrapper {
      display: flex;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  }
</style>

<template>
  <div class="EvaluatePage">
    <van-nav-bar
            title="Like or Dislike"
            left-text="返回"
            left-arrow
            @click-left="() => this.$router.push({path: '/mobile/stage'})"
    />
    <div class="card-wrapper">
      <transition :name="this.slideDirection ? 'van-slide-left' : 'van-slide-right'">
        <div v-show="visible" style="width: 80%;height: 500px;background-color: #29c5ff;display: inline-block"></div>
      </transition>
    </div>
    <div class="button-wrapper">
      <van-button type="primary" round size="large" color="linear-gradient(to right, #FF4D3E, #FF938A)" @click="handleLike(true)">喜欢</van-button>
      <van-button type="primary" round size="large" color="linear-gradient(to right, #8b8a88, #CCCBC8)" @click="handleLike(false)">不喜欢</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EvaluatePage",
    data() {
      return {
        visible: true,
        slideDirection: true,
        isLike: null,
        cardData: [1,2,3,4,5]
      }
    },
    methods: {
      handleLike(index) {
        this.isLike = index;
        if (index) {
          this.$toast.success('喜欢');
          this.slideDirection = true;
        } else {
          this.$toast.fail('不喜欢');
          this.slideDirection = false;
        }
        this.visible = !this.visible;
        setTimeout(() => {
          this.visible = !this.visible;
        }, 800);
      }
    }
  }
</script>
