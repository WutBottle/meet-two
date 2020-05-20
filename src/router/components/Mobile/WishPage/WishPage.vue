<style scoped lang="scss">
  .WishPage {
    .main-wrapper {
      position: relative;
      width: 100%;
      height: calc(100vh - 46px);
      background-image: url("~@assets/tree.png");
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: center 60%;
      overflow: auto;

      .doubt-wrapper {
        position: absolute;
        right: 0;
        top: 40%;
      }

      .water-wrapper {
        position: absolute;
        left: 50%;
        top: 2%;
        margin-left: -85px;
        z-index: 500;
      }

      .card-wrapper {
        padding: 20px 40px;
        position: relative;
        position: relative;

        .match-wrapper {
          position: absolute;
          left: 50%;
          top: 2%;
          margin-left: -85px;
          z-index: 450;
          animation: mylogo 0.3s linear 0s infinite alternate;
        }

        @keyframes mylogo {
          from {
            left: 48%;
          }
          to {
            left: 52%;
          }
        }
      }
    }

    .plant-tree-wrapper {
      position: fixed;
      padding: 0 40px 10px 40px;
      width: 100%;
      bottom: 20px;

      .van-icon__image {
        display: flex;
      }

      .func-btn-wrapper {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;

        .btn-style {
          width: 134px;
        }
      }
    }

    .add-wrapper {
      padding: 60px 50px 30px 50px;
    }
  }
</style>

<template>
  <div class="WishPage">
    <van-nav-bar
            title="许愿树"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <div class="main-wrapper">
      <van-icon class="doubt-wrapper" :name="doubt" size="38" @click="showTips"/>
      <transition name="van-fade">
        <van-icon class="water-wrapper" v-show="showWater" :name="water" size="160"/>
      </transition>
      <div class="card-wrapper">
        <van-icon class="match-wrapper" v-show="!(isMatch && Object.keys(wishCardData.finisher).length)" :name="match" size="170" @click="handleConfirm"/>
        <transition name="van-slide-down">
          <WishCard v-if="Object.keys(wishCardData).length" v-show="cardVisible" :wishCardData="wishCardData" @showPersonalData="showPersonalData"/>
          <van-empty v-else description="种子们正在赶来的路上" />
        </transition>
      </div>
    </div>
    <div class="plant-tree-wrapper">
      <div class="func-btn-wrapper">
        <van-button class="btn-style" type="primary" round size="large" @click="showAnother"
                    color="linear-gradient(to right, #EFE6AE, #BEE8D3)">换一个
        </van-button>
        <van-button class="btn-style" type="primary" round size="large" @click="handleWater"
                    color="linear-gradient(to right, #89E2D1, #CAD9F0)">浇水
        </van-button>
      </div>
      <van-button v-if="hasSeeding" style="margin-right: 10px" type="primary" :icon="plant" round size="large" @click="handleRecovery"
                  color="linear-gradient(to right, #4bb0ff, #6149f6)">回收种子
      </van-button>
      <van-button v-else style="margin-right: 10px" type="primary" :icon="plant" round size="large" @click="showSeeding"
                  color="linear-gradient(to right, #ff5559, #ef7f94)">播下种子
      </van-button>
    </div>
    <van-popup
            v-model="showAdd"
            closeable
            position="bottom"
    >
      <van-form class="add-wrapper" @submit="onSubmit">
        <van-field
                label="一张图片"
        >
          <template #input>
            <van-uploader multiple :max-count="1" :before-read="beforeRead" v-model="imgFileList"/>
          </template>
        </van-field>
        <van-field
                v-model="wishText"
                rows="6"
                autosize
                type="textarea"
                maxlength="150"
                show-word-limit
                name="wishText"
                required
                label="你的愿望"
                placeholder="请输入你的愿望"
                :rules="[{ required: true, message: '请输入你的愿望!' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :loading="imgLoading">
            确定
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-action-sheet v-model="cardShow" title="对方信息">
      <PersonalCard :cardData="personalData" @handleClosePop="handleClosePop"/>
    </van-action-sheet>
  </div>
</template>

