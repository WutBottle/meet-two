<style scoped lang="scss">
  .WishPage {
    .main-wrapper {
      width: 100%;
      height: calc(100vh - 46px);
      background-image: url("~@assets/tree.png");
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: center 60%;
      overflow: auto;

      .card-wrapper {
        padding: 20px 30px;
      }
    }

    .plant-tree-wrapper {
      position: fixed;
      padding: 0 40px 10px 40px;
      width: 100%;
      bottom: 20px;

      .van-icon__image {
        display: flex;
      }

      .func-btn-wrapper {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .btn-style {
          width: 134px;
        }
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
    <div class="main-wrapper">
      <div class="card-wrapper">
        <WishCard/>
      </div>
    </div>
    <div class="plant-tree-wrapper">
      <div class="func-btn-wrapper">
        <van-button class="btn-style" type="primary" round size="large"
                    color="linear-gradient(to right, #ffa298, #ff9cc4)">下一个
        </van-button>
        <van-button class="btn-style" type="primary" round size="large"
                    color="linear-gradient(to right, #ea8bb5, #b9b6ff)">浇水
        </van-button>
      </div>
      <van-button style="margin-right: 10px" type="primary" :icon="plant" round size="large"
                  color="linear-gradient(to right, #ff5559, #ef7f94)">播下种子
      </van-button>
    </div>
  </div>
</template>

<script>
  import WishCard from "./WishCard/WishCard";
  export default {
    name: "WishPage",
    components: {
      WishCard,
    },
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

