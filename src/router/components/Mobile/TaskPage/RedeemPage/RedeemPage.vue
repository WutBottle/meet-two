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
                :desc="item.finishDate"
                :title="item.giftDescription"
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #tags>
            <van-tag v-if="!item.done" plain type="danger">未兑换</van-tag>
            <van-tag v-else plain type="success">已兑换</van-tag>
          </template>
          <template #footer>
            <van-button round size="small" color="linear-gradient(to right, #fc746f, #f3cb4a)" @click="handleExchange(item.redeemId)">兑换</van-button>
          </template>
        </van-card>
      </template>
    </div>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import moment from 'moment';
  export default {
    name: "RedeemPage",
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.getRedeemList();
    },
    methods: {
      getRedeemList() {
        api.redeemController.getRedeemList().then(res => {
          if(res.data && res.data.meta.success) {
            this.list = res.data.data.map(item => {
              return {
                done: item.done,
                finishDate: item.finishDate ? moment(item.finishDate).format('YYYY-MM-DD HH:mm:ss') : '暂无兑换时间',
                giftDescription: item.giftDescription,
                giftImage: item.giftImage || 'https://img.yzcdn.cn/vant/ipad.jpeg',
                needScore: String(item.needScore),
                redeemId: item.redeemId,
              }
            })
          }else {
            this.$toast.fail(res.data.meta.message);id
          }
        })
      },
      handleExchange(id) {
        this.$dialog.confirm({
          title: '确认兑换？',
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  }
</script>

