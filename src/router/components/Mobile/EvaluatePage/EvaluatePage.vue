<style scoped lang="scss">
  .EvaluatePage {
    .card-wrapper {
      height: calc(100vh - 46px);
      overflow: auto;
      background-color: #e8e8e8;
    }

    .button-wrapper {
      padding: 0 20px 10px 20px;
      display: flex;
      position: fixed;
      width: 100%;
      bottom: 0;

      img {
        display: flex;
      }
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
      <transition v-if="Object.keys(personalData).length" :name="this.slideDirection ? 'van-slide-left' : 'van-slide-right'">
        <PersonalCard v-show="visible" :cardData="personalData"/>
      </transition>
      <van-empty v-else image="search" description="ta可能还在赶来的路上" />
    </div>
    <div class="button-wrapper">
      <van-button style="margin-right: 10px" type="primary" icon="like-o" round size="large"
                  color="linear-gradient(to right, #ff5559, #ef7f94)" @click="handleLike(true)">喜欢
      </van-button>
      <van-button style="margin-left: 10px" type="primary" :icon="dislike" round size="large"
                  color="linear-gradient(to right, #40399e, #7a93ee)" @click="handleLike(false)">不喜欢
      </van-button>
    </div>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import PersonalCard from "../PersonalCard/PersonalCard";

  export default {
    name: "EvaluatePage",
    components: {
      PersonalCard
    },
    data() {
      return {
        visible: true,
        slideDirection: true,
        isLike: null,
        cardData: [1, 2, 3, 4, 5],
        dislike: require('@assets/dislike.png'),
        personalData: {},
      }
    },
    mounted() {
      this.getMatchUser();
    },

    methods: {
      handleLike(index) {
        this.isLike = index;
        Object.keys(this.personalData).length && api.userController.love({
          userId: this.personalData.userId,
          love: index
        }).then(res => {
          if (res && res.data.meta.success) {
            if (index) {
              this.$toast.success('喜欢');
              this.slideDirection = true;
            } else {
              this.$toast.fail('不喜欢');
              this.slideDirection = false;
            }
            this.visible = false;
            this.getMatchUser();
          } else {
            this.$notify({type: 'danger', message: '服务器错误!'});
          }
        });
      },
      getMatchUser() {
        api.userController.userMatch().then(res => {
          if (res && res.data.meta.success) {
            if (res.data.data) {
              this.personalData = res.data.data;
              this.personalData.hobby = res.data.data.hobby && res.data.data.hobby.split(',');
              this.visible = true;
            } else {
              this.personalData = {};
              this.$notify({type: 'warning', message: '已无更多候选人!'});
            }
          } else {
            this.$notify({type: 'danger', message: '服务器错误!'});
          }
        })
      },
    }
  }
</script>
