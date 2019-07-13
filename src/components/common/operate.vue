<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label>
        <el-input v-model="formInline.content" placeholder="搜索栏"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="renew">续费</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        content: ""
      }
    };
  },
  methods: {
    search() {},
    renew() {}
  }
};
</script>

<style lang="less">
</style>

