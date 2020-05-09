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
          'name',
          { rules: [{ required: true, message: '请输入真实姓名!' }] },
        ]"
                      placeholder="请输入真实姓名"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="学号">
              <a-input
                      v-decorator="[
          'number',
          { rules: [{ required: true, message: '请输入真实学号!' }] },
        ]"
                      placeholder="请输入真实学号"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item label="账号">
              <a-input
                      v-decorator="[
          'userName',
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
                <a-select-option value="male">
                  男
                </a-select-option>
                <a-select-option value="female">
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
      handleLogin(e) {
        e.preventDefault();
        this.LoginForm.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.$router.push({path: '/stage'})
          }
        });
      },
      handleRegister(e) {
        e.preventDefault();
        this.RegisterForm.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.activeKey = '1';
            this.RegisterForm.resetFields();
          }
        });
      },
    },
  }
</script>
