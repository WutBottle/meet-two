<style scoped lang="scss">
  .PersonalCard {
    background-color: #e8e8e8;
    padding: 30px 40px 70px 40px;

    .img-style {
      border-radius: 12px;
      background-color: #fff !important;
    }

    .div-wrapper {
      white-space: normal;
      font-size: 16px;
      line-height: 30px;
      color: #595959;
      padding: 0 8px;

      .label-style {
        font-weight: bold;
        color: #3c3c3c;
      }
    }

    .button-wrapper {
      display: flex;

      .van-button {
        margin-top: 30px;
        margin-bottom: -60px;

        &:nth-of-type(1) {
          margin-left: -20px;
          margin-right: 10px;
        }

        &:nth-of-type(2) {
          margin-left: 10px;
          margin-right: -20px;
        }
      }
    }
  }
</style>

<template>
  <div class="PersonalCard">
    <van-image class="img-style" v-if="isAdmin || isDelete" width="100%" height="200" fit="contain" :src="cardData.identityImg"/>
    <van-image class="img-style" width="100%" height="250" fit="contain" :src="cardData.userImg"/>
    <div class="div-wrapper" style="display: flex;align-items: center;">
      <span class="label-style">姓名：</span>{{cardData.nickname}}
      <van-image style="margin-left: 8px;" width="20" height="20" round
                 :src="cardData.gender === 1 ? male : female"/>
    </div>
    <div class="div-wrapper">
      <span class="label-style">学院：</span>{{cardData.college}}
    </div>
    <div class="div-wrapper">
      <span class="label-style">出生日期：</span>{{cardData.bornDate && moment(cardData.bornDate).format("YYYY-MM-DD")}}
    </div>
    <div class="div-wrapper">
      <span class="label-style">手机：</span>{{cardData.phoneNumber || isAdmin ? cardData.phoneNumber : '保密中...'}}
    </div>
    <div class="div-wrapper">
      <span class="label-style">学号：</span>{{cardData.schoolNumber || isAdmin ? cardData.schoolNumber : '保密中...'}}
    </div>
    <div class="div-wrapper">
      <span class="label-style">QQ/微信：</span>{{cardData.qq}}
    </div>
    <div class="div-wrapper">
      <span class="label-style">家乡：</span>{{cardData.city}}
    </div>
    <div class="div-wrapper">
      <span class="label-style">兴趣爱好：</span>
      <van-tag style="margin: 2px" mark v-for="(item, index) in cardData.hobby" :color="color[index%color.length]">
        {{item}}
      </van-tag>
    </div>
    <div class="div-wrapper">
      <span class="label-style">个人介绍：</span>
      {{cardData.introduction}}
    </div>
    <div v-if="isAdmin" class="button-wrapper">
      <van-button type="primary" size="large" round color="linear-gradient(to right, #37d6b6, #0ac2c9)"
                  @click="handleActive(true)">通过
      </van-button>
      <van-button type="danger" size="large" round color="linear-gradient(to right, #fd3e30, #ff7d36)"
                  @click="handleActive(false)">不通过
      </van-button>
    </div>
    <van-button v-if="isDelete" style="margin-top: 30px;" type="danger" size="large" round
                color="linear-gradient(to right, #fd3e30, #ff7d36)"
                @click="handleDelete()">删除
    </van-button>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import * as moment from 'moment';

  const color = ['#7232dd', '#f2826a', '#ff361e', '#fa5a5a',
    '#f17db1', '#ffcb05', '#42dc84', '#02b8e2', '#a6ce39', '#0080ff'];
  export default {
    name: "PersonalCard",
    props: {
      cardData: Object,
      isAdmin: Boolean,
      isDelete: Boolean,
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
          code: status ? 1 : 2,
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
      handleDelete() {
        this.$dialog.confirm({
          title: '删除',
          message: '删除后需重新注册，请问确定删除?',
        }).then(() => {
          api.userController.deleteUser({
            userId: this.cardData.userId
          }).then(res => {
            if (res) {
              if (res.data.data && res.data.meta.success) {
                this.$emit('handleClosePop');
                this.$toast.success('已删除');
              } else {
                this.$toast.fail(res.data.meta.message);
              }
            } else {
              this.$toast.fail('网络错误');
            }
          })
        }).catch(() => {
        });
      }
    }
  }
</script>