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
      <el-table-column prop="url" label="urlPath" min-width="100" width="250" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="状态" min-width="100" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog :title="webDialogTitle" :visible.sync="webDialog">
      <el-form :model="webform">
        <el-form-item label="url地址" label-width="120px">
          <el-input v-model="webform.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" label-width="120px">
          <el-select v-model="webform.status" placeholder="请选择">
            <el-option label="无效" value="0"></el-option>
            <el-option label="有效" value="1"></el-option>
            <el-option label="默认有效" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="webDialog = false">取 消</el-button>
        <el-button type="primary" @click="webSure">确 定</el-button>
      </div>
    </el-dialog>
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
      tableData: [],
      multipleSelection: [],
      webDialog: false,
      webform: {
        url: "http://",
        status: "2"
      },
      webDialogTitle: ""
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
      http("/url/queryAllUrl", "get").then(res => {
        let cloneRes = res.list;
        for (let index in cloneRes) {
          if (cloneRes[index].status == "0") {
            cloneRes[index].status = "无效";
          } else if (cloneRes[index].status == "1") {
            cloneRes[index].status = "有效";
          } else if (cloneRes[index].status == "2") {
            cloneRes[index].status = "默认有效";
          }
        }
        this.tableData = cloneRes;
      });
    },
    addWebConfig() {
      this.webDialog = true;
      this.webDialogTitle = "新增url";
    },
    deleteSome() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请勾选要url配置");
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
    },
    handleEdit(index, row) {
      this.webDialog = true;
      this.webDialogTitle = "编辑url";
      Object.assign(this.webform, row);
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/url/delete", "post", { id: row.id }).then(res => {
          this.$message.success("删除成功");
          this.getWebConfig();
        });
      });
    },
    webSure() {
      if (this.webDialogTitle === "新增url") {
        http("/url/add", "post", this.webform).then(res => {
          this.$message.success("新增成功");
          this.getWebConfig();
        });
      } else if (this.webDialogTitle === "编辑url") {
        http("/url/update", "post", this.webform).then(res => {
          this.$message.success("修改url成功");
          this.getWebConfig();
        });
      }
      this.webDialog = !this.webDialog;
    }
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
</style>

