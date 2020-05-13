<style lang="scss" scoped>
  .LoginPage {
    .operation-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 15px;
      width: 500px;
      background-color: #fff;
      opacity: 0.9;
      padding: 0 12px;

      .pane-style {
        padding: 20px 0;
      }

      .title-wrapper {
        text-align: center;
        font-family: 'AJC';
        font-size: 40px;
        padding-top: 12px;
      }
    }
  }
</style>

<template>
  <div class="LoginPage">
    <div class="operation-wrapper">
      <div class="title-wrapper">沐光遇法 语你相识</div>
      <a-tabs v-model="activeKey">
        <a-tab-pane class="pane-style" key="1" tab="登录">
          <a-form :form="LoginForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" @submit="handleLogin">
            <a-form-item label="账号">
              <a-input
                      v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入账号!' }] },
        ]"
                      placeholder="请输入账号"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="密码">
              <a-input
                      v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
                      type="password"
                      placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane class="pane-style" key="2" tab="注册">
          <a-form :form="RegisterForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" @submit="handleRegister">
            <a-form-item label="姓名">
              <a-input
                      v-decorator="[
          'nickname',
          { rules: [{ required: true, message: '请输入真实姓名!' }] },
        ]"
                      placeholder="请输入真实姓名"
              >
                <a-icon slot="prefix" type="reddit" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="学号">
              <a-input
                      v-decorator="[
          'schoolNumber',
          { rules: [{ required: true, message: '请输入学号!' },
          { pattern: /^[a-zA-Z]\d{9}$/, message: '格式错误，例如：M201973007' }] },
        ]"
                      placeholder="请输入真实学号"
              >
                <a-icon slot="prefix" type="number" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="账号">
              <a-input
                      v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入登录账号!' }] },
        ]"
                      placeholder="请输入登录账号"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="密码">
              <a-input
                      v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
                      type="password"
                      placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="性别">
              <a-select
                      v-decorator="[
          'gender',
          { rules: [{ required: true, message: '请选择您的性别!' }] },
        ]"
                      placeholder="请选择您的性别"
              >
                <a-select-option :value=1>
                  男
                </a-select-option>
                <a-select-option :value=0>
                  女
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">
                注册
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import api from '@api/apiSugar';

  export default {
    name: "LoginPage",
    data() {
      return {
        activeKey: '1', // 默认选中的面板
        formLayout: 'horizontal',
        LoginForm: this.$form.createForm(this),
        RegisterForm: this.$form.createForm(this),
      }
    },
    methods: {
      ...mapActions({
        login: 'tokensOperation/login',
        registerUser: 'userOperation/registerUser',
      }),
      handleLogin(e) {
        e.preventDefault();
        this.LoginForm.validateFields((err, values) => {
          if (!err) {
            this.login({
              username: values.userName,
              password: values.password,
            }).then(res => {
              if (res && res.data.meta.success) {
                this.$message.success('登录成功');
                this.$router.push({path: '/pc/stage'})
              } else {
                this.$message.warning(res.data.meta.message);
              }
            });
          }
        });
      },
      handleRegister(e) {
        e.preventDefault();
        this.RegisterForm.validateFields((err, values) => {
          if (!err) {
            const params = {
              nickname: values.nickname,
              schoolNumber: values.schoolNumber,
              username: values.username,
              password: values.password,
              gender: values.gender
            };
            api.userController.registerUser(params).then(res => {
              if (res && res.data.meta.success) {
                this.$message.success('注册成功，请登录！');
                this.activeKey = '1';
                this.RegisterForm.resetFields();
              } else {
                this.$message.warning(res.data.meta.message);
              }
            });
          }
        });
      },
    },
  }
</script>
