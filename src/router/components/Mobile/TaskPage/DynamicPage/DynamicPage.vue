<style scoped lang="scss">
  .DynamicPage {
    .content-wrapper {
      .content {
        padding-top: 1rem;
        .header {
          display: flex;
          padding: 0 .7rem 0 1rem;

          .right {
            padding-left: 1rem;

            .name {
              font-size: .875rem;
              color: #333;
              line-height: 1.4;
            }

            .date {
              font-size: .6875rem;
              color: #939393;
            }
          }
        }
        .sentence {
          line-height: 1.5;
          word-wrap: break-word;
          font-size: 1rem;
          color: #333333;
          padding: 0 .75rem .75rem .75rem;
        }

        .image-wrapper {
          text-align: center;
        }
      }
    }
  }
</style>

<template>
  <div class="DynamicPage">
    <van-nav-bar
            title="留言板"
            left-text="返回"
            left-arrow
            @click-right="handleAdd"
            @click-left="() => this.$router.push({path: '/mobile/task'})"
    >
      <template #right>
        <van-icon name="edit" size="18" />
      </template>
    </van-nav-bar>
    <div class="content-wrapper">
      <template v-for="(item, index) in list">
        <div class="content" :key="index">
          <div class="header">
            <div class="left">
              <van-image
                      round
                      fit="cover"
                      width="32px"
                      height="32px"
                      :src="item.userImage"
              />
            </div>
            <div class="right">
              <div class="name">{{item.nickname}}</div>
              <div class="date">{{item.createDate}}</div>
            </div>
          </div>
          <div class="sentence">
            {{item.message}}
          </div>
          <div class="image-wrapper" v-if="item.messageImage">
            <van-image
                    width="22rem"
                    height="22rem"
                    fit="cover"
                    :src="item.messageImage"
            />
          </div>
          <van-divider />
        </div>
      </template>
    </div>
    <van-popup
            v-model="showAdd"
            closeable
            round
            position="bottom"
            :style="{ height: '70%' }"
    >
      <van-form @submit="onSubmit" style="margin-top: 50px">
        <van-field
                v-model="message"
                name="留言"
                label="留言"
                rows="2"
                autosize
                type="textarea"
                maxlength="100"
                show-word-limit
                placeholder="写点什么吧..."
                required
                :rules="[{ required: true, message: '请写点什么吧！' }]"
        />
        <van-field
                label="上传图片"
        >
          <template #input>
            <van-uploader multiple :max-count="1" :before-read="beforeRead" v-model="imgFileList" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" :disabled="imgLoading || isSubmit" :loading="imgLoading || isSubmit" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import moment from 'moment';
  import lrz from 'lrz';
  import base64ToFile from '@common/js/base64ToFile';
  import baseUrl from '@api/baseUrl';

  export default {
    name: "DynamicPage",
    data() {
      return {
        list: [],
        showAdd: false,
        message: '',
        imgFileList: [],
        imgLoading: false,
        isSubmit: false,
        fileName: '',
      }
    },
    mounted() {
      this.getMessageWallList();
    },
    methods: {
      getMessageWallList() {
        api.messageWallController.getMessageWallList().then(res => {
            if (res.data.data && res.data.meta.success) {
            this.list = res.data.data.map(item => {
              return {
                id: item.id,
                createDate: moment(item.createDate).format('YYYY-MM-DD HH:mm:ss'),
                message: item.message,
                nickname: item.user.nickname,
                messageImage: item.messageImage,
                userImage: item.user.userImg || 'https://img.yzcdn.cn/vant/cat.jpeg'
              }
            })
          } else {
            this.$toast.fail(res.data.meta.message);
          }
        })
      },
      handleAdd() {
        this.showAdd = true;
      },
      onSubmit() {
        this.isSubmit = true;
        api.messageWallController.addMessageWall({
          message: this.message,
          messageImage: this.fileName,
        }).then(res => {
          if(res.data && res.data.meta.success) {
            this.getMessageWallList();
            this.isSubmit = false;
            this.showAdd = false;
            this.$toast.success(res.data.meta.message);
            Object.assign(this, {
              message: '',
              fileName: '',
              imgFileList: [],
            })
          }else {
            this.$toast.fail(res.data.meta.message);
          }
        })
      },
      beforeRead(file) {
        return new Promise((resolve, reject) => {
          if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            this.imgLoading = true;
            lrz(file).then((rst) => {
              // 处理成功会执行
              const formData = new FormData();
              let tempFileList = [base64ToFile(rst.base64, 'message.' + rst.origin.name.split('.')[1])];
              tempFileList.forEach((file) => {
                formData.append('multipartFiles', file);
              });
              api.userController.uploadAvatar(formData).then((res) => {
                if (res && res.data.data) {
                  this.fileName = baseUrl.serverBaseController + res.data.data;
                  this.$notify({type: 'success', message: '照片已上传'});
                  resolve(file);
                  this.imgLoading = false;
                }else {
                  this.$notify({type: 'danger', message: '上传失败,请重新上传'});
                  this.imgLoading = false;
                }
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
    }
  }
</script>

