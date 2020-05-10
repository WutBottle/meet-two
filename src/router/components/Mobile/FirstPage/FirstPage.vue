<style scoped lang="scss">
  .FirstPage {

  }
</style>

<template>
  <div class="FirstPage">
    <PersonalCard/>
  </div>
</template>

<script>
  import PersonalCard from "../PersonalCard/PersonalCard";
  export default {
    name: "FirstPage",
    components: {
      PersonalCard,
    }
  }
</script>