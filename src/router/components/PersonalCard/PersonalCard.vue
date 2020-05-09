<style scoped lang="scss">
  .PersonalCard {
    .ant-card-grid {
      padding: 5px;
    }

    .img-wrapper {
      width: 33.33%;
      height: 180px;
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
    <a-card title="个人卡片">
      <a-card-grid class="img-wrapper">
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg"
             alt="">
      </a-card-grid>
      <a-card-grid class="img-wrapper">
        <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3374416169,262924133&fm=111&gp=0.jpg"
             alt="">
      </a-card-grid>
      <a-card-grid class="img-wrapper">
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg"
             alt="">
      </a-card-grid>
      <a-card-grid class="img-wrapper">
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg"
             alt="">
      </a-card-grid>
      <a-card-grid class="img-wrapper">
        <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3374416169,262924133&fm=111&gp=0.jpg"
             alt="">
      </a-card-grid>
      <a-card-grid class="img-wrapper">
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3744215463,383557679&fm=26&gp=0.jpg"
             alt="">
      </a-card-grid>
      <a-card-grid class="text-wrapper">
        <a-row>
          <a-col :span="12">
            <span class="font-style">
              姓名：张鹏
              <img class="sex-style" src="@assets/male.png" alt="male">
            </span>
          </a-col>
          <a-col :span="12">
            <span class="font-style">学号：</span>
            <span class="font-style">M201973007</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <span class="font-style">学院：</span>
            <span class="font-style">武汉光电国家研究中心</span>
          </a-col>
          <a-col :span="12">
            <span class="font-style">身高：</span>
            <span class="font-style">175cm</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <span class="font-style">出生日期：</span>
            <span class="font-style">1997-11-07</span>
          </a-col>
          <a-col :span="12">
            <span class="font-style">QQ/微信：</span>
            <span class="font-style">785012476</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <span class="font-style">电话：</span>
            <span class="font-style">13628663657</span>
          </a-col>
          <a-col :span="12">
            <span class="font-style">家乡：</span>
            <span class="font-style">江西上饶</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <span class="font-style">兴趣爱好：</span>
            <span>
              <a-tag color="pink">
                舞蹈
              </a-tag>
              <a-tag color="red">
                文学
              </a-tag>
              <a-tag color="orange">
                音乐
              </a-tag>
              <a-tag color="green">
                影视
              </a-tag>
              <a-tag color="cyan">
                游戏
              </a-tag>
              <a-tag color="blue">
                书法
              </a-tag>
              <a-tag color="purple">
                旅游
              </a-tag>
            </span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <span class="font-style">
              个人介绍：大家所看到的我的内在就像我的外表一样，
              敦厚和实在是我对自己最好的概括。我待人诚实，从没有花言巧语，
              但真诚和厚道使我总能赢得朋友的信赖。我专业扎实，看书是我最大的享受，
              钻研电脑让我感觉其乐无穷。我做事踏实，再小的事情我也要一丝不苟地完成
              。我会修电脑，能管网络，网络经营和网上销售也没问题。重要的是，我有一
              种执著钻研的精神，一种不弄明白绝不罢休的颈头。我叫春雨，春天的雨润物
              细无声，我希望我能默默无闻地、悄无声息地给我的团队装一点点绿色。给我
              一个机会，我会给您一个惊喜。
            </span>
          </a-col>
        </a-row>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: "PersonalCard",
    props: {
      cardData: Object,
    },
    data() {
      return {
        tagColors: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple']
      }
    }
  }
</script>