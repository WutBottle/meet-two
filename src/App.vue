<style scoped lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url("~@assets/starBg.png");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>

<template>
  <div id="app">
    <audio :src="mus" loop autoplay ref="audio"/>
    <vue-particles
            color="#ffe450"
            :particleOpacity="0.7"
            :particlesNumber="60"
            shapeType="star"
            :particleSize="6"
            linesColor="#fff"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.6"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
    />
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'App',
    data() {
      return {
        locale: zhCN,
        mus: require("@assets/bgm.mp3"),
      };
    },
    mounted() {
      this.showConfirm();
    },
    methods: {
      showConfirm() {
        this.$confirm({
          title: '亲爱的小伙伴，想来点舒缓的音乐吗?',
          onOk: () => {
            this.$refs.audio.play()
          },
          onCancel: () => {
            this.$refs.audio.pause();
          },
        });
      },
    }
  }
</script>
