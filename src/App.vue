<style scoped lang="scss">
  #app {

  }
</style>

<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import {ACCESS_TOKEN} from '@store/mutation-types';

  export default {
    name: 'App',
    data() {
      return {
        locale: zhCN,
      };
    },
    mounted() {
      if (!localStorage.getItem(ACCESS_TOKEN)){
        if (this.isMobile()) {
          this.$router.push("/mobile/login");
        } else {
          this.$router.push("/pc/login");
        }
      }
    },
    methods: {
      ...mapMutations({
        environmentSet: 'tokensOperation/environmentSet',
      }),
      isMobile() {
        let flag = Boolean(navigator.userAgent.match( // match方法可在字符串内检索指定的值，
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        ));
        this.environmentSet(flag);
        return flag;
      }
    }
  }
</script>
