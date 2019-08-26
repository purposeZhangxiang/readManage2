<template>
  <!-- 面包屑 -->
  <breadNav :nowLocation="nowLocation"></breadNav>
</template>

<script>
export default {
  components: {
    breadNav: () => import("../../../components/common/bread.vue")
  },
  data(){
      return {
          nowLocation:["代理月卡列表"]
      }
  }
};
</script>

<style lang="less" scoped>
</style>