<style scoped lang="scss">
  .ActivePage {
    .list-wrapper {
      height: calc(100vh - 150px);
      overflow-x: hidden;
      overflow-y: visible;

      .name-style {
        min-width: 50px;
        display: inline-block;
      }

      .list-title {
        margin: 0 6px;
      }
    }
  }
</style>

<template>
  <div class="ActivePage">
    <form action="/">
      <van-search
              v-model="searchValue"
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
      />
      <div class="list-wrapper">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
          <van-cell-group>
            <van-cell v-for="(item, index) in list" :key="index" is-link @click="showCard(item)">
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
      </div>
    </form>
    <van-action-sheet v-model="cardShow" title="个人卡片">
      <PersonalCard :cardData="personalData" @handleClosePop="handleClosePop" :isAdmin="true"/>
    </van-action-sheet>
  </div>
</template>

<script>
  import PersonalCard from "../../PersonalCard/PersonalCard";
  export default {
    name: "ActivePage",
    components: {
      PersonalCard
    },
    data() {
      return {
        searchValue: '',
        list: [{
          nickname: '张鹏',
          gender: 1,
          schoolNumber: 'M201973007',
          college: '武汉光电国家研究中心'
        }, {
          nickname: '黄宝金',
          gender: 0,
          schoolNumber: 'M201973008',
          college: '软件学院'
        }],
        loading: false,
        finished: false,
        cardShow: false,
        personalData: {},
      }
    },
    methods: {
      onSearch(val) {
        console.log(val)
      },
      onCancel() {
      },
      onLoad() {
        // 异步更新数据
        this.loading = false;
      },
      showCard(data) {
        this.cardShow = true;
      },
      handleClosePop() {
        this.cardShow = false;
      }
    }
  }
</script>
