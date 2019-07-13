<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-button type="primary" @click="addWebConfig">新增</el-button>
        <el-button type="danger" @click="deleteSome">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :highlight-current-row="true"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="urlName" min-width="100" width="150"></el-table-column>
      <el-table-column prop="url" label="urlPath" min-width="100" width="150" show-overflow-tooltip></el-table-column>
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
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["网页配置管理"],
      tableData: [
        {
          name: "url",
          url: "http://test1.com"
        },
        {
          name: "url2",
          url: "http://test2.com"
        }
      ],
      multipleSelection: []
    };
  },
  created() {
    this.getWebConfig();
  },
  methods: {
    /**
     * method {getWebConfig} 取回webconifg的列表
     * method {addWebConfig} 新增web配置按钮
     * method {deleteSome} 删除所有web配置按钮
     * method {handleSelectionChange} 选框的勾选回调
     * method {handleEdit} 单行的编辑回调
     * method {handleDelete} 单行的删除回调
     */
    getWebConfig() {
      http("/user/webUrl", "post").then(res => {
        this.formLabelAlign = res;
      });
    },
    onSubmit() {
      http("/manager/webConfig", "post", this.formLabelAlign).then(res => {
        this.$message.success("配置成功");
        this.getWebConfig();
      });
    },
    addWebConfig() {},
    deleteSome() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请勾选要删除的设备");
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //整理出 要删除的设备
          let delcodes = [];
          for (let val of this.multipleSelection) {
            delcodes.push(val.code);
          }
          // let codes = { codes: delcodes.join(",") };
          http("", "get", codes).then(res => {
            this.$message.success("删除成功");
            this.getWebConfig();
          });
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleEdit() {},
    handleDelete() {}
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
</style>

