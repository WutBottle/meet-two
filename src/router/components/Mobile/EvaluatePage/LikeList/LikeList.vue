<style scoped lang="scss">
  .LikeList {
    .name-style {
      min-width: 50px;
      display: inline-block;
    }

    .list-title {
      margin: 0 6px;
    }
  }
</style>

<template>
  <div class="LikeList">
    <van-nav-bar
            title="心动列表"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <van-switch-cell v-model="checked" :loading="changeLoading" @change="handleChange" :title="checked ? '喜欢我的' : '我喜欢的'" />
    <van-pull-refresh v-model="refreshing" v-if="list.length" @refresh="onRefresh">
      <van-list
              finished-text="没有更多了"
      >
        <van-cell-group>
          <van-cell v-for="(item, index) in list" :key="index" is-link @click="showCard(index)">
            <template #title>
              <div class="name-style">
                <van-tag v-if="item.gender === 1" type="primary">{{item.nickname}}</van-tag>
                <van-tag v-else color="#f19ec2">{{item.nickname}}</van-tag>
              </div>
              <span class="list-title">{{item.schoolNumber}}</span>
              <span class="list-title">{{item.college}}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-empty v-else description="详细的个人介绍才能更吸引人哦!" />
    <van-action-sheet v-model="cardShow" title="个人卡片">
      <PersonalCard :cardData="personalData" @handleClosePop="handleClosePop"/>
    </van-action-sheet>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import PersonalCard from "../../PersonalCard/PersonalCard";

  export default {
    name: "LikeList",
    components: {
      PersonalCard,
    },
    data() {
      return {
        list: [],
        refreshing: false,
        cardShow: false,
        personalData: {},
        checked: false,
        changeLoading: false,
      }
    },
    mounted() {
      this.getLove();
    },
    methods: {
      getLove() {
        this.list = [];
        this.changeLoading = true;
        api.userController.getLove().then(res => {
          if (res) {
            if (res.data.data.length && res.data.meta.success) {
              this.list = res.data.data;
            } else {
              this.$notify({type: 'warning', message: '暂时没有心动的人哦!'});
            }
          } else {
            this.$notify({type: 'danger', message: '服务器错误!'});
          }
          this.refreshing = false;
          this.changeLoading = false;
        }).catch((error) => {
          this.$notify({type: 'danger', message: '服务器错误!'});
          this.refreshing = false;
          this.changeLoading = false;
        });
      },
      getBeLove() {
        this.list = [];
        this.changeLoading = true;
        api.userController.getBeLove().then(res => {
          if (res) {
            if (res.data.data.length && res.data.meta.success) {
              this.list = res.data.data;
            } else {
              this.$notify({type: 'warning', message: '暂时没有心动的人哦!'});
            }
          } else {
            this.$notify({type: 'danger', message: '服务器错误!'});
          }
          this.refreshing = false;
          this.changeLoading = false;
        }).catch((error) => {
          this.$notify({type: 'danger', message: '服务器错误!'});
          this.refreshing = false;
          this.changeLoading = false;
        });
      },

      onClickLeft() {
        this.$router.push({
          path: '/mobile/evaluate'
        })
      },
      onRefresh() {
        this.refreshing = true;
        this.checked ? this.getBeLove() : this.getLove();
      },
      showCard(index) {
        let tempData = JSON.parse(JSON.stringify(this.list[index]));
        tempData.hobby = tempData.hobby && tempData.hobby.split(',')
        this.cardShow = true;
        this.personalData = tempData;
      },
      handleClosePop() {
        this.cardShow = false;
      },
      handleChange(val) {
        if (val) {
          this.getBeLove();
        }else {
          this.getLove();
        }
      }
    }
  }
</script>

