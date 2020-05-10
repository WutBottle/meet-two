<style scoped lang="scss">
  .Pc {
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
  <div class="Pc">
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
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Pc"
  }
</script>