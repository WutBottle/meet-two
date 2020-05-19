<style scoped lang="scss">
  .WishCard {
    padding: 20px;
    box-shadow: 0 6px 0 rgb(255, 231, 178), 0 9px 25px rgba(0,0,0,.7);
    background-color: rgba(255, 255, 255, 0.76);

    border-radius: 12px;

    .text-wrapper {
      padding-top: 8px;
      font-size: 16px;
      color: #3c3c3c;
      font-weight: bold;
    }
  }
</style>

<template>
  <div class="WishCard">
    <van-image
            width="100%"
            height="180px"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div class="text-wrapper">
      我的愿望是能有一只喵！！！
    </div>
  </div>
</template>

<script>
  export default {
    name: "WishCard"
  }
</script>

