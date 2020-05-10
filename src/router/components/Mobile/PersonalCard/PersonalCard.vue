<style scoped lang="scss">
  .PersonalCard {

  }
</style>

<template>
  <div class="PersonalCard">
    <Card :bordered="false">
      <p slot="title">个人卡片</p>

    </Card>
  </div>
</template>

<script>
  export default {
    name: "PersonalCard"
  }
</script>