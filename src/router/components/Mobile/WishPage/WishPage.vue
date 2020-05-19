<style scoped lang="scss">
  .WishPage {
    .plant-tree-wrapper {
      position: fixed;
      padding: 0 20px 10px 20px;
      width: 100%;
      bottom: 20px;

      .van-icon__image {
        display: flex;
      }
    }
  }
</style>

<template>
  <div class="WishPage">
    <van-nav-bar
            title="许愿树"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="card-wrapper">

    </div>
    <div class="plant-tree-wrapper">
      <van-button style="margin-right: 10px" type="primary" :icon="plant" round size="large"
                  color="linear-gradient(to right, #ff5559, #ef7f94)">种下种子
      </van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WishPage",
    data() {
      return {
        plant: require('@assets/plant.png'),
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push({path: '/mobile/stage'})
      }
    }
  }
</script>

