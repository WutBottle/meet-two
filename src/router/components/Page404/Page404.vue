<style scoped lang="scss">
  .Page404 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    width: 80vw;
    background-color: #fff;
    opacity: 0.9;
  }
</style>

<template>
  <div class="Page404">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary" @click="backToLogin">
          返回
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Page404",
    computed: {
      ...mapState({
        environment: state => state.tokensOperation.environment,
      })
    },
    methods: {
      backToLogin() {
        if (this.environment) {
          this.$router.push({path: '/mobile/login'})
        } else {
          this.$router.push({path: '/pc/login'})
        }
      }
    }
  }
</script>
