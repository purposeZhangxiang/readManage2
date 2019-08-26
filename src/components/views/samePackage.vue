<template>
  <div>
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) in thead"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  components: {
    breadNav: () => import("../common/bread")
  },
  data() {
    return {
      nowLocation: ["包管理"],
      tableData: [],
      thead: [
        { label: "packageName", prop: "packageName" },
        { label: "message", prop: "message" },
        { label: "remark", prop: "remark" },
        { label: "status", prop: "status" }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      http("/appParameters/queryParamsMsgList", "get", this.$route.query).then(
        res => {
          this.tableData = res.list;
        }
      );
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {}
  }
};
</script>

<style lang="less" scoped>
</style>