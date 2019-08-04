<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-button type="primary" @click="backups">备份数据库</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["数据库管理"],
    };
  },
  methods: {
    backups() {
      http("/file/exportMySqlDB", "get", "", "blob").then(res => {
        this.$message.success("备份成功");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
.page {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>
