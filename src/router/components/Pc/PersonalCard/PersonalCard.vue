<style scoped lang="scss">
  .PersonalCard {
    .ant-card-grid {
      padding: 5px;
    }

    .img-wrapper {
      width: 100%;
      height: 40vh;
      display: flex;

      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }

    .text-wrapper {
      width: 100%;
      padding: 20px;

      .font-style {
        font-family: 'AJC';
        font-size: 20px;
        white-space: normal;
      }

      .sex-style {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>

<template>
  <div class="PersonalCard">
    <a-spin :spinning="cardSpinning" tip="生成中..." size="large">
      <a-card title="个人卡片">
        <div v-if="Object.keys(cardData).length">
          <a-card-grid class="img-wrapper">
            <img :src="cardData.userImg"
                 alt="">
          </a-card-grid>
          <a-card-grid class="text-wrapper">
            <a-row>
              <a-col :span="12">
            <span class="font-style">
              姓名：{{cardData.nickname}}
              <img v-if="cardData.gender" class="sex-style" src="@assets/male.png" alt="male">
              <img v-else class="sex-style" src="@assets/female.png" alt="female">
            </span>
              </a-col>
              <a-col :span="12">
                <span class="font-style">学号：{{cardData.schoolNumber}}</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <span class="font-style">学院：{{cardData.college}}</span>
              </a-col>
              <a-col :span="12">
                <span class="font-style">身高：{{cardData.height}}cm</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <span class="font-style">出生日期：{{cardData.bornDate && moment(cardData.bornDate).format("YYYY-MM-DD")}}</span>
              </a-col>
              <a-col :span="12">
                <span class="font-style">QQ/微信：{{cardData.qq}}</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <span class="font-style">电话：{{cardData.phoneNumber}}</span>
              </a-col>
              <a-col :span="12">
                <span class="font-style">家乡：{{cardData.city}}</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <span class="font-style">兴趣爱好：</span>
                <span>
              <a-tag v-for="(item, index) in cardData.hobby" :color="tagColors[index%6]" :key="index">
                {{item}}
              </a-tag>
            </span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
            <span class="font-style">
              个人介绍：{{cardData.introduction}}
            </span>
              </a-col>
            </a-row>
          </a-card-grid>
        </div>
        <a-empty v-else/>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "PersonalCard",
    props: {
      cardData: Object,
      cardSpinning: Boolean,
    },
    data() {
      return {
        tagColors: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple']
      }
    },
    methods: {
      moment,
    }
  }
</script>