<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
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
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="代理用户姓名" min-width="100" width="150"></el-table-column>
      <el-table-column prop="phone" label="代理用户手机" min-width="100" width="150"></el-table-column>
      <el-table-column prop="buyfRoot" label="已购非ROOT码总数" min-width="100" width="180"></el-table-column>
      <el-table-column prop="fRootStatus" label="非ROOT码功能开关状态" min-width="100" width="200"></el-table-column>
      <el-table-column prop="buyRoot" label="已购ROOT码总数" min-width="100" width="150"></el-table-column>
      <el-table-column prop="rootStatus" label="ROOT码功能开关状态" min-width="100" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">开码状况</el-button>
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">扩容</el-button>
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
    <el-dialog :title="proxyTitle" :visible.sync="proxyDialog">
      <el-form :model="proxyform">
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理姓名" label-width="120px">
              <el-input v-model="proxyform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆账号" label-width="120px">
              <el-input v-model="proxyform.account" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" label-width="120px">
              <el-input v-model="proxyform.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码" label-width="120px">
              <el-input v-model="proxyform.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 非root -->
          <el-form-item label="已购非root码" label-width="120px">
            <el-input-number v-model="proxyform.fRoot.size" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="非root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.fRoot.gnkg" size="middle">
              <el-checkbox-button
                v-for="index in gnOptions"
                :label="index"
                :key="index.val"
              >{{index.name}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <!-- root -->
          <el-form-item label="已购root码" label-width="120px">
            <el-input-number v-model="proxyform.root.size" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root.gnkg" size="middle">
              <el-checkbox-button
                v-for="index in gnOptions"
                :label="index"
                :key="index.val"
              >{{index.name}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
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
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["代理用户列表"],
      tableData: [
        {
          name: "张三",
          phone: "17761292322",
          buyfRoot: 200,
          fRootStatus: 123,
          buyRoot: 200,
          rootStatus: 123
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      proxyTitle: "",
      proxyDialog: false,
      proxyform: {
        name: "",
        phone: "",
        username: "",
        password: "123456",
        root: {
          gnkg: [],
          size: ""
        },
        fRoot: {
          gnkg: [],
          size: ""
        }
      },
      gnOptions: [
        { name: "功能一", val: 1 },
        { name: "功能二", val: 2 },
        { name: "功能三", val: 3 },
        { name: "功能四", val: 4 },
        { name: "功能五", val: 5 },
        { name: "功能六", val: 6 },
        { name: "功能七", val: 7 },
        { name: "功能八", val: 8 }
      ]
    };
  },
  created() {
    this.getProxyList();
  },
  methods: {
    getProxyList() {
      http("/manager/fetchAgentAdminList","get","").then(res => {});
    },
    handleSelectionChange() {},
    addProxy() {
      this.proxyTitle = "新增代理";
      this.proxyDialog = true;
    },
    deleteSome() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    proxySure() {
      if (this.proxyTitle === "新增代理") {
        debugger;
        http("/manager/createAgentAdmin", "post", {
          user: "xx",
          password: "123",
          userDeviceNum: 10
        }).then(res => {
          this.$message.success("新增代理用户成功！");
          this.getProxyList();
        });

        let addProxy = {
          name: "", //姓名
          phone: "", //联系方式
          username: "", //登陆后台的账户
          password: "", //登陆后台的密码
          root: {
            gnkg: "123456", //root码功能开关
            size: "" //root码数量
          },
          fRoot: {
            gnkg: "123456", //非root码功能开关
            size: "" //非root码数量
          }
        };
      } else if (this.proxyTitle === "编辑") {
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
