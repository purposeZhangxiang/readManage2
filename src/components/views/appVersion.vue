<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 表格 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="versionInfo" label="版本信息" min-width="100" width="300"></el-table-column>
      <el-table-column prop="versionNo" label="版本号" min-width="100" width="200"></el-table-column>
      <el-table-column prop="filePath" label="版本路径" min-width="100" width="300"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">更新版本</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog title="更新版本" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="版本信息" label-width="120px">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="dialogForm.versionInfo"></el-input>
        </el-form-item>
        <el-form-item label="版本号" label-width="120px">
          <el-input v-model="dialogForm.versionNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本路径" label-width="120px">
          <el-input v-model="dialogForm.filePath" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
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
      nowLocation: ["软件版本管理"],
      tableData: [],
      dialogFormVisible: false,
      dialogForm: {
        versionInfo: "",
        versionNo: "",
        filePath: ""
      }
    };
  },
  created() {
    this.getVersion();
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      //回显
      this.dialogForm.versionInfo = row.versionInfo;
      this.dialogForm.versionNo = row.versionNo;
      this.dialogForm.filePath = row.filePath;
    },
    getVersion() {
      http("/version/curVersion", "get").then(res => {
        let arr = [];
        let json = {};
        for (let index in res) {
          json[index] = res[index];
        }
        arr.push(json);
        this.tableData = arr;
      });
    },
    ok() {
      http("/manager/updateVersion", "post", this.dialogForm).then(res => {
        this.getVersion();
      });
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  }
};
</script>

<style>
</style>
