<style scoped lang="scss">
  .TestPage {
    .status-style {
      margin-left: 12px;
    }

    .radio-style {
      margin-bottom: 4px;
    }
  }
</style>

<template>
  <div class="TestPage">
    <van-notice-bar left-icon="info-o" :scrollable="true">
      一共18题，您只要下意识选出答案即可，你的每一个选择都会影响到最终的匹配结果。
    </van-notice-bar>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item name="1">
        <template #title>
          <div>1.你期望另一半的星座是?
            <van-tag class="status-style" :type="radio[0] ? 'success' : 'danger'">{{radio[0] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[0]">
          <van-radio class="radio-style" name="a">无所谓</van-radio>
          <van-radio class="radio-style" name="b">白羊座</van-radio>
          <van-radio class="radio-style" name="c">金牛座</van-radio>
          <van-radio class="radio-style" name="d">双子座</van-radio>
          <van-radio class="radio-style" name="e">巨蟹座</van-radio>
          <van-radio class="radio-style" name="f">狮子座</van-radio>
          <van-radio class="radio-style" name="g">处女座</van-radio>
          <van-radio class="radio-style" name="h">天秤座</van-radio>
          <van-radio class="radio-style" name="i">天蝎座</van-radio>
          <van-radio class="radio-style" name="j">射手座</van-radio>
          <van-radio class="radio-style" name="k">摩羯座</van-radio>
          <van-radio class="radio-style" name="l">水瓶座</van-radio>
          <van-radio class="radio-style" name="m">双鱼座</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="2">
        <template #title>
          <div>2.他或她的外貌在你的选择中占多大比重?
            <van-tag class="status-style" :type="radio[1] ? 'success' : 'danger'">{{radio[1] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[1]">
          <van-radio class="radio-style" name="a">0%～25%</van-radio>
          <van-radio class="radio-style" name="b">25%～50%</van-radio>
          <van-radio class="radio-style" name="c">50%～75%</van-radio>
          <van-radio class="radio-style" name="d">70%～100%</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="3">
        <template #title>
          <div>3.对另一方的身高倾向于：
            <van-tag class="status-style" :type="radio[2] ? 'success' : 'danger'">{{radio[2] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[2]">
          <van-radio class="radio-style" name="a">160cm以下</van-radio>
          <van-radio class="radio-style" name="b">160-170cm</van-radio>
          <van-radio class="radio-style" name="c">170-180cm</van-radio>
          <van-radio class="radio-style" name="d">180cm以上</van-radio>
          <van-radio class="radio-style" name="e">不太在乎</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="4">
        <template #title>
          <div>4.更关注对方的哪个方面?
            <van-tag class="status-style" :type="radio[3] ? 'success' : 'danger'">{{radio[3] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[3]">
          <van-radio class="radio-style" name="a">声音与外貌</van-radio>
          <van-radio class="radio-style" name="b">性格与学识</van-radio>
          <van-radio class="radio-style" name="c">兴趣与三观</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="5">
        <template #title>
          <div>5.你觉得有共同爱好对两个人今后相处重要吗?
            <van-tag class="status-style" :type="radio[4] ? 'success' : 'danger'">{{radio[4] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[4]">
          <van-radio class="radio-style" name="a">完全不重要</van-radio>
          <van-radio class="radio-style" name="b">不太重要</van-radio>
          <van-radio class="radio-style" name="c">中立</van-radio>
          <van-radio class="radio-style" name="d">比较重要</van-radio>
          <van-radio class="radio-style" name="e">十分重要</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="6">
        <template #title>
          <div>6.你觉得两个人的性格属于以下哪种比较好?
            <van-tag class="status-style" :type="radio[5] ? 'success' : 'danger'">{{radio[5] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[5]">
          <van-radio class="radio-style" name="a">相似型</van-radio>
          <van-radio class="radio-style" name="b">互补型</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="7">
        <template #title>
          <div>7.在生活中你是一个怎样的人?
            <van-tag class="status-style" :type="radio[6] ? 'success' : 'danger'">{{radio[6] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[6]">
          <van-radio class="radio-style" name="a">情感驾驭理智</van-radio>
          <van-radio class="radio-style" name="b">理智驾驭情感</van-radio>
          <van-radio class="radio-style" name="c">中间状态</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="8">
        <template #title>
          <div>8.认为自己在长相上更有优势还是内涵上更有优势?
            <van-tag class="status-style" :type="radio[7] ? 'success' : 'danger'">{{radio[7] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[7]">
          <van-radio class="radio-style" name="a">长相</van-radio>
          <van-radio class="radio-style" name="b">内涵</van-radio>
          <van-radio class="radio-style" name="c">都有</van-radio>
          <van-radio class="radio-style" name="d">都一般</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="9">
        <template #title>
          <div>9.下面的恋爱状态中，你更喜欢——
            <van-tag class="status-style" :type="radio[8] ? 'success' : 'danger'">{{radio[8] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[8]">
          <van-radio class="radio-style" name="a">与ta一起去吃喝，逛逛热闹的地方</van-radio>
          <van-radio class="radio-style" name="b">与ta在家里一起做简单的事情，比如看电影，做饭，打游戏</van-radio>
          <van-radio class="radio-style" name="c">与ta一起出去运动、远足</van-radio>
          <van-radio class="radio-style" name="d">与ta一起到处体验生活</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="10">
        <template #title>
          <div>10.你希望ta能够多参与你的交友圈吗?
            <van-tag class="status-style" :type="radio[9] ? 'success' : 'danger'">{{radio[9] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[9]">
          <van-radio class="radio-style" name="a">完全不希望</van-radio>
          <van-radio class="radio-style" name="b">不太想强求</van-radio>
          <van-radio class="radio-style" name="c">中立，无所谓，看对方意愿</van-radio>
          <van-radio class="radio-style" name="d">比较希望参与</van-radio>
          <van-radio class="radio-style" name="e">一定要参与</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="11">
        <template #title>
          <div>11.希望对方回复自己消息的频率?
            <van-tag class="status-style" :type="radio[10] ? 'success' : 'danger'">{{radio[10] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[10]">
          <van-radio class="radio-style" name="a">看到之后就应该立刻回复</van-radio>
          <van-radio class="radio-style" name="b">中立，无所谓，看对方意愿</van-radio>
          <van-radio class="radio-style" name="c">没特殊要求，找到时间回复就好</van-radio>
          <van-radio class="radio-style" name="d">不能一天不回消息</van-radio>
          <van-radio class="radio-style" name="e">不管多久都可以，能理解</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="12">
        <template #title>
          <div>12.如果你俩不能每天见面，希望对方联系自己的频率是?
            <van-tag class="status-style" :type="radio[11] ? 'success' : 'danger'">{{radio[11] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[11]">
          <van-radio class="radio-style" name="a">每天多次，随时要知道对方的动态</van-radio>
          <van-radio class="radio-style" name="b">每天定点一次</van-radio>
          <van-radio class="radio-style" name="c">至少要有晚安、早安</van-radio>
          <van-radio class="radio-style" name="d">不一定，忙的时候可以不联系</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="13">
        <template #title>
          <div>13.介意对方想要登陆或是查看自己的通讯录，QQ，微信，短信来电等吗?
            <van-tag class="status-style" :type="radio[12] ? 'success' : 'danger'">{{radio[12] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[12]">
          <van-radio class="radio-style" name="a">可以看的，这是彼此取得信任的方式</van-radio>
          <van-radio class="radio-style" name="b">比较介意，但也会同意</van-radio>
          <van-radio class="radio-style" name="c">无所谓，看对方意愿</van-radio>
          <van-radio class="radio-style" name="d">介意，双方应该有自己的隐私</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="14">
        <template #title>
          <div>14.对另一半有多个蓝/红颜持什么态度?
            <van-tag class="status-style" :type="radio[13] ? 'success' : 'danger'">{{radio[13] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[13]">
          <van-radio class="radio-style" name="a">完全不在乎</van-radio>
          <van-radio class="radio-style" name="b">有些介意</van-radio>
          <van-radio class="radio-style" name="c">只要不太亲密没关系</van-radio>
          <van-radio class="radio-style" name="d">最好保持一定距离</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="15">
        <template #title>
          <div>15.如果你有恋人，你希望你们的相处方式是?
            <van-tag class="status-style" :type="radio[14] ? 'success' : 'danger'">{{radio[14] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[14]">
          <van-radio class="radio-style" name="a">朝夕相处，无话不说</van-radio>
          <van-radio class="radio-style" name="b">分享些小秘密和隐私</van-radio>
          <van-radio class="radio-style" name="c">双独立人格，偶尔交流，保留私人空间</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="16">
        <template #title>
          <div>16.愿意听对方跟你谈自己生活、学习、工作上的繁杂琐事吗?
            <van-tag class="status-style" :type="radio[15] ? 'success' : 'danger'">{{radio[15] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[15]">
          <van-radio class="radio-style" name="a">愿意</van-radio>
          <van-radio class="radio-style" name="b">看心情</van-radio>
          <van-radio class="radio-style" name="c">都是一些琐事，不是很喜欢听</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="17">
        <template #title>
          <div>17.更喜欢什么样的相处方式?
            <van-tag class="status-style" :type="radio[16] ? 'success' : 'danger'">{{radio[16] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[16]">
          <van-radio class="radio-style" name="a">佛系交流，柏拉图式</van-radio>
          <van-radio class="radio-style" name="b">热情相处，永不分离</van-radio>
          <van-radio class="radio-style" name="c">相爱相杀，敢爱敢恨</van-radio>
          <van-radio class="radio-style" name="d">悠然自得，平淡是真</van-radio>
        </van-radio-group>
      </van-collapse-item>
      <van-collapse-item name="18">
        <template #title>
          <div>18.你眼中的爱情是怎样的?
            <van-tag class="status-style" :type="radio[17] ? 'success' : 'danger'">{{radio[17] ? '完成' : '未完成'}}</van-tag>
          </div>
        </template>
        <van-radio-group v-model="radio[17]">
          <van-radio class="radio-style" name="a">与其在悬崖上展览千年不如在爱人肩头痛哭一晚</van-radio>
          <van-radio class="radio-style" name="b">情到浓时起致辞，可能长作玉交枝。除非死后当分散，不遣生前有别离</van-radio>
          <van-radio class="radio-style" name="c">缘起即灭，缘生已空。我也曾如你般天真</van-radio>
          <van-radio class="radio-style" name="d">曾虑多情损梵行，入山又恐别倾城，世间安得两全法，不负如来不负卿</van-radio>
          <van-radio class="radio-style" name="e">早在五十三年七个月零十一个日日夜夜之前就准备好了答案</van-radio>
          <van-radio class="radio-style" name="f">喜欢一个人，会卑微到尘埃里，然后开出花来</van-radio>
        </van-radio-group>
      </van-collapse-item>
    </van-collapse>
    <van-button type="primary" block @click="handleSubmit">提交</van-button>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  export default {
    name: "TestPage",
    data() {
      return {
        activeNames: ['1'],
        radio: ['', '', '', '', '','', '', '', '', '','', '', '', '', '', '', '', ''],
      }
    },
    methods: {
      handleSubmit() {
        let judge = true;
        this.radio.map(item => {
          if (!item){
            judge = false;
          }
        });
        if (judge) {
          api.userController.verifyUser({
            answer: this.radio.join(''),
          }).then(res => {
            if (res && res.data.meta.success) {
              this.$notify({type: 'success', message: '恭喜你完成测评!'});
              this.$router.push('/mobile/stage1');
            } else {
              this.$notify({type: 'danger', message: '响应超时'});
            }
          })
        }else {
          this.$notify({type: 'warning', message: '您还有题目未完成!'});
        }
      }
    }
  }
</script>
