<style scoped lang="scss">
  .WishCard {
    padding: 20px;
    box-shadow: 0 6px 0 rgb(255, 231, 178), 0 9px 25px rgba(0,0,0,.7);
    background-color: rgba(255, 255, 255, 0.76);

    border-radius: 12px;

    .text-wrapper {
      padding-top: 4px;
      font-size: 16px;
      color: #3c3c3c;
      font-weight: bold;
    }
  }
</style>

<template>
  <div class="WishCard" @click="showPersonalData">
    <van-image
            width="100%"
            height="180px"
            fit="contain"
            :src="wishCardData.wishImg || 'https://img.yzcdn.cn/vant/cat.jpeg'"
    />
    <div class="time">
      {{moment(wishCardData.startDate).format('YYYY-MM-DD')}}
    </div>
    <div class="text-wrapper">
      {{wishCardData.wishText}}
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "WishCard",
    props:{
      wishCardData: Object,
    },
    methods: {
      moment,
      showPersonalData() {
        this.$emit('showPersonalData')
      }
    }
  }
</script>

