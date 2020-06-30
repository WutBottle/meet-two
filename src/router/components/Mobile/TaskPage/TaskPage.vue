<style scoped lang="scss">
  .TaskPage {
    .score-wrapper {
      text-align: center;
      padding: 20px 0;

      .score {
        display: inline-block;
        width: 100px;
        padding: 5px 0;
        border-radius: 20px;
        box-shadow: 2px 2px 10px #909090;
        font-size: 24px;
        font-weight: bold;
        color: #ecf500;
      }
    }

    .row-wrapper {
      padding-top: 14px;

      .words {
        padding: 10px 20px 0 30px;
        font-size: 14px;
        color: #b8b8b8;
      }

      .info-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px 0 30px;

        .title {
          flex: 2;
          display: inline-block;
          font-size: 22px;
          color: #939393;
          font-weight: bold;
        }

        .count-down {
          display: inline-block;
          font-size: 14px;
          padding-right: 20px;

          .block {
            display: inline-block;
            padding: 4px;
            border-radius: 5px;
            width: 80px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            background-color: #2bb6f4;
          }
        }

        .finish-date {
          color: #46cb09;
          font-size: 16px;
        }

        .score {
          display: inline-block;
          font-size: 20px;
          padding-right: 20px;
          color: #ecf500;
        }
      }
    }

  }
</style>

