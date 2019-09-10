<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" :model="formInline" class="operate">
      <el-form-item label>
        <el-input v-model="formInline.content" placeholder="企业名称搜索" clearable></el-input>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="(item,index) in thead"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      ></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">更新基础信息</el-button>
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
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes,prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      @close="dialogClose"
      :width="dialogWidth"
    >
      <!-- 新增 -->
      <el-form :model="dialogForm" v-if="dialogTitle=='新增' " ref="ruleForm" :rules="rules">
        <el-row>
          <!-- left -->
          <el-col :span="12">
            <el-form-item label="账号" label-width="120px" prop="account">
              <el-input v-model="dialogForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" label-width="120px" prop="comName">
              <el-input v-model="dialogForm.comName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- right -->
          <el-col :span="12">
            <el-form-item label="联系人名称" label-width="120px">
              <el-input v-model="dialogForm.realName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="120px" prop="phone">
              <el-input v-model="dialogForm.phone" autocomplete="off" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="root状态" label-width="120px">
            <el-select v-model="dialogForm.rootStatus" placeholder="非ROOT /ROOT">
              <el-option label="root" value="1"></el-option>
              <el-option label="非root" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能开关" label-width="120px">
            <el-checkbox-group v-model="dialogForm.gnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="设备数量" label-width="120px">
            <el-input-number v-model="dialogForm.deviceSize" :min="1" :max="500"></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>

      <!-- 更新 -->
      <el-form :model="dialogFormUpdate" v-if="dialogTitle=='更新' " ref="ruleForm" :rules="rules">
        <el-form-item label="企业名称" label-width="120px" prop="comName">
          <el-input v-model="dialogFormUpdate.comName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人名称" label-width="120px" prop="realName">
          <el-input v-model="dialogFormUpdate.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="120px" prop="phone">
          <el-input v-model="dialogFormUpdate.phone" autocomplete="off" maxlength="11"></el-input>
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
import globalFunc from "../../util/globalFunction";
//reg
const must = [{ required: true, message: "此为必填项", trigger: "blur" }];
const phone = [
  { required: true, message: "此为必填项", trigger: "blur" },
  {
    pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
    message: "手机号格式不对",
    trigger: "blur"
  }
];
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
      thead: [
        { label: "账号", prop: "account" },
        { label: "联系人名称", prop: "realName" },
        { label: "联系方式", prop: "phone" },
        { label: "企业名称", prop: "comName" },
        { label: "设备数量", prop: "deviceSize" },
        { label: "操作者", prop: "operator" }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogTitle: "",
      dialogFormVisible: false,
      dialogWidth: "",
      dialogForm: {
        account: "",
        realName: "",
        phone: "",
        comName: "",
        deviceSize: "",
        rootStatus: "1",
        gnkg: []
      },
      dialogFormUpdate: {
        comName: "",
        realName: "",
        phone: ""
      },
      rules: {
        account: must,
        phone: phone,
        comName: must,
        realName: must
      },
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    /**
     * @method {handleSelectionChange}
     * @method {handleObserveble}
     * @method {handleDelete}
     * @method {handleSizeChange}
     * @method {handleCurrentChange}
     *
     */

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdate(index, row) {
      this.dialogTitle = "更新";
      this.dialogWidth = "30%";
      let json = {
        account: row.account,
        comName: row.comName,
        realName: row.realName,
        phone: row.phone
      };
      Object.assign(this.dialogFormUpdate, json);
      this.dialogFormVisible = !this.dialogFormVisible;
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    dialogClose() {
      this.claerForm();
      this.$refs.ruleForm.resetFields();
    },
    claerForm() {
      for (let index in this.dialogForm) {
        this.dialogForm[index] = "";
      }
      this.dialogForm.gnkg = [];
    },
    getUserList(comName = "") {
      http("/manager/userList", "get", {
        page: this.currentPage,
        pageSize: this.pageSize,
        comName
      }).then(res => {
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    search() {
      this.getUserList(this.formInline.content);
    },
    add() {
      this.dialogTitle = "新增";
      this.dialogWidth = "50%";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    ok() {
      if (this.dialogTitle == "新增") {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let cloneData = JSON.parse(JSON.stringify(this.dialogForm));
            let arr = [
              {
                gnkg: globalFunc.binary(cloneData.gnkg),
                size: cloneData.deviceSize,
                type: cloneData.rootStatus
              }
            ];
            this.createJson(cloneData, arr);
            //删除多余字段
            delete cloneData.gnkg;
            delete cloneData.deviceSize;
            delete cloneData.rootStatus;
            http("/manager/createCom", "post", cloneData).then(res => {
              this.$message.success("添加成功");
              this.dialogFormVisible = !this.dialogFormVisible;
              this.getUserList();
            });
          } else {
            return false;
          }
        });
      } else if (this.dialogTitle == "更新") {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            http("/manager/updateCom", "post", this.dialogFormUpdate).then(
              res => {
                this.getUserList();
                this.$message.success("更新基础信息成功");
                this.dialogFormVisible = !this.dialogFormVisible;
              }
            );
          } else {
            return false;
          }
        });
      }
    },
    createJson(json, arr) {
      for (let index in arr) {
        json["root[" + index + "].size"] = arr[index].size;
        json["root[" + index + "].type"] = arr[index].type;
        json["root[" + index + "].gnkg"] = arr[index].gnkg;
      }
      return json;
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
.el-table {
  width: 99.9% !important;
}
</style>

