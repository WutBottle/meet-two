<style scoped lang="scss">
  .PersonalCard {
    .div-wrapper {
      display: flex;
      justify-items: center;
      white-space: normal;
      line-height: 24px;
    }

    .button-wrapper {
      display: flex;
    }
  }
</style>

<template>
  <div class="PersonalCard">
    <van-image width="100%" height="250" fit="contain" :src="cardData.userImg" />
    <div style="padding: 12px 20px">
      <van-row gutter="12">
        <van-col span="12">
          <div class="div-wrapper">
            姓名：{{cardData.nickname}}
            <van-image style="margin-left: 8px" width="20" height="20" round :src="cardData.gender === 1 ? male : female" />
          </div>
          <div class="div-wrapper">
            学院：{{cardData.college}}
          </div>
          <div class="div-wrapper">
            出生日期：{{cardData.bornDate && moment(cardData.bornDate).format("YYYY-MM-DD")}}
          </div>
          <div class="div-wrapper">
            手机：{{cardData.phoneNumber}}
          </div>
        </van-col>
        <van-col span="12">
          <div class="div-wrapper">
            学号：{{cardData.schoolNumber}}
          </div>
          <div class="div-wrapper">
            QQ/微信：{{cardData.qq}}
          </div>
          <div class="div-wrapper">
            家乡：{{cardData.city}}
          </div>
        </van-col>
      </van-row>
      <van-row>
          兴趣爱好：
          <van-tag style="margin: 2px" mark v-for="(item, index) in cardData.hobby" :color="color[index%color.length]">{{item}}</van-tag>
      </van-row>
      <van-row style="line-height: 20px;padding: 8px 0;">
        个人介绍：
        {{cardData.introduction}}
      </van-row>
    </div>
    <div v-if="isAdmin" class="button-wrapper">
      <van-button type="primary" size="large" @click="handleActive(true)">通过</van-button>
      <van-button type="danger" size="large" @click="handleActive(false)">不通过</van-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  const color = ['#7232dd', '#f2826a','#ff361e','#f6941d', '#fa5a5a','#f0d264','#82c8a0','#7fccde','#6698cb','#cb99c5','#0080ff'];
  export default {
    name: "PersonalCard",
    props: {
      cardData: Object,
      isAdmin: Boolean,
    },
    data() {
      return {
        male: require('@assets/male.png'),
        female: require('@assets/female.png'),
        color,
      }
    },
    methods: {
      moment,
      handleActive(status) {
        if (status) {
          this.$toast.success('已通过');
        } else {
          this.$toast.fail('已拒绝');
        }
        this.$emit('handleClosePop');
      },
    }
  }
</script>