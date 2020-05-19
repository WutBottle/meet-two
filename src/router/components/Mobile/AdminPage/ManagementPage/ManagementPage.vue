<style scoped lang="scss">
  .ManagementPage {
    .list-wrapper {
      height: calc(100vh - 200px);
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
  <div class="ManagementPage">
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      目前男女人数比例为{{male}}-{{female}}
    </van-notice-bar>
    <form action="/">
      <van-search
              v-model="searchValue"
              placeholder="搜索关键词：姓名或学号"
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
      </div>
    </form>
    <van-action-sheet v-model="cardShow" title="个人卡片">
      <PersonalCard :cardData="personalData" @handleClosePop="handleClosePop" :isDelete="true"/>
    </van-action-sheet>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import PersonalCard from "../../PersonalCard/PersonalCard";
  import api from '@api/apiSugar';

  export default {
    name: "ManagementPage",
    components: {
      PersonalCard,
    },
    data() {
      return {
        searchValue: '',
        list: [],
        loading: false,
        finished: false,
        cardShow: false,
        personalData: {},
        female: '',
        male: '',
      }
    },
    activated() {
      this.pagingOption.pageNum = 1;
    },
    computed: {
      ...mapState({
        pagingOption: state => state.userOperation.usersPagingOption,
      }),
    },
    methods: {
      onSearch(val) {
        this.list = [];
        this.pagingOption.pageNum = 1;
        this.pagingOption.totalNum = null;
        this.searchValue = val;
        this.onLoad();
      },
      onCancel() {
      },
      onLoad() {
        // 异步更新数据
        this.loading = true;
        api.userController.getUserListByNameLike({
          nickname: this.searchValue,
          pageNum: this.pagingOption.pageNum,
          pageLimit: this.pagingOption.pageLimit,
        }).then(res => {
          if (res) {
            if (res.data.data && res.data.meta.success) {
              this.pagingOption.totalNum = res.data.data.users.totalElements;
              this.female = res.data.data.female;
              this.male = res.data.data.male;
              res.data.data.users.content.map(item => {
                this.list.push(item)
              });
              if (this.list.length >= this.pagingOption.totalNum) {
                this.finished = true;
              } else {
                this.pagingOption.pageNum++;
                this.finished = false;
              }
              this.loading = false;
            } else {
              this.$notify({type: 'danger', message: res.data.meta.message});
            }
          } else {
            this.$notify({type: 'danger', message: '网络超时'});
          }
        });

      },
      showCard(index) {
        let tempData = JSON.parse(JSON.stringify(this.list[index]));
        tempData.hobby = tempData.hobby && tempData.hobby.split(',')
        this.cardShow = true;
        this.personalData = tempData;
      },
      handleClosePop() {
        this.cardShow = false;
        this.onSearch(this.searchValue);
      }
    }
  }
</script>

