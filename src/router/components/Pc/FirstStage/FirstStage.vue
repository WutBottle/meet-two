<style scoped lang="scss">
  .FirstStage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    width: 70vw;
    height: 80vh;
    background-color: #fff;
    padding: 20px;
    background-image: url("~@assets/paperBg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
    white-space: nowrap;
    z-index: 500;

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }

    .sex-style {
      width: 20px;
      height: 20px;
    }

    .back-arrow {
      position: absolute;
      top: 15px;
      left: 15px;
      width: 50px;
      height: 50px;
      background-image: url("~@assets/back.png");
      background-size: 100% 80%;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: 502;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div class="FirstStage">
    <div class="back-arrow" @click="backToStage"></div>
    <a-row :gutter="16">
      <a-col :span="10">
        <h2 style="font-weight: bold;text-align: center;color: #2f2953;">您的信息</h2>
        <a-form :form="form" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                @submit="handleSubmit">
          <a-form-item label="姓名">
            {{personalData.nickname}}
            <img v-if="personalData.gender" class="sex-style" src="@assets/male.png" alt="male">
            <img v-else class="sex-style" src="@assets/female.png" alt="female">
          </a-form-item>
          <a-form-item label="学号">
            {{personalData.schoolNumber}}
          </a-form-item>
          <a-form-item label="学院">
            <a-select
                    v-decorator="[
          'college',
          { initialValue: personalData.college,
          rules: [{ required: true, message: '请选择所在学院!' }] },
        ]">
              <a-select-option v-for="item in collegeOptions" :key="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="身高">
            <a-input-number v-decorator="['height',
            { initialValue: personalData.height,
            rules: [{ required: true, message: '请输入身高!' }] }]" :min="0" :max="220"
                            placeholder="请输入身高"
                            style="width: 100px"
            />
            <span class="ant-form-text">
              cm
            </span>
          </a-form-item>
          <a-form-item label="出生日期">
            <a-date-picker v-decorator="['bornDate',
            { initialValue: personalData.bornDate,
            rules: [{ required: true, message: '请选择出生日期!' }]}]"
                           placeholder="请选择出生日期"
                           show-time
                           format="YYYY-MM-DD"
            />
          </a-form-item>
          <a-form-item label="QQ/微信">
            <a-input
                    v-decorator="[
          'qq',
          { initialValue: personalData.qq,
          rules: [{ required: true, message: '请输入QQ或者微信!' }] },
        ]"
                    placeholder="请输入QQ或者微信"
            />
          </a-form-item>
          <a-form-item label="手机">
            <a-input
                    v-decorator="[
          'phoneNumber',
          {initialValue: personalData.phoneNumber,
          rules: [{ required: true, message: '请输入手机号!' },
          {pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误!'}]},
        ]"
                    placeholder="请输入手机号"
            />
          </a-form-item>
          <a-form-item label="家乡">
            <a-input
                    v-decorator="[
          'city',
          { initialValue: personalData.city,
          rules: [{ required: true, message: '请输入家乡!' }] },
        ]"
                    placeholder="请输入家乡"
            />
          </a-form-item>
          <a-form-item label="兴趣爱好">
            <a-select
                    v-decorator="[
          'hobby',
          { initialValue: personalData.hobby,
          rules: [{ required: true, message: '请输入兴趣爱好!' }] },
        ]"
                    placeholder="请输入兴趣爱好"
                    mode="multiple"
            >
              <a-select-option v-for="item in hobbyOption" :key="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="自我介绍">
            <a-textarea
                    v-decorator="[
          'introduction',
          { initialValue: personalData.introduction,
          rules: [{ required: true, message: '请输入自我介绍!' }] },
        ]"
                    placeholder="请输入自我介绍"
                    :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>
          <a-form-item label="上传照片">
            <a-upload
                    v-decorator="[
          'uploadFile',
          {
            getValueFromEvent: normFile,
            rules: [{ required: true, message: '请上传您的生活照片!' }]
          },
        ]"
                    :fileList="imgFileList"
                    :beforeUpload="beforeUpload"
                    :remove="handleRemove"
                    :multiple="false"
            >
              <a-button>
                <a-icon type="upload"/>
                请上传本人照骗一张
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item :wrapper-col="formTailLayout.wrapperCol">
            <a-button type="primary" html-type="submit" :loading="uploadSpinning">
              生成档案
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="13">
        <PersonalCard :cardData="personalData" :cardSpinning="cardSpinning"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import PersonalCard from "@components/Pc/PersonalCard/PersonalCard";
  // import * as moment from 'moment';
  import lrz from 'lrz';
  import base64ToFile from '@common/js/base64ToFile';
  import api from '@api/apiSugar';
  import baseUrl from '@api/baseUrl';
  import hobby from '@common/jsonData/hobby';
  import college from '@common/jsonData/college';

  const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 10},
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12, offset: 8},
  };
  export default {
    name: "FirstStage",
    components: {
      PersonalCard,
    },
    data() {
      return {
        form: this.$form.createForm(this),
        formItemLayout,
        formTailLayout,
        hobbyOption: hobby,
        personalData: {},
        imgFileList: [],
        collegeOptions: college,
        uploadSpinning: false,
        fileName: '',
        cardSpinning: false,
      }
    },
    mounted() {
      this.getPersonalData();
    },
    methods: {
      normFile(e) {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      },
      getPersonalData() {
        api.userController.getUserData().then(res => {
          if (res) {
            this.personalData = res.data.data;
            this.personalData.hobby = res.data.data.hobby ? res.data.data.hobby.split(',') : [];
            this.personalData.bornDate = res.data.data.bornDate && moment(res.data.data.bornDate);
            if (this.personalData.userImg) {
              this.fileName = this.personalData.userImg;
              this.imgFileList = [];
              this.imgFileList.push({
                uid: '-1',
                name: 'image',
                status: 'done',
                url: this.personalData.userImg,
              });
              this.form.setFieldsValue({
                uploadFile: this.imgFileList,
              })
            }
            this.cardSpinning = false;
          }
        })
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.cardSpinning = true;
            this.personalData = values;
            Object.assign(this.personalData, {
              gender: this.gender,
              nickname: this.nickname,
              schoolNumber: this.schoolNumber,
              userImg: this.fileName,
            });
            this.personalData.hobby = this.personalData.hobby.join(',');
            this.personalData.bornDate = moment(this.personalData.bornDate).format('YYYY-MM-DD');
            api.userController.verifyUser(this.personalData).then(res => {
              if (res && res.data.meta.success) {
                this.$message.success('档案生成成功');
                this.getPersonalData();
              } else {
                this.$message.error(res.data.meta.message);
              }
            })
          }
        });
      },
      backToStage() {
        this.$router.push({path: '/pc/stage'})
      },
      handleRemove(file) {
        const index = this.imgFileList.indexOf(file);
        const newFileList = this.imgFileList.slice();
        newFileList.splice(index, 1);
        this.imgFileList = newFileList;
        this.form.setFieldsValue({
          uploadFile: null,
        });
      },
      beforeUpload(file) {
        this.uploadSpinning = true;
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
          lrz(file).then((rst) => {
            // 处理成功会执行
            const formData = new FormData();
            let tempFileList = [base64ToFile(rst.base64, 'user.' + rst.origin.name.split('.')[1])];
            tempFileList.forEach((file) => {
              formData.append('multipartFiles', file);
            });
            // 手动上传
            api.userController.uploadAvatar(formData).then((data) => {
              this.fileName = baseUrl.serverBaseController + data.data.data;
              this.handleRemove(file);
              this.imgFileList.push({
                uid: '-1',
                name: 'image',
                status: 'done',
                url: this.fileName,
              });
              this.form.setFieldsValue({
                uploadFile: this.imgFileList,
              });
              this.$message.success('照片已上传');
              this.uploadSpinning = false;
            }).catch((error) => {
              this.$message.error('上传失败');
              this.uploadSpinning = false;
            });
          }).catch(function (err) {
            // 处理失败会执行
            this.$message.error('压缩失败！');
          })
        } else {
          this.$message.error('只能上传.jpg.jpeg.png类型文件');
          this.uploadSpinning = false;
        }
        return false;
      },
    }
  }
</script>
