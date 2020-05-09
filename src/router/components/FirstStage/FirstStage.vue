<style scoped lang="scss">
  .FirstStage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    width: 80vw;
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
      width: 0 !important;height: 0;
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
      <a-col :span="12">
        <h2 style="font-weight: bold;text-align: center;color: #2f2953">您的信息</h2>
        <a-form :form="form" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                @submit="handleSubmit">
          <a-form-item label="姓名">
            张鹏
            <img class="sex-style" src="@assets/male.png" alt="male">
          </a-form-item>
          <a-form-item label="学号">
            M201973007
          </a-form-item>
          <a-form-item label="学院">
            <a-input
                    v-decorator="[
          'college',
          { rules: [{ required: true, message: '请输入所在学院!' }] },
        ]"
                    placeholder="请输入所在学院"
            />
          </a-form-item>
          <a-form-item label="身高">
            <a-input-number v-decorator="['height',
            { rules: [{ required: true, message: '请输入身高!' }] }]" :min="0" :max="220"
                            placeholder="请输入身高"
                            style="width: 100px"
            />
            <span class="ant-form-text">
              cm
            </span>
          </a-form-item>
          <a-form-item label="出生日期">
            <a-date-picker v-decorator="['birthday',
                      { rules: [{ required: true, message: '请选择出生日期!' }]}]"
                           placeholder="请选择出生日期"
            />
          </a-form-item>
          <a-form-item label="QQ/微信">
            <a-input
                    v-decorator="[
          'contact',
          { rules: [{ required: true, message: '请输入QQ或者微信!' }] },
        ]"
                    placeholder="请输入QQ或者微信"
            />
          </a-form-item>
          <a-form-item label="电话">
            <a-input
                    v-decorator="[
          'phone',
          { rules: [{ required: true, message: '请输入手机号!' }] },
        ]"
                    placeholder="请输入手机号"
            />
          </a-form-item>
          <a-form-item label="家乡">
            <a-input
                    v-decorator="[
          'hometown',
          { rules: [{ required: true, message: '请输入家乡!' }] },
        ]"
                    placeholder="请输入家乡"
            />
          </a-form-item>
          <a-form-item label="兴趣爱好">
            <a-select
                    v-decorator="[
          'hobby',
          { rules: [{ required: true, message: '请输入家乡!' }] },
        ]"
                    placeholder="支持手动输入兴趣标签"
                    mode="tags"
            >
              <a-select-option v-for="item in hobbyOption" :key="item">
                {{item}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="自我介绍">
            <a-textarea
                    v-decorator="[
          'selfIntro',
          { rules: [{ required: true, message: '请输入自我介绍!' }] },
        ]"
                    placeholder="请输入自我介绍"
                    :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>
          <a-form-item label="上传" extra="请上传您的生活照片">
            <a-upload
                    v-decorator="[
          'upload',
          {
            rules: [{ required: true, message: '请上传您的生活照片!' }],
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
                    name="logo"
                    action="/upload.do"
                    list-type="picture"
            >
              <a-button> <a-icon type="upload" /> Click to upload </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item :wrapper-col="formTailLayout.wrapperCol">
            <a-button type="primary" html-type="submit">
              生成档案
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="12">
        <PersonalCard/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import PersonalCard from "@components/PersonalCard/PersonalCard";
  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 17},
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12, offset: 5},
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
        hobbyOption: ['文学', '音乐', '舞蹈', '游戏', '影视', '美食', '旅游']
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      },
      backToStage() {
        this.$router.push({path: '/stage'})
      }
    }
  }
</script>
