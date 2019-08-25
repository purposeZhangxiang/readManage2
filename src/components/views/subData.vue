<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-button type="primary" @click="add">新增子数据配置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="packageName" label="包名" min-width="100" width="200"></el-table-column>
      <el-table-column prop="message" label="message" min-width="100" width="200"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="100" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="100" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleSonData(scope.$index, scope.row)">配置</el-button> -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改子数据配置</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-row>
          <!-- left -->
          <el-col :span="12">
            <el-form-item label="包名" label-width="120px">
              <el-input v-model="dialogForm.packageName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="message" label-width="120px">
              <el-input v-model="dialogForm.message" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- right -->
          <el-col :span="12">
            <el-form-item label="备注" label-width="120px">
              <el-input v-model="dialogForm.remark" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="120px">
              <el-select v-model="dialogForm.status">
                <el-option label="不可用" value="0"></el-option>
                <el-option label="可用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http.js";
export default {
  components: {
    breadNav: () => import("../common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["子数据管理"],
      routeParam: "",
      tableData: [],
      dialogFormVisible: false,
      dialogTitle: "",
      dialogForm: {
        packageName: "",
        message: "",
        remark: "",
        status: ""
      }
    };
  },
  created() {
    this.routeParam = this.$route.query;
  },
  mounted() {
    this.getSubData();
  },
  methods: {
    getSubData() {
      http("/appParameters/queryParamsMsgList", "get", {
        parentId: this.routeParam.parentId
      }).then(res => {
        this.tableData = res.list;
      });
    },
    add() {
      this.dialogForm = {}; //置空
      this.dialogTitle = "新增子数据配置";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleSelectionChange() {},
    handleEdit(index, row) {
      this.dialogTitle = "更新子数据配置";
      this.dialogFormVisible = !this.dialogFormVisible;
      Object.assign(this.dialogForm, row);
    },
    handleDelete(index, row) {
      //   this.$confirm(messge)
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/appParameters/deleteParamsMsg", "get", { id: row.id }).then(
          res => {
            this.$message.success("删除成功");
            this.getSubData();
          }
        );
      });
    },
    ok() {
      let cloneData = JSON.parse(JSON.stringify(this.dialogForm));
      Object.assign(cloneData, this.routeParam);
      if (this.dialogTitle == "新增子数据配置") {
        http("/appParameters/addParamsMsg", "get", cloneData).then(res => {
          this.$message.success("新增子数据配置成功");
          this.getSubData();
        });
      } else if (this.dialogTitle == "更新子数据配置") {
        http("/appParameters/updateParamsMsg", "get", cloneData).then(res => {
          this.$message.success("更新子数据配置成功");
          this.getSubData();
        });
      }
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  }
};
</script>

<style lang="less">
.operate {
  margin-top: 10px;
}
</style>