<template>
  <div class="TaskPage">
    <van-nav-bar
            title="任务列表"
            left-text="返回"
            left-arrow
            @click-left="() => this.$router.push({path: '/mobile/login'})"
    />
    <div class="score-wrapper">
      <div class="score">
        <div style="display: flex;align-items: center;justify-content: center">
          {{currentScore}}
          <van-icon name="star" style="font-size: 26px"/>
        </div>
      </div>
    </div>
    <van-tabs @click="onChangeTab">
      <van-tab name="每日任务" title="每日任务">
        <template v-for="item in list">
          <div class="row-wrapper">
            <div class="info-wrapper">
              <div class="title">
                {{item.content}}
              </div>
              <div class="score">
                <div style="display: flex;align-items: center;justify-content: center">
                  {{item.score}}
                  <van-icon name="star" style="font-size: 20px"/>
                </div>
              </div>
              <div class="count-down">
                <van-count-down :time="item.time.data" @finish="countFinish(item)">
                  <template v-slot="timeData">
                    <div class="block">{{ timeData.hours }}:{{ timeData.minutes }}:{{ timeData.seconds }}</div>
                  </template>
                </van-count-down>
              </div>
              <van-button v-if="item.punchRecord" round type="primary" icon="smile-o" size="small"
                          @click="showFinishTips"></van-button>
              <van-button v-else-if="!item.time.outTime && !item.punchRecord" round type="info" icon="success"
                          size="small" @click="showCheck(item)"></van-button>
              <van-button v-else round color="#a0a0a0" icon="cross" size="small" @click="showFailTips"></van-button>
            </div>
            <van-divider/>
          </div>
        </template>
        <van-empty v-if="!list.length" description="暂无任务"/>
      </van-tab>
      <van-tab name="历史记录" title="历史记录">
        <van-field
                readonly
                clickable
                :value="stringDate"
                label="查询日期"
                placeholder="点击选择出生日期"
                @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
                  type="date"
                  :min-date="minDate"
                  :max-date="maxDate"
                  v-model="currentDate"
                  @confirm="onConfirmDate"
                  @cancel="showPicker = false"
          />
        </van-popup>
        <template v-for="item in historyList">
          <div class="row-wrapper">
            <div class="info-wrapper">
              <div class="title">
                {{item.content}}
              </div>
              <div class="score">
                <div style="display: flex;align-items: center;justify-content: center">
                  {{item.score}}
                  <van-icon name="star" style="font-size: 20px"/>
                </div>
              </div>
              <div class="finish-date">
                {{item.punchDate}}
              </div>
            </div>
            <div class="words">槽点：{{item.words}}</div>
            <van-divider/>
          </div>
        </template>
        <van-empty v-if="!historyList.length" description="暂无记录"/>
      </van-tab>
    </van-tabs>
    <van-dialog v-model="showDialog" :title="currentTaskData.title" show-cancel-button @confirm="check">
      <van-field
              style="padding: 30px"
              v-model="currentTaskData.words"
              name="吐槽"
              label="吐槽"
              placeholder="可以随便吐槽"
      />
    </van-dialog>
    <van-dialog v-model="showDialog" :title="currentTaskData.title" show-cancel-button @confirm="check">
      <van-field
              style="padding: 30px"
              v-model="currentTaskData.words"
              name="吐槽"
              label="吐槽"
              placeholder="可以随便吐槽"
      />
    </van-dialog>
    <van-dialog v-model="showFeedBack" :title="currentTaskData.feedBack">
      <div style="text-align: center;">
        <van-image
                width="15rem"
                height="15rem"
                fit="cover"
                :src="currentTaskData.backImage"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import moment from 'moment'

  export default {
    name: "TaskPage",
    data() {
      return {
        moment,
        list: [],
        showDialog: false,
        currentTaskData: {
          id: '',
          title: '',
          words: '',
          feedBack: '',
          backImage: '',
        },
        historyList: [],
        showPicker: false,
        minDate: new Date(2020, 4, 30),
        maxDate: new Date(2021, 5, 30),
        currentDate: new Date(),
        stringDate: moment(new Date()).format('YYYY-MM-DD'),
        currentScore: 0,
        showFeedBack: false,
      }
    },
    mounted() {
      this.getTaskList();
    },
    methods: {
      getTaskList() {
        api.taskController.getTaskListByUserId({
          userId: '',
        }).then(res => {
          if (res.data.data && res.data.meta.success) {
            this.currentScore = 0;
            this.list = res.data.data.map(item => {
              if (item.punchRecord) {
                this.currentScore += item.score;
              }
              return {
                taskId: item.taskId,
                backImage: item.backImage,
                score: item.score,
                content: item.content,
                deadline: item.deadline,
                feedBack: item.feedBack || '我是一个没有感情的标题',
                punchRecord: item.punchRecord,
                time: this.countSecond(item.deadline),
              }
            })
          } else {
            this.$toast.fail(res.data.meta.message);
          }
        })
      },
      getPunchRecords() {
        api.taskController.getPunchRecordsByDate({
          userId: '',
          date: moment(this.currentDate).valueOf(),
        }).then(res => {
          if (res.data.data && res.data.meta.success) {
            this.currentScore = 0;
            this.historyList = res.data.data.punchRecords.map(item => {
              this.currentScore += item.score;
              return {
                content: item.content,
                punchDate: moment(item.punchDate).format('HH:mm:ss'),
                score: item.score,
                words: item.words || '暂无',
              }
            })
          } else {
            this.$toast.fail(res.data.meta.message);
          }
        })
      },
      countSecond(ddl) {
        const now = moment();
        const dateDDL = moment(moment().locale('zh-cn').format('YYYY-MM-DD') + ' ' + ddl);
        return {
          data: dateDDL.diff(now, 'seconds') * 1000,
          outTime: moment(dateDDL).isBefore(now),
        }
      },
      showCheck(data) {
        this.currentTaskData.title = '确定完成"' + data.content + '"任务?';
        this.currentTaskData.id = data.taskId;
        this.currentTaskData.feedBack = data.feedBack;
        this.currentTaskData.backImage = data.backImage;
        this.showDialog = true;
      },
      check() {
        api.taskController.punch({
          task: {
            taskId: this.currentTaskData.id,
          },
          words: this.currentTaskData.words,
        }).then(res => {
          if (res.data.data && res.data.meta.success) {
            this.$toast.success(res.data.meta.message);
            this.showFeedBack = true;
            this.getTaskList();
          } else {
            this.$toast.fail(res.data.meta.message);
          }
          Object.assign(this.currentTaskData, {
            id: '',
            title: '',
            words: '',
          });
        })
      },
      countFinish(data) {
        if (!data.time.outTime) {
          this.getTaskList();
        }
      },
      showFailTips() {
        this.$toast.fail('已过期，明天再来吧！');
      },
      showFinishTips() {
        this.$toast.success('该任务已完成！');
      },
      onChangeTab(name) {
        if (name === '每日任务') {
          this.getTaskList();
        } else if (name === '历史记录') {
          this.getPunchRecords();
        }
      },
      onConfirmDate(time) {
        this.stringDate = moment(time).format('YYYY-MM-DD');
        this.getPunchRecords();
        this.showPicker = false;
      },
    }
  }
</script>

