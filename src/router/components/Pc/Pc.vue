<style scoped lang="scss">
  .Pc {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url("~@assets/starBg.jpg");
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;

    .logo-style {
      padding: 2px;
      display: block;
      width: 100px;
      height: 100px;
    }
  }
</style>

<template>
  <div class="Pc">
    <a-affix :style="{ position: 'absolute', top: '50px', left: '50px'}">
      <img class="logo-style" :src="wnlo" alt="wnlo">
      <img class="logo-style" :src="fl" alt="fl">
      <img class="logo-style" :src="hls" alt="hls">
    </a-affix>
    <vue-particles
            style="height: 100vh"
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
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Pc",
    data() {
      return {
        wnlo: require('@assets/wnlo.png'),
        hls: require('@assets/hls.png'),
        fl: require('@assets/fl.png'),
      }
    }
  }
</script>