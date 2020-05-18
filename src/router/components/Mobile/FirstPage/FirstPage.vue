<style scoped lang="scss">
  .FirstPage {
    background-color: #f7f8fa;
  }
</style>

<template>
  <div class="FirstPage">
    <van-nav-bar
            title="我的档案"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <van-panel title="您的信息" desc="完善的信息让您更加有魅力">
      <van-form @submit="onSubmit">
        <van-field label="姓名" required :value="personalData.nickname" readonly>
          <template #right-icon>
            <van-image width="20" height="20" round :src="personalData.gender === 1 ? male : female"/>
          </template>
        </van-field>
        <van-field label="学号" required :value="personalData.schoolNumber" readonly/>
        <van-field
                readonly
                clickable
                :value="personalData.college"
                label="学院"
                required
                placeholder="请选择学院"
                @click="showCollegePicker = true"
                :rules="[{ required: true, message: '请选择学院!' }]"
        />
        <van-popup v-model="showCollegePicker" position="bottom">
          <van-picker
                  show-toolbar
                  :default-index="collegeOptions.findIndex(item => item === personalData.college)"
                  :columns="collegeOptions"
                  @confirm="onCollegeConfirm"
                  @cancel="showCollegePicker = false"
          />
        </van-popup>
        <van-field
                v-model="personalData.height"
                type="number"
                required
                label="身高(cm)"
                placeholder="请输入身高"
                :rules="[{ required: true, message: '请输入身高!' }]"
        />
        <van-field
                readonly
                clickable
                :value="bornDate"
                required
                label="出生日期"
                placeholder="点击选择出生日期"
                @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
                  type="date"
                  :min-date="minDate"
                  :max-date="maxDate"
                  v-model="personalData.bornDate"
                  @confirm="onConfirmDate"
                  @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
                v-model="personalData.qq"
                required
                label="QQ/微信"
                placeholder="请输入QQ或微信"
                :rules="[{ required: true, message: '请输入QQ或微信!' }]"
        />
        <van-field
                v-model="personalData.city"
                required
                label="家乡"
                placeholder="请输入家乡"
                :rules="[{ required: true, message: '请输入家乡!' }]"
        />
        <van-field
                v-model="personalData.phoneNumber"
                required
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请输入手机号!' },
                {pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误!'}]"
        />
        <van-field
                required
                label="兴趣爱好"
                placeholder="请选择兴趣爱好"
                :rules="[{ required: true, message: '请选择兴趣爱好!' }]"
        >
          <template #input>
            <van-checkbox-group v-model="personalData.hobby" direction="horizontal">
              <van-checkbox v-for="item in hobbyOption" :key="item" :name="item">{{item}}</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field
                v-model="personalData.introduction"
                :clearable="true"
                required
                type="textarea"
                rows="4"
                label="自我介绍"
                placeholder="请输入自我介绍"
                maxlength="220"
                show-word-limit
                :rules="[{ required: true, message: '请输入自我介绍!' , maxLength: 20}]"
        />
        <van-field
                required
                :rules="[{ required: true, message: '请上传您的生活照片!' }]"
                label="上传照片"
        >
          <template #input>
            <van-uploader multiple :max-count="1" :before-read="beforeRead" v-model="imgFileList"/>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block :disabled="imgLoading || isSubmit" :loading="imgLoading || isSubmit" loading-text="图片上传中..." type="info"
                      native-type="submit">
            生成档案
          </van-button>
        </div>
      </van-form>
    </van-panel>
    <van-action-sheet v-model="cardShow" title="个人卡片">
      <PersonalCard :cardData="personalData"/>
    </van-action-sheet>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import PersonalCard from "../PersonalCard/PersonalCard";
  import moment from "moment";
  import api from '@api/apiSugar';
  import hobby from '@common/jsonData/hobby';
  import baseUrl from '@api/baseUrl';
  import college from "@common/jsonData/college";
  import lrz from 'lrz';
  import base64ToFile from '@common/js/base64ToFile';

  export default {
    name: "FirstPage",
    components: {
      PersonalCard,
    },
    data() {
      return {
        male: require('@assets/male.png'),
        female: require('@assets/female.png'),
        personalData: {
          introduction: ''
        },
        bornDate: '', // 出生日期
        showPicker: false,
        collegeOptions: college,
        showCollegePicker: false, // 学院选择控制
        minDate: new Date(1975, 0, 1),
        maxDate: new Date(),
        hobbyOption: hobby,
        imgFileList: [],
        fileName: '',
        cardShow: false,
        imgLoading: false,
        test: '',
        isSubmit: false,
      }
    },
    mounted() {
      this.getPersonalData();
    },
    methods: {
      ...mapMutations({
        answerSet: 'tokensOperation/answerSet'
      }),
      getPersonalData(showCard) {
        api.userController.getUserData().then(res => {
          if (res) {
            this.personalData = res.data.data;
            this.personalData.introduction = this.personalData.introduction || '';
            this.personalData.hobby = res.data.data.hobby ? res.data.data.hobby.split(',') : [];
            this.personalData.bornDate = this.personalData.bornDate && new Date(this.personalData.bornDate);
            this.bornDate = res.data.data.bornDate && moment(res.data.data.bornDate).format('YYYY-MM-DD');
            this.answerSet(res.data.data.answer);
            if (this.personalData.userImg) {
              this.fileName = this.personalData.userImg;
              this.imgFileList = [];
              this.imgFileList.push({
                url: this.personalData.userImg,
                status: 'done',
              });
            }
            if (showCard) {
              this.cardShow = true;
            }
          } else {
            this.$notify({type: 'danger', message: '网络错误'});
          }
        })
      },
      onConfirmDate(time) {
        this.bornDate = moment(time).format('YYYY-MM-DD');
        this.showPicker = false;
      },
      beforeRead(file) {
        return new Promise((resolve, reject) => {
          if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            this.imgLoading = true;
            lrz(file).then((rst) => {
              // 处理成功会执行
              const formData = new FormData();
              let tempFileList = [base64ToFile(rst.base64, 'user.' + rst.origin.name.split('.')[1])];
              tempFileList.forEach((file) => {
                formData.append('multipartFiles', file);
              });
              api.userController.uploadAvatar(formData).then((data) => {
                this.fileName = baseUrl.serverBaseController + data.data.data;
                this.$notify({type: 'success', message: '照片已上传'});
                resolve(file);
                this.imgLoading = false;
              }).catch((error) => {
                this.$notify({type: 'danger', message: '上传失败'});
                reject();
              });
            }).catch(function (err) {
              // 处理失败会执行
              this.$notify({type: 'danger', message: '图片压缩失败'});
            });
          } else {
            this.$toast('请上传.jpg/.png/.jpeg格式图片');
            reject();
          }
        });
      },
      onSubmit() {
        this.isSubmit = true;
        let tempData = JSON.parse(JSON.stringify(this.personalData));
        tempData.hobby = tempData.hobby.join(',');
        tempData.userImg = this.fileName;
        tempData.bornDate = moment(tempData.bornDate).format('YYYY-MM-DD');
        api.userController.verifyUser(tempData).then(res => {
          if (res && res.data.meta.success) {
            this.$notify({type: 'success', message: '档案生成成功'});
            this.getPersonalData(true);
          } else {
            this.$notify({type: 'danger', message: res.data.meta.message});
          }
          this.isSubmit = false;
        }).catch(() => {
          this.$notify({type: 'danger', message: '网络超时'});
        })
      },
      onClickLeft() {
        this.$router.push({
          path: '/mobile/stage'
        })
      },
      onCollegeConfirm(value) {
        this.personalData.college = value;
        this.showCollegePicker = false;
      }
    }
  }
</script>