<script>
  import api from '@api/apiSugar';
  import lrz from 'lrz';
  import base64ToFile from '@common/js/base64ToFile';
  import baseUrl from '@api/baseUrl';
  import WishCard from "./WishCard/WishCard";
  import PersonalCard from "../PersonalCard/PersonalCard";

  export default {
    name: "WishPage",
    components: {
      WishCard,
      PersonalCard,
    },
    data() {
      return {
        plant: require('@assets/plant.png'),
        water: require('@assets/water.png'),
        match: require('@assets/match.png'),
        doubt: require('@assets/doubt.png'),
        cardVisible: true,
        showWater: false,
        showAdd: false,
        imgFileList: [],
        fileName: '',
        wishText: '',
        currentTreeId: '',
        wishCardData: {},
        imgLoading: false,
        isMatch: false,
        cardShow: false,
        hasSeeding: false,
        personalData: {},
      }
    },
    mounted() {
      this.getWishTree();
    },
    methods: {
      // 获取愿望树数据
      getWishTree() {
        return new Promise((resolve, reject) => {
          api.wishTreeController.getWishTree().then(res => {
            if (res.data.data) {
              this.isMatch = !!res.data.data.love;
              this.hasSeeding = !!res.data.data.sowing;
              this.wishCardData = res.data.data.wishTree || {};
              if (res.data.data.wishTree.finisher) {
                this.personalData = res.data.data.wishTree.finisher;
                this.personalData.hobby = this.personalData.hobby.split(',');
              }
            }else {
              this.$notify({type: 'danger', message: '获取数据错误'});
            }
            resolve();
          }).catch(err => {
            reject(err);
            this.$notify({type: 'danger', message: '获取数据错误'});
          })
        })
      },
      onClickLeft() {
        this.$router.push({path: '/mobile/stage'})
      },
      showAnother() {
        if (Object.keys(this.wishCardData.finisher).length) {
          this.$toast('你们的愿望还未完成哦！');
        } else {
          this.cardVisible = false;
          this.getWishTree().then(() => {
            this.cardVisible = true;
          });
        }
      },
      handleWater() {
        this.showWater = true;
        api.wishTreeController.water({
          id: this.wishCardData.id,
        }).then(res => {
          if (res.data.meta.success){
            this.$notify({type: 'success', message: res.data.data});
            this.cardVisible = false;
            this.getWishTree().then(() => {
              this.cardVisible = true;
            });
          } else {
            this.$notify({type: 'danger', message: res.data.meta.message});
          }
          this.showWater = false;
        })
      },
      showSeeding() {
        this.showAdd = !this.showAdd
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
              api.userController.uploadAvatar(formData).then((res) => {
                if (res && res.data.data) {
                  this.fileName = baseUrl.serverBaseController + res.data.data;
                  this.$notify({type: 'success', message: '照片已上传'});
                  resolve(file);
                  this.imgLoading = false;
                } else {
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
      onSubmit() {
        api.wishTreeController.addWishTree({
          wishImg: this.fileName,
          wishText: this.wishText,
        }).then(res => {
          if (res.data.meta.success){
            this.$notify({type: 'success', message: res.data.data});
            this.showAdd = false;
            this.getWishTree();
          } else {
            this.$notify({type: 'danger', message: res.data.meta.message});
          }
        })
      },
      handleConfirm() {
        this.$dialog.confirm({
          title: '确认匹配',
          message: '确认后无法更换愿望！',
        })
          .then(() => {
            this.handleWater();
          })
          .catch(() => {
          });
      },
      showPersonalData() {
        if (Object.keys(this.wishCardData.finisher).length) {
          this.cardShow = true;
        }
      },
      handleClosePop() {
        this.cardShow = false;
      },
      // 回收种子
      handleRecovery() {
        api.wishTreeController.deleteWishTree().then(res => {
          if (res.data.meta.success){
            this.$notify({type: 'success', message: res.data.data});
            this.hasSeeding = false;
          } else {
            this.$notify({type: 'danger', message: res.data.meta.message});
          }
        })
      },
      showTips() {
        this.$dialog.alert({
          title: '许愿树说明',
          message: '我们会从你喜欢的和喜欢你的人员里面推送他们的愿望种子，' +
            '如果有人对你的愿望种子浇了水，那么就会有爱心闪动，你可以点击浇水或者点击爱心确定匹配' +
            '，注意，每个人只能选择一个愿望去实现哦，匹配成功后，点击卡片就可以看到对方信息，剩下的' +
            '就把握在自己手里啦！',
        }).then(() => {
          // on close
        });
      }
    }
  }
</script>

