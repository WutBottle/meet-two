<style scoped lang="scss">
  .FirstStage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    width: 75vw;
    height: 80vh;
    background-color: #fff;
    padding: 20px;
    background-image: url("~@assets/paperBg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
    white-space: nowrap;

    &::-webkit-scrollbar {
      width: 0 !important;
    }
    &::-webkit-scrollbar {
      width: 0 !important;height: 0;
    }
  }
</style>

<template>
  <div class="FirstStage">
    <a-row :gutter="16">
      <a-col :span="12">
        <h2 style="font-weight: bold;text-align: center;color: #2f2953">您的信息</h2>
        <a-form :form="form" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol"
                @submit="handleSubmit">
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
          <a-form-item :wrapper-col="formTailLayout.wrapperCol">
            <a-button type="primary" html-type="submit">
              生成档案
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="12">
        123
      </a-col>
    </a-row>
  </div>
</template>

<script>
  const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
  };
  const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12, offset: 4},
  };
  export default {
    name: "FirstStage",
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
    }
  }
</script>
