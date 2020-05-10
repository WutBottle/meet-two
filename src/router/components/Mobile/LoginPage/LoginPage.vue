<style scoped lang="scss">
  .LoginPage {
    padding: 40px 20px 0 20px;
    .title-wrapper {
      text-align: center;
      font-family: 'AJC';
      font-size: 40px;
      padding: 10px 0 50px 0;
    }
  }
</style>

<template>
  <div class="LoginPage">
    <div class="title-wrapper">沐光遇法 语你相识</div>
    <Tabs v-model="paneKey">
      <TabPane label="登录" name="login">
        <Form ref="login" :model="login" :rules="ruleInline">
          <FormItem prop="username">
            <Input type="text" v-model="login.username" placeholder="请输入账户">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="login.password" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button long type="primary" @click="handleSubmit('login')">登录</Button>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="注册" name="register">
        <Form ref="register" :model="register" :rules="ruleInline">
          <FormItem prop="nickname">
            <Input type="text" v-model="register.nickname" placeholder="请输入真实姓名">
              <Icon type="ios-create-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="schoolNumber">
            <Input type="text" v-model="register.schoolNumber" placeholder="请输入学号">
              <Icon type="ios-school-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="username">
            <Input type="text" v-model="register.username" placeholder="请输入登录账号">
              <Icon type="ios-contact-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="register.password" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="gender">
            <Select prefix="ios-contacts-outline" v-model="register.gender" placeholder="请选择性别">
              <Option value='1'>男</Option>
              <Option value='0'>女</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button long type="primary" @click="handleSubmit('register')">登录</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import api from '@api/apiSugar';
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
          password: ''
        },
        ruleInline: {
          username: [
            { required: true, message: '请输入登录账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          schoolNumber: [
            { required: true, message: '请输入学号', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' },
          ],
        },
        paneKey: 'login'
      }
    },
    methods: {
      ...mapActions({
        loginUser: 'tokensOperation/login',
        registerUser: 'userOperation/registerUser',
      }),
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (name === 'login'){
              this.loginUser({
                username: this.login.username,
                password: this.login.password,
              }).then(res => {
                if (res && res.data.meta.success) {
                  this.$Message.success('登录成功');
                  this.$router.push({path: '/mobile/stage'})
                } else {
                  this.$Message.warning(res.data.meta.message);
                }
              });
            }else {
              api.userController.registerUser(this.register).then(res => {
                if (res && res.data.meta.success) {
                  this.$Message.success('注册成功，请登录！');
                  this.$refs[name].resetFields();
                  this.paneKey = 'login';
                } else {
                  this.$Message.warning(res.data.meta.message);
                }
              });
            }
          } else {
            this.$Message.error('请检查信息!');
          }
        })
      }
    }
  }
</script>