<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate" size="small">
      <el-form-item>
        <el-button type="primary" @click="addProxy">新增</el-button>
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
      stripe
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="代理用户姓名" min-width="100" width="150"></el-table-column>
      <el-table-column prop="phone" label="联系方式" min-width="100" width="150"></el-table-column>
      <el-table-column prop="user" label="登陆账号" min-width="100" width="150"></el-table-column>
      <el-table-column prop="password" label="登陆密码" min-width="100" width="150"></el-table-column>
      <el-table-column prop="packageName" label="软件包名" min-width="100" width="150"></el-table-column>
      <!-- //packageName -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改基础信息</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="proxyTitle" :visible.sync="proxyDialog" @close="handleClose">
      <!-- form 新增代理 -->
      <el-form :model="proxyform" v-if="proxyTitle=='新增代理' " ref="ruleForm" :rules="rules" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理姓名" label-width="120px" prop="name">
              <el-input v-model="proxyform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆账号" label-width="120px" prop="user">
              <el-input v-model="proxyform.user" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" label-width="120px" prop="phone">
              <el-input maxlength="11" v-model="proxyform.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码" label-width="120px" prop="password">
              <el-input v-model="proxyform.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="已购非root码" label-width="120px">
            <el-input-number v-model="proxyform.root_froot.frootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="非root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root_froot.frootGnkg" >
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="已购root码" label-width="120px">
            <el-input-number v-model="proxyform.root_froot.rootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root_froot.rootGnkg" >
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- from 基础信息修改 -->
      <el-form :model="proxyform3" v-if="proxyTitle=='编辑基础信息' "  size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理姓名" label-width="120px">
              <el-input v-model="proxyform3.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆账号" label-width="120px">
              <el-input v-model="proxyform3.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="软件包名" label-width="120px">
              <el-input v-model="proxyform3.packageName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" label-width="120px">
              <el-input maxlength="11" v-model="proxyform3.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码" label-width="120px">
              <el-input v-model="proxyform3.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proxyDialog = false">取 消</el-button>
        <el-button type="primary" @click="proxySure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http";
import globalFunc from "../../util/globalFunction";
import proxy from "../../util/proxy";
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
      nowLocation: ["代理用户列表"],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      proxyTitle: "",
      proxyDialog: false,
      proxyform: {
        name: "",
        phone: "",
        user: "",
        password: "123456",
        root_froot: {
          frootGnkg: [],
          frootSize: 0,
          rootGnkg: [],
          rootSize: 0
        }
      },
      // 基础信息修改专用
      proxyform3: {
        name: "",
        phone: "",
        user: "",
        password: "",
        packageName:''
      },
      rules: {
        name: must,
        phone: phone,
        user: must,
        password: must
      },
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  created() {
    this.getProxyList();
  },
  methods: {
    getProxyList(page = 1, pageSize = 10) {
      http("/manager/fetchAgentAdminList", "get", { page, pageSize }).then(
        res => {
          this.tableData = res.list;
          debugger
          this.total = res.total;
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addProxy() {
      this.proxyTitle = "新增代理";
      this.proxyDialog = true;
    },
    deleteSome() {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let delProxy = [];
        for (let val of this.multipleSelection) {
          delProxy.push(val.id);
        }
        http("/manager/agentAdminDel", "post", {
          ids: delProxy.join(",")
        }).then(res => {
          this.$message.success("删除成功");
          this.getProxyList();
        });
      });
    },
    handleSizeChange(val) {
      this.getProxyList(1, val);
    },
    handleCurrentChange(val) {
      this.getProxyList(val);
    },
    handleDetail(index, row) {
      this.$router.push({
        path: "/home/proxyDetail",
        query: { proxyId: row.id }
      });
    },
    handleEdit(index, row) {
      this.proxyDialog = true;
      this.proxyTitle = "编辑基础信息";
      Object.assign(this.proxyform3, row);
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/manager/agentAdminDel", "post", { ids: row.id }).then(res => {
          this.$message.success("删除成功");
          this.getProxyList();
        });
      });
    },
    proxySure() {
      if (this.proxyTitle === "新增代理") {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let cloneData = JSON.parse(JSON.stringify(this.proxyform));
            let root_froot = cloneData.root_froot;
            root_froot.frootGnkg = globalFunc.binary(root_froot.frootGnkg);
            root_froot.rootGnkg = globalFunc.binary(root_froot.rootGnkg);
            let arr = [root_froot];
            this.createJson(cloneData, arr);
            http("/manager/createAgentAdmin", "post", cloneData).then(res => {
              this.$message.success("新增代理用户成功！");
              this.getProxyList();
              this.proxyDialog = false;
            });
          } else {
            return false;
          }
        });
      } else if (this.proxyTitle === "编辑基础信息") {
        let cloneData = JSON.parse(JSON.stringify(this.proxyform3));
        //删除多余参数
        delete cloneData.accountCodeSettingList;
        http("/manager/agentAdminUpdate", "post", cloneData).then(res => {
          this.$message.success("修改成功");
          this.getProxyList();
          this.proxyDialog = false;
        });
      }
    },
    // 构建json
    createJson(json, arr) {
      for (let index in arr) {
        json["accountCodeSettingList[" + index + "].frootGnkg"] =
          arr[index].frootGnkg;
        json["accountCodeSettingList[" + index + "].frootSize"] =
          arr[index].frootSize;
        json["accountCodeSettingList[" + index + "].rootGnkg"] =
          arr[index].rootGnkg;
        json["accountCodeSettingList[" + index + "].rootSize"] =
          arr[index].rootSize;
      }
      delete json.root_froot;
      return json;
    },
    handleClose() {
      this.claerForm();
      if (this.proxyTitle == "新增代理") {
        this.$refs.ruleForm.resetFields();
      }
    },
    claerForm() {
      // 新增框 清空
      for (let index in this.proxyform) {
        this.proxyform[index] = "";
        if (index == "root_froot") {
          this.proxyform[index] = {
            frootGnkg: [],
            frootSize: 0,
            rootGnkg: [],
            rootSize: 0
          };
        } else {
          this.proxyform[index] = "";
        }
      }
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


