<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" :model="formInline" class="operate">
      <el-form-item label>
        <el-input v-model="formInline.content" placeholder="企业名称搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="add">新增企业</el-button>
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" min-width="100" width="200"></el-table-column>
      <el-table-column prop="realName" label="联系人名称" min-width="100" width="200"></el-table-column>
      <el-table-column prop="phone" label="联系方式" min-width="100" width="200"></el-table-column>
      <el-table-column prop="comName" label="企业名称" min-width="100" width="200"></el-table-column>
      <el-table-column prop="deviceSize" label="设备数量" min-width="100" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">查看设备</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="dialogForm">
        <el-row>
          <!-- left -->
          <el-col :span="12">
            <el-form-item label="账号" label-width="120px">
              <el-input v-model="dialogForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" label-width="120px">
              <el-input v-model="dialogForm.comName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- right -->
          <el-col :span="12">
            <el-form-item label="联系人名称" label-width="120px">
              <el-input v-model="dialogForm.realName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="120px">
              <el-input v-model="dialogForm.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="root状态" label-width="120px">
            <el-select v-model="dialogForm.root" placeholder="非ROOT /ROOT">
              <el-option label="非root" value="froot"></el-option>
              <el-option label="root" value="root"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能开关" label-width="120px">
            <el-checkbox-group v-model="dialogForm.gnkg" size="middle">
               <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index.val">{{index.name}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="设备数量" label-width="120px">
            <el-input-number v-model="dialogForm.deviceSize" :min="1" :max="500"></el-input-number>
          </el-form-item>
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
import { http } from "../../api/http";
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["公司管理"],
      formInline: {
        content: ""
      },
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      dialogForm: {
        account: "",
        realName: "",
        phone: "",
        comName: "",
        deviceSize: "",
        root: "froot",
        gnkg: []
      },
      gnOptions: [
        {name:'功能一',val:1},
        {name:'功能二',val:2},
        {name:'功能三',val:3},
        {name:'功能四',val:4},
        {name:'功能五',val:5},
        {name:'功能六',val:6},
        {name:'功能七',val:7},
        {name:'功能八',val:8},
      ]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleObserveble(index, row) {
      this.$router.push({
        path: "/home/deviceList",
        query: { comId: row.comId }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/manager/delCom", "get", { comId: row.comId }).then(res => {
          this.$message.success("删除成功");
          this.getUserList();
        });
      });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.getUserList(val);
    },
    dialogClose() {
      this.claerForm();
    },
    claerForm() {
      for (let index in this.dialogForm) {
        this.dialogForm[index] = "";
      }
    },
    getUserList(currentPage, comName) {
      http("/manager/userList", "get", {
        page: currentPage || 1,
        pageSize: 10,
        comName: comName || ""
      }).then(res => {
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    search() {
      this.getUserList(1, this.formInline.content);
    },
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    ok() {
      console.log(this.dialogForm.gnkg)
      //验证表单数据必填项目

      // http("/manager/createCom", "post", this.dialogForm).then(res => {
      //   this.$message.success("添加成功");
      //   this.dialogFormVisible = !this.dialogFormVisible;
      //   this.getUserList();
      // });
    }
  }
};
</script>

<style lang="less">
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

