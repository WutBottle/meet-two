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

      .van-button {
        margin: 8px 20px 30px 20px;
      }
    }
  }
</style>

<template>
  <div class="PersonalCard">
    <van-image v-if="isAdmin" width="100%" height="200" fit="contain" :src="cardData.identityImg"/>
    <van-image width="100%" height="200" fit="contain" :src="cardData.userImg"/>
    <div style="padding: 12px 20px">
      <van-row gutter="12">
        <van-col span="12">
          <div class="div-wrapper">
            姓名：{{cardData.nickname}}
            <van-image style="margin-left: 8px" width="20" height="20" round
                       :src="cardData.gender === 1 ? male : female"/>
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
        <van-tag style="margin: 2px" mark v-for="(item, index) in cardData.hobby" :color="color[index%color.length]">
          {{item}}
        </van-tag>
      </van-row>
      <van-row style="line-height: 20px;padding: 8px 0;">
        个人介绍：
        {{cardData.introduction}}
      </van-row>
    </div>
    <div v-if="isAdmin" class="button-wrapper">
      <van-button type="primary" size="large" round color="linear-gradient(to right, #37d6b6, #0ac2c9)" @click="handleActive(true)">通过</van-button>
      <van-button type="danger" size="large" round color="linear-gradient(to right, #fd3e30, #ff7d36)" @click="handleActive(false)">不通过</van-button>
    </div>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  // import * as moment from 'moment';

  const color = ['#7232dd', '#f2826a', '#ff361e', '#fa5a5a',
    '#f17db1', '#ffcb05', '#42dc84', '#02b8e2', '#a6ce39', '#0080ff'];
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
        api.userController.userActive({
          userId: this.cardData.userId,
          code: status ? 1 : 1,
        }).then(res => {
          if (res.data.data && res.data.meta.success) {
            if (status) {
              this.$toast.success('已通过');
            } else {
              this.$toast.fail('已拒绝');
            }
          } else {
            this.$notify({type: 'danger', message: res.data.meta.message});
          }
          this.$emit('handleClosePop');
        })
      },
    }
  }
</script>