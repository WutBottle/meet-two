<style scoped lang="scss">
  .LoginPage {
    padding: 40px 20px 0 20px;
    height: 100vh;

    .title-wrapper {
      text-align: center;
      font-family: 'AJC';
      font-size: 40px;
      padding: 10px 0 50px 0;
    }

    .logo-wrapper {
      margin-top: 20px;
    }
  }
</style>

<template>
  <div class="LoginPage">
    <div class="title-wrapper">沐光遇法 语你相识</div>
    <van-tabs v-model="paneKey">
      <van-tab title="登录" name="login">
        <van-form @submit="onSubmit">
          <van-field
                  v-model="login.username"
                  name="username"
                  required
                  label="账户"
                  placeholder="请输入账户"
                  :rules="[{ required: true, message: '请输入账户!' }]"
          />
          <van-field
                  v-model="login.password"
                  type="password"
                  name="password"
                  required
                  label="密码"
                  placeholder="请输入密码"
                  :rules="[{ required: true, message: '请输入密码!' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册" name="register">
        <van-form @submit="onSubmitRegister">
          <van-field
                  v-model="register.nickname"
                  name="nickname"
                  required
                  label="姓名"
                  placeholder="请输入真实姓名"
                  :rules="[{ required: true, message: '请输入真实姓名!' }]"
          />
          <van-field
                  v-model="register.schoolNumber"
                  name="schoolNumber"
                  required
                  label="学号"
                  placeholder="请输入学号"
                  :rules="[{ required: true, message: '请输入学号!' },
                           { pattern: /^[a-zA-Z]\d{9}$/, message: '格式错误，例如：M201973007', trigger: 'onBlur'}]"
          />
          <van-field
                  v-model="register.username"
                  name="username"
                  required
                  label="登录账号"
                  placeholder="请输入登录账号"
                  :rules="[{ required: true, message: '请输入登录账号!' }]"
          />
          <van-field
                  v-model="register.password"
                  type="password"
                  name="password"
                  required
                  label="密码"
                  placeholder="请输入登录密码"
                  :rules="[{ required: true, message: '请输入登录密码!' }]"
          />
          <van-field
                  name="gender"
                  required
                  label="性别"
                  :rules="[{ required: true, message: '请选择性别!' }]"
          >
            <template #input>
              <van-radio-group v-model="register.gender" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="0">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
                  required
                  :rules="[{ required: true, message: '请上传学生证或校园卡正面!' }]"
                  label="证明材料"
          >
            <template #input>
              <van-uploader multiple :max-count="1" :before-read="beforeRead" v-model="imgFileList" />
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block :loading="imgLoading" loading-text="图片上传中..." type="info" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
    <van-grid class="logo-wrapper" :border="false" :column-num="3">
      <van-grid-item>
        <van-image :src="wnlo" />
      </van-grid-item>
      <van-grid-item>
        <van-image :src="fl" />
      </van-grid-item>
      <van-grid-item>
        <van-image :src="hls" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import api from '@api/apiSugar';
  import lrz from 'lrz';
  import base64ToFile from '@common/js/base64ToFile';
  import baseUrl from '@api/baseUrl';
  export default {
    name: "LoginPage",
    data() {
      return {
        login: {
          username: '',
          password: ''
        },
        register: {
          username: '',
          nickname: '',
          schoolNumber: '',
          gender: '',
          password: '',
        },
        paneKey: 'login',
        wnlo: require('@assets/wnlo.png'),
        hls: require('@assets/hls.png'),
        fl: require('@assets/fl.png'),
        imgFileList: [],
        imgLoading: false,
        fileName: '',
      }
    },
    methods: {
      ...mapActions({
        loginUser: 'tokensOperation/login',
        registerUser: 'userOperation/registerUser',
      }),
      onSubmit(values) {
        this.loginUser({
          username: values.username,
          password: values.password,
        }).then(res => {
          if (res && res.data.meta.success) {
            this.$notify({type: 'success', message: '登录成功'});
            if (res.data.data.role === '管理员') {
              this.$router.push({path: '/mobile/admin'})
            }else {
              this.$router.push({path: '/mobile/stage'})
            }
          } else {
            this.$notify({type: 'warning', message: res.data.meta.message});
          }
        });
      },
      onSubmitRegister(values) {
        api.userController.registerUser({
          username: values.username,
          nickname: values.nickname,
          schoolNumber: values.schoolNumber,
          gender: values.gender,
          password: values.password,
          identityImg: this.fileName,
        }).then(res => {
          if (res && res.data.meta.success) {
            this.$notify({type: 'success', message: '注册成功，请登录！'});
            this.paneKey = 'login';
          } else {
            this.$notify({type: 'warning', message: res.data.meta.message});
          }
        });
      },
      beforeRead(file) {
        return new Promise((resolve, reject) => {
          if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            this.imgLoading = true;
            lrz(file).then((rst) => {
              // 处理成功会执行
              const formData = new FormData();
              let tempFileList = [base64ToFile(rst.base64, 'identify.' + rst.origin.name.split('.')[1])];
              tempFileList.forEach((file) => {
                formData.append('multipartFiles', file);
              });
              api.userController.uploadAvatar(formData).then((data) => {
                this.fileName = baseUrl.serverBaseController + data.data.data;
                this.$notify({type: 'success', message: '照片已上传'});
                this.imgLoading = false;
                resolve(file);
              }).catch((error) => {
                this.$notify({type: 'error', message: '上传失败'});
                reject();
              });
            }).catch(function (err) {
              // 处理失败会执行
              this.$notify({type: 'error', message: '图片压缩失败'});
            });
          } else {
            this.$toast('请上传.jpg/.png/.jpeg格式图片');
            reject();
          }
        });
      },
    }
  }
</script>