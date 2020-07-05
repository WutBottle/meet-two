<style scoped lang="scss">
  .RedeemPage {
    .content-wrapper {

    }
  }
</style>

<template>
  <div class="RedeemPage">
    <van-nav-bar
            title="积分兑换"
            left-text="返回"
            left-arrow
            @click-left="() => this.$router.push({path: '/mobile/task'})"
    />
    <div class="content-wrapper">
      <template v-for="(item, index) in list">
        <van-card
                :key="index"
                :tag="String(item.needScore)"
                :title="item.giftDescription"
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #tags>
            <van-tag v-if="!item.done" plain type="danger">未兑换</van-tag>
            <van-tag v-else plain type="success">已兑换</van-tag>
          </template>
          <template #footer>
            <van-button round size="small" color="linear-gradient(to right, #fc746f, #f3cb4a)">兑换</van-button>
          </template>
        </van-card>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RedeemPage",
    data() {
      return {
        list: [{
          redeemId: '',
          needScore: 1001,
          giftImage: null,
          giftDescription: '云南之旅',
          createDate: 1593874398000,
          done: null,
          finishDate: null,
        }, {
          redeemId: '',
          needScore: 2001,
          giftImage: null,
          giftDescription: '带你去爬六峰山',
          createDate: 1593874398000,
          done: true,
          finishDate: null,
        }]

      }
    }
  }
</script>